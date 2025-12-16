"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardBody } from "@/components/ui";

type Params = {
  incidenceDeg: number;
  beamCenterX: number; // 0..1
  beamCenterY: number; // 0..1
  detectorDistanceMm: number;
  tiltDeg: number;
  exposureMs: number;
  binning: number; // 1,2,4
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function format(p: Params) {
  return `inc=${p.incidenceDeg.toFixed(2)}°  bc=(${p.beamCenterX.toFixed(2)},${p.beamCenterY.toFixed(
    2
  )})  dist=${p.detectorDistanceMm.toFixed(0)}mm  tilt=${p.tiltDeg.toFixed(
    1
  )}°  exp=${p.exposureMs.toFixed(0)}ms  bin=${p.binning}x`;
}

/**
 * A lightweight procedural “GIWAXS-like” renderer.
 * Not physics-accurate — it’s a UI placeholder to validate the control-to-frame contract.
 */
function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: Params
) {
  const img = ctx.createImageData(w, h);
  const data = img.data;

  const cx = p.beamCenterX * w;
  const cy = p.beamCenterY * h;

  // Controls -> visual effects (intentionally obvious)
  const tilt = (p.tiltDeg / 20) * 0.9;
  const inc = (p.incidenceDeg / 1.0) * 0.7; // assumes 0..1 deg range
  const dist = (p.detectorDistanceMm - 100) / 400; // normalized roughly
  const exp = p.exposureMs / 800;
  const bin = p.binning;

  // Ring spacing / anisotropy scale
  const ringScale = lerp(20, 55, clamp(dist, 0, 1)); // farther distance -> broader features
  const anisotropy = clamp(0.2 + inc, 0, 1);

  // Noise & background
  const background = 0.08 + 0.15 * exp;
  const noise = 0.06 + 0.10 * exp;

  // Beamstop shadow
  const beamstopR = 18 + 10 * exp;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;

      // rotated coords for tilt feel
      const dx0 = x - cx;
      const dy0 = y - cy;
      const dx = dx0 * Math.cos(tilt) - dy0 * Math.sin(tilt);
      const dy = dx0 * Math.sin(tilt) + dy0 * Math.cos(tilt);

      const r = Math.sqrt(dx * dx + dy * dy);

      // A few “rings”
      const ring1 = Math.exp(-Math.pow((r - ringScale * 1.2) / 8, 2));
      const ring2 = Math.exp(-Math.pow((r - ringScale * 2.0) / 10, 2));
      const ring3 = Math.exp(-Math.pow((r - ringScale * 2.8) / 12, 2));

      // Anisotropy: prefer intensity near “in-plane” (dy small) and skew with incidence
      const chi = Math.atan2(dy, dx);
      const orient = 0.45 + 0.55 * Math.exp(-Math.pow((Math.sin(chi) - 0.6 * anisotropy) / 0.5, 2));

      // Background gradient + structured smear
      const bg =
        background +
        0.08 * Math.exp(-Math.pow((dy / h) * 2.2, 2)) +
        0.05 * Math.exp(-Math.pow((dx / w) * 2.2, 2));

      // Instrument “artifacts”: module seam stripes + slight vignetting
      const seam = (x % 64 === 0 || y % 64 === 0) ? 0.10 : 0;
      const vignette = 0.12 * (r / Math.max(w, h));

      // Beamstop shadow near center
      const beamstop = r < beamstopR ? -0.9 : 0;

      // Combine
      let intensity =
        bg +
        orient * (0.55 * ring1 + 0.42 * ring2 + 0.28 * ring3) +
        seam -
        vignette +
        beamstop;

      // Noise
      intensity += (Math.random() - 0.5) * noise;

      // Exposure saturation
      const sat = clamp(0.75 + 0.9 * exp, 0.75, 1.7);
      intensity = clamp(intensity * sat, 0, 1);

      // Map to grayscale with a slight blue-ish cast (still mostly monochrome)
      const v = Math.floor(intensity * 255);

      data[i + 0] = v; // R
      data[i + 1] = v; // G
      data[i + 2] = clamp(v + 12, 0, 255); // B slight
      data[i + 3] = 255;
    }
  }

  // Simulate binning by nearest-neighbor downsample/upsample (cheap)
  if (bin > 1) {
    // Draw to temp, then scale back up
    const temp = document.createElement("canvas");
    temp.width = Math.floor(w / bin);
    temp.height = Math.floor(h / bin);
    const tctx = temp.getContext("2d")!;
    // Put full-res first
    ctx.putImageData(img, 0, 0);
    tctx.imageSmoothingEnabled = false;
    tctx.drawImage(ctx.canvas, 0, 0, temp.width, temp.height);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(temp, 0, 0, w, h);
    return;
  }

  ctx.putImageData(img, 0, 0);
}

function WarningPanel({ p }: { p: Params }) {
  const warnings: string[] = [];

  if (p.exposureMs > 650) warnings.push("High exposure: saturation risk elevated.");
  if (p.beamCenterX < 0.15 || p.beamCenterX > 0.85) warnings.push("Beam center near edge: frame may clip features.");
  if (p.beamCenterY < 0.15 || p.beamCenterY > 0.85) warnings.push("Beam center near edge: frame may clip features.");
  if (p.incidenceDeg > 0.75) warnings.push("High incidence angle: grazing geometry may be inconsistent with sample.");
  if (p.detectorDistanceMm < 140) warnings.push("Short detector distance: features may be strongly distorted.");

  if (warnings.length === 0) {
    return <div className="text-sm text-muted">No warnings.</div>;
  }

  return (
    <ul className="text-sm text-warn list-disc pl-5 space-y-1">
      {warnings.map((w, i) => (
        <li key={i}>{w}</li>
      ))}
    </ul>
  );
}

function VisualTwin({ p }: { p: Params }) {
  // Simple SVG “instrument” that changes with parameters.
  const bx = 40 + p.beamCenterX * 120;
  const by = 30 + p.beamCenterY * 80;
  const dist = clamp((p.detectorDistanceMm - 100) / 400, 0, 1);
  const detX = 260 + dist * 160;
  const tilt = p.tiltDeg;

  return (
    <svg viewBox="0 0 520 220" className="w-full h-full">
      {/* background */}
      <rect x="0" y="0" width="520" height="220" rx="18" fill="rgb(from var(--surface-2) r g b)" />
      {/* sample */}
      <rect x="70" y="100" width="40" height="20" rx="6" fill="rgb(from var(--border) r g b)" />
      <text x="70" y="95" fontSize="12" fill="rgb(from var(--muted) r g b)">Sample</text>

      {/* beam */}
      <line x1="20" y1="110" x2="70" y2="110" stroke="rgb(from var(--primary) r g b)" strokeWidth="2" />
      <text x="20" y="95" fontSize="12" fill="rgb(from var(--muted) r g b)">Beam</text>

      {/* detector */}
      <g transform={`translate(${detX},110) rotate(${tilt})`}>
        <rect x="-20" y="-60" width="40" height="120" rx="10" fill="rgb(from var(--surface) r g b)" stroke="rgb(from var(--primary) r g b)" />
        <circle cx={-20 + (bx / 200) * 40} cy={-60 + (by / 120) * 120} r="6" fill="rgb(from var(--interactive) r g b)" />
      </g>
      <text x={detX - 35} y="40" fontSize="12" fill="rgb(from var(--muted) r g b)">Detector</text>

      {/* incidence angle hint */}
      <path
        d="M70 110 A40 40 0 0 1 100 95"
        fill="none"
        stroke="rgb(from var(--primaryHover) r g b)"
        strokeWidth="2"
        opacity="0.9"
      />
      <text x="102" y="96" fontSize="12" fill="rgb(from var(--muted) r g b)">
        θ = {p.incidenceDeg.toFixed(2)}°
      </text>
    </svg>
  );
}

export default function ConsolePage() {
  const [p, setP] = useState<Params>({
    incidenceDeg: 0.20,
    beamCenterX: 0.50,
    beamCenterY: 0.55,
    detectorDistanceMm: 250,
    tiltDeg: 3,
    exposureMs: 220,
    binning: 1,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "Console initialized.",
    "Ready. Adjust parameters to update frame and twin.",
  ]);

  const logLine = useMemo(() => format(p), [p]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    drawFrame(ctx, c.width, c.height, p);
  }, [p]);

  useEffect(() => {
    // Append log on param change (debounced-ish by React batching)
    setLogs((prev) => {
      const next = [...prev, `Update: ${logLine}`];
      return next.slice(-8);
    });
  }, [logLine]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink">GIWAXS Parameter Effects</h1>
          <p className="mt-2 text-sm text-muted">
            Adjust acquisition and geometry parameters. The simulated frame and visual twin update in real time.
          </p>
        </div>
        <div className="text-xs text-muted rounded-xl2 border border-border bg-surface px-3 py-2">
          {logLine}
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-12 gap-6">
        {/* Controls */}
        <Card className="lg:col-span-4">
          <CardBody>
            <div className="font-medium text-ink">Controls</div>
            <p className="mt-1 text-sm text-muted">
              Instrument + acquisition parameters (demo).
            </p>

            <div className="mt-6 space-y-5">
              <Control
                label="Incidence angle (deg)"
                value={p.incidenceDeg}
                min={0.05}
                max={1.0}
                step={0.01}
                onChange={(v) => setP((s) => ({ ...s, incidenceDeg: v }))}
              />

              <Control
                label="Beam center X"
                value={p.beamCenterX}
                min={0.0}
                max={1.0}
                step={0.01}
                onChange={(v) => setP((s) => ({ ...s, beamCenterX: v }))}
              />

              <Control
                label="Beam center Y"
                value={p.beamCenterY}
                min={0.0}
                max={1.0}
                step={0.01}
                onChange={(v) => setP((s) => ({ ...s, beamCenterY: v }))}
              />

              <Control
                label="Detector distance (mm)"
                value={p.detectorDistanceMm}
                min={100}
                max={500}
                step={5}
                onChange={(v) => setP((s) => ({ ...s, detectorDistanceMm: v }))}
              />

              <Control
                label="Detector tilt (deg)"
                value={p.tiltDeg}
                min={-15}
                max={15}
                step={0.5}
                onChange={(v) => setP((s) => ({ ...s, tiltDeg: v }))}
              />

              <Control
                label="Exposure (ms)"
                value={p.exposureMs}
                min={50}
                max={800}
                step={10}
                onChange={(v) => setP((s) => ({ ...s, exposureMs: v }))}
              />

              <div>
                <div className="text-sm font-medium text-ink">Binning</div>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 4].map((b) => (
                    <button
                      key={b}
                      onClick={() => setP((s) => ({ ...s, binning: b }))}
                      className={[
                        "px-3 py-2 rounded-xl2 text-sm border transition-colors",
                        p.binning === b
                          ? "bg-primary text-white border-primary"
                          : "bg-surface2 text-ink border-border hover:bg-surface",
                      ].join(" ")}
                    >
                      {b}×
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Frame */}
        <Card className="lg:col-span-5 overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="font-medium text-ink">Simulated GIWAXS frame</div>
            <div className="mt-1 text-sm text-muted">
              Demo renderer (placeholder for your Unity / data-twin output).
            </div>
          </div>
          <div className="p-5">
            <canvas
              ref={canvasRef}
              width={560}
              height={420}
              className="w-full h-auto rounded-xl2 border border-border bg-surface2"
            />
            <p className="mt-3 text-xs text-muted">
              Empirical priors + instrument-aware heuristics → realistic scattering patterns.
            </p>
          </div>
        </Card>

        {/* Visual twin + logs */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden">
            <div className="p-5 border-b border-border">
              <div className="font-medium text-ink">Visual twin</div>
              <div className="mt-1 text-sm text-muted">
                Geometry depiction updates with console parameters.
              </div>
            </div>
            <div className="p-5 h-[220px]">
              <VisualTwin p={p} />
            </div>
          </Card>

          <Card>
            <CardBody>
              <div className="font-medium text-ink">Warnings</div>
              <div className="mt-2">
                <WarningPanel p={p} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="font-medium text-ink">Logs</div>
              <div className="mt-3 space-y-2 text-xs text-muted">
                {logs.map((line, i) => (
                  <div key={i} className="rounded-xl2 border border-border bg-surface2 px-3 py-2">
                    {line}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-medium text-ink">{label}</div>
        <div className="text-xs text-muted tabular-nums">{value.toFixed(2)}</div>
      </div>
      <input
        className="mt-2 w-full accent-[rgb(from_var(--primary)_r_g_b)]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
import { Button, Card, CardBody } from "@/components/ui";

function Icon({ label }: { label: string }) {
  // Minimal monochrome placeholder icon
  return (
    <div className="h-9 w-9 rounded-xl2 border border-border bg-surface2 flex items-center justify-center text-xs text-muted">
      {label}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* 1) Hero */}
      <section className="twinspec-grid twinspec-vignette">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              TwinSpec
            </h1>

            <p className="mt-4 text-lg text-muted">
              Digital twins for spectroscopy, scattering, and instrument behavior.
            </p>

            <p className="mt-4 text-sm text-muted leading-6">
              Generate plausible GIWAXS and WAXS patterns, simulate instrument geometry,
              and explore material-specific scattering — all in one unified environment.
            </p>

            <div className="mt-8 flex gap-3">
              <Button href="/console" variant="primary">
                Open Demo Interface
              </Button>
              <Button href="/docs" variant="ghost">
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2) What TwinSpec Does */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-xl font-semibold text-ink">What TwinSpec Does</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <Card>
            <CardBody>
              <div className="flex items-start gap-3">
                <Icon label="DT" />
                <div>
                  <div className="font-medium text-ink">Data Twin</div>
                  <p className="mt-1 text-sm text-muted leading-6">
                    Generates plausible 2D scattering patterns using empirical priors.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-start gap-3">
                <Icon label="IT" />
                <div>
                  <div className="font-medium text-ink">Instrument Twin</div>
                  <p className="mt-1 text-sm text-muted leading-6">
                    Simulates geometry, exposure, binning, beam center, and beamstop effects.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-start gap-3">
                <Icon label="PL" />
                <div>
                  <div className="font-medium text-ink">Planner</div>
                  <p className="mt-1 text-sm text-muted leading-6">
                    Recommends settings to reach target SNR with minimal saturation.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* 3) Supported Material Classes */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-xl font-semibold text-ink">Supported Material Classes</h2>
        <p className="mt-2 text-sm text-muted">
          Minimal, neutral categories for synthetic pattern generation and instrument-aware effects.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["Organic semiconductor", "Conjugated polymers and small-molecule films."],
            ["Organic non-semiconductor", "General organics with diffuse scattering priors."],
            ["Inorganic (powder)", "Isotropic rings with realistic backgrounds."],
            ["Inorganic (textured thin film)", "Preferred orientation and anisotropy modes."],
            ["Metal-organic (MOF film)", "Framework-like peak sets with texture control."],
            ["Biomaterial (cellulose film)", "Semi-crystalline motifs and broad features."],
          ].map(([title, desc]) => (
            <Card key={title}>
              <CardBody>
                <div className="flex items-start gap-3">
                  <Icon label="•" />
                  <div>
                    <div className="font-medium text-ink">{title}</div>
                    <p className="mt-1 text-sm text-muted leading-6">{desc}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* 4) Visualization Highlights */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-xl font-semibold text-ink">Visualization Highlights</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-border text-sm font-medium text-ink">
              2D scattering map (GIWAXS-like)
            </div>
            <div className="h-64 bg-surface2" />
          </Card>
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-border text-sm font-medium text-ink">
              Linecuts (I(q), I(χ)) overlaid
            </div>
            <div className="h-64 bg-surface2" />
          </Card>
        </div>

        <p className="mt-4 text-sm text-muted">
          Empirical priors + instrument-aware heuristics → realistic scattering patterns.
        </p>
      </section>

      {/* 5) Instrument Console Overview */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-xl font-semibold text-ink">Instrument Console Overview</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-border text-sm font-medium text-ink">
              Console preview
            </div>
            <div className="h-72 bg-surface2" />
          </Card>

          <div className="space-y-4 text-sm text-muted leading-6">
            <div className="rounded-xl2 border border-border bg-surface p-5">
              <div className="font-medium text-ink">Geometry controls</div>
              <div className="mt-1">Incidence angle, detector distance, tilt.</div>
            </div>
            <div className="rounded-xl2 border border-border bg-surface p-5">
              <div className="font-medium text-ink">Beam center alignment</div>
              <div className="mt-1">Beam center shifts reflected in frame and twin.</div>
            </div>
            <div className="rounded-xl2 border border-border bg-surface p-5">
              <div className="font-medium text-ink">Detector presets</div>
              <div className="mt-1">Binning, exposure, noise and saturation behavior.</div>
            </div>
            <div className="rounded-xl2 border border-border bg-surface p-5">
              <div className="font-medium text-ink">Logs + warnings</div>
              <div className="mt-1">Saturation risk, invalid geometry, out-of-frame peaks.</div>
            </div>
            <p className="text-sm text-muted">
              Control the experiment — without the beamtime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

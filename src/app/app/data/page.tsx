import { Card, CardBody } from "@/components/ui";

export default function DataPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink">Data</h1>
      <p className="mt-2 text-sm text-muted">
        Dataset exploration and metadata views (placeholder). This will host tables, downloads, and provenance.
      </p>

      <div className="mt-8 grid gap-6">
        <Card>
          <CardBody>
            <div className="font-medium text-ink">Experiments</div>
            <p className="mt-2 text-sm text-muted">
              List experiments, filters, and links to frame/linecuts. Connect this to your lakehouse later.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="font-medium text-ink">Characterizations</div>
            <p className="mt-2 text-sm text-muted">
              Link GIWAXS frames, linecuts, and extracted parameters to dataset-level metadata.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
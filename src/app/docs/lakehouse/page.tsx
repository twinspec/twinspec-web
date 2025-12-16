import Link from "next/link";
import { Card, CardBody } from "@/components/ui";

export default function LakehouseDocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink">Lakehouse</h1>
      <p className="mt-2 text-sm text-muted">
        Specifications and conventions for TwinSpec’s data lakehouse.
        These docs define identifiers, file layouts, and ingestion discipline.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <div className="font-medium text-ink">Naming conventions</div>
            <p className="mt-2 text-sm text-muted">
              Canonical identifiers for materials, experiments, datasets,
              and file paths.
            </p>
            <Link
              href="/docs/lakehouse/naming-conventions"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              View naming conventions →
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="font-medium text-ink">Checklists</div>
            <p className="mt-2 text-sm text-muted">
              Minimal required fields and step-by-step workflows for paper
              ingestion and validation.
            </p>
            <Link
              href="/docs/lakehouse/checklists"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              View checklists →
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
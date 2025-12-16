import Link from "next/link";
import { Card, CardBody } from "@/components/ui";

export default function LakehouseChecklistsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink">Checklists</h1>
      <p className="mt-2 text-sm text-muted">
        Operational checklists for extracting, validating, and registering
        data into the TwinSpec lakehouse.
      </p>

      <div className="mt-8 grid gap-6">
        <Card>
          <CardBody>
            <div className="font-medium text-ink">
              Minimal fill per paper
            </div>
            <p className="mt-2 text-sm text-muted">
              Required metadata and artifacts needed to register a paper,
              experiments, and GIWAXS datasets without inventing values.
            </p>
            <Link
              href="/docs/lakehouse/checklists/minimal-fill-per-paper"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              Open checklist →
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="font-medium text-ink">
              Paper extraction workflow
            </div>
            <p className="mt-2 text-sm text-muted">
              Step-by-step workflow for cropping figures, digitizing data,
              populating JSON, and updating CSV indices.
            </p>
            <Link
              href="/docs/lakehouse/checklists/paper-extraction"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              Open workflow →
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
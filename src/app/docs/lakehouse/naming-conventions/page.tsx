import Link from "next/link";
import { Card, CardBody } from "@/components/ui";

export default function NamingConventionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink">Naming conventions</h1>
      <p className="mt-2 text-sm text-muted">
        Stable, machine-readable conventions for identifiers, filenames,
        and paths used throughout the TwinSpec lakehouse.
      </p>

      <div className="mt-8 grid gap-6">
        <Card>
          <CardBody>
            <div className="font-medium text-ink">Conventions</div>
            <p className="mt-2 text-sm text-muted">
              Formal definitions for material_id, experiment_id,
              characterization_id, and CSV/JSON field rules.
            </p>
            <Link
              href="/docs/lakehouse/naming-conventions/conventions"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              View conventions →
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="font-medium text-ink">Examples</div>
            <p className="mt-2 text-sm text-muted">
              Concrete examples of valid identifiers, file paths, and
              dataset layouts.
            </p>
            <Link
              href="/docs/lakehouse/naming-conventions/examples"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              View examples →
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
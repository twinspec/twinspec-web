import Link from "next/link";
import { Card, CardBody } from "@/components/ui";

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Documentation</h1>
      <p className="mt-2 text-sm text-muted">
        Neutral, scientific docs. Define object model, then workflows, then reference.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <div className="font-medium text-ink">Lakehouse</div>
            <p className="mt-2 text-sm text-muted">
              Specifications for identifiers, file layout, and ingestion discipline.
            </p>
            <Link
              href="/docs/lakehouse"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              Open lakehouse docs →
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="font-medium text-ink">Naming + Checklists</div>
            <ul className="mt-3 text-sm text-muted list-disc pl-5 space-y-1">
              <li>
                <Link href="/docs/lakehouse/naming-conventions" className="text-accent hover:underline">
                  Naming conventions
                </Link>
              </li>
              <li>
                <Link href="/docs/lakehouse/checklists" className="text-accent hover:underline">
                  Checklists
                </Link>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* Optional: keep your existing cards if you still want them */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <div className="font-medium text-ink">Concepts</div>
            <ul className="mt-3 text-sm text-muted list-disc pl-5 space-y-1">
              <li>Data Twin: priors + structured artifacts + noise model</li>
              <li>Instrument Twin: geometry + acquisition mapping</li>
              <li>Planner: constraints → recommended settings</li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="font-medium text-ink">Workflows</div>
            <ul className="mt-3 text-sm text-muted list-disc pl-5 space-y-1">
              <li>Generate frame → adjust geometry → export linecuts</li>
              <li>Save parameter sets and provenance</li>
              <li>Compare patterns across material classes</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
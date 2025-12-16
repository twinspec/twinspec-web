"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardBody } from "@/components/ui";
import { DOCS_NAV, flattenNav, findTrail } from "../_nav";

function isActive(pathname: string, href: string) {
  return pathname === href;
}

function isInSection(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const pathnameRaw = usePathname() || "/docs";
  const pathname = pathnameRaw.replace(/\/$/, "") || "/";

  const flat = flattenNav(DOCS_NAV);
  const currentIndex = flat.findIndex((x) => x.href === pathname);

  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  const trail = findTrail(DOCS_NAV, pathname);
  const breadcrumbs = [
    { title: "Docs", href: "/docs" },
    ...(trail ? trail.filter((t) => t.href !== "/docs") : [])
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Left rail (docs-only) */}
        <aside className="hidden lg:block">
          <div className="text-xs font-medium text-muted uppercase tracking-wide">
            Documentation
          </div>

          <nav className="mt-4 space-y-5">
            {DOCS_NAV.map((section) => (
              <div key={section.href}>
                <Link
                  href={section.href}
                  className={[
                    "block text-sm font-medium",
                    isInSection(pathname, section.href) ? "text-ink" : "text-muted hover:text-ink"
                  ].join(" ")}
                >
                  {section.title}
                </Link>

                {section.children?.length ? (
                  <div className="mt-2 ml-3 space-y-1">
                    {section.children.map((group) => (
                      <div key={group.href} className="mt-3">
                        <Link
                          href={group.href}
                          className={[
                            "block text-sm",
                            isInSection(pathname, group.href)
                              ? "text-ink"
                              : "text-muted hover:text-ink"
                          ].join(" ")}
                        >
                          {group.title}
                        </Link>

                        {group.children?.length ? (
                          <div className="mt-2 ml-3 space-y-1">
                            {group.children.map((leaf) => (
                              <Link
                                key={leaf.href}
                                href={leaf.href}
                                className={[
                                  "block text-sm",
                                  isActive(pathname, leaf.href)
                                    ? "text-ink"
                                    : "text-muted hover:text-ink"
                                ].join(" ")}
                              >
                                {leaf.title}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main>
          {/* Breadcrumbs */}
          <div className="mb-6">
            <div className="text-xs text-muted">
              {breadcrumbs.map((b, i) => (
                <span key={b.href}>
                  {i > 0 ? <span className="mx-2">/</span> : null}
                  <Link href={b.href} className="hover:text-ink">
                    {b.title}
                  </Link>
                </span>
              ))}
            </div>
          </div>

          {children}

          {/* Next / Previous */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardBody>
                <div className="text-xs text-muted">Previous</div>
                {prev ? (
                  <Link href={prev.href} className="mt-1 block text-sm text-accent hover:underline">
                    {prev.title} →
                  </Link>
                ) : (
                  <div className="mt-1 text-sm text-muted">—</div>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="text-xs text-muted">Next</div>
                {next ? (
                  <Link href={next.href} className="mt-1 block text-sm text-accent hover:underline">
                    {next.title} →
                  </Link>
                ) : (
                  <div className="mt-1 text-sm text-muted">—</div>
                )}
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
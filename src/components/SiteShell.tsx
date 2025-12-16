import Link from "next/link";

type NavItem = { href: string; label: string };

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/console", label: "Console" },
  { href: "/docs", label: "Docs" },
  { href: "/app/data", label: "Data" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur border-b border-border/80 bg-bg/70">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-ink">
            TwinSpec
          </Link>

          <nav className="flex items-center gap-6 text-sm text-muted">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-ink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted">
            <div className="font-medium text-ink">TwinSpec</div>
            <div>© 2025 TwinSpec. All rights reserved.</div>
          </div>

          <div className="flex gap-6 text-sm text-muted">
            <Link href="/docs" className="hover:text-ink transition-colors">
              Documentation
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
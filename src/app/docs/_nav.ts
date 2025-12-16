export type DocsNavItem = {
  title: string;
  href: string;
  children?: DocsNavItem[];
};

export const DOCS_NAV: DocsNavItem[] = [
  {
    title: "Lakehouse",
    href: "/docs/lakehouse",
    children: [
      {
        title: "Naming conventions",
        href: "/docs/lakehouse/naming-conventions",
        children: [
          { title: "Conventions", href: "/docs/lakehouse/naming-conventions/conventions" },
          { title: "Examples", href: "/docs/lakehouse/naming-conventions/examples" }
        ]
      },
      {
        title: "Checklists",
        href: "/docs/lakehouse/checklists",
        children: [
          { title: "Minimal fill per paper", href: "/docs/lakehouse/checklists/minimal-fill-per-paper" },
          { title: "Paper extraction", href: "/docs/lakehouse/checklists/paper-extraction" }
        ]
      }
    ]
  }
];

export function flattenNav(items: DocsNavItem[]) {
  const out: { title: string; href: string }[] = [];
  const walk = (list: DocsNavItem[]) => {
    for (const item of list) {
      out.push({ title: item.title, href: item.href });
      if (item.children?.length) walk(item.children);
    }
  };
  walk(items);
  return out;
}

export function findTrail(items: DocsNavItem[], href: string): DocsNavItem[] | null {
  for (const item of items) {
    if (item.href === href) return [item];
    if (item.children?.length) {
      const childTrail = findTrail(item.children, href);
      if (childTrail) return [item, ...childTrail];
    }
  }
  return null;
}
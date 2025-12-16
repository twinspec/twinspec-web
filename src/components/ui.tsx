import Link from "next/link";
import React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-xl2 bg-surface border border-border shadow-card",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["p-6", className].join(" ")}>{children}</div>;
}

export function Button({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl2 px-4 py-2 text-sm font-medium transition-colors border";
  const styles =
    variant === "primary"
      ? "bg-primary text-white border-primary hover:bg-primaryHover hover:border-primaryHover"
      : "bg-transparent text-ink border-border hover:bg-surface2";

  // Use Link for internal routes
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={`${base} ${styles}`} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
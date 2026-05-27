/**
 * @file Shared prose styles for Privacy / Terms / Cookies pages. Section + Paragraph give long-form copy a…
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { cn } from "@/lib/utils";

export function LegalDoc({
  updated,
  children,
}: {
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-foreground/80">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Last updated · {updated}</p>
      {children}
      <p className="rounded-none border-l-2 border-border bg-card p-4 text-sm text-muted-foreground">
        This document is a template provided for transparency about how the
        store operates. It is not legal advice — have a qualified lawyer in
        your jurisdiction review it before relying on it in production.
      </p>
    </div>
  );
}

export function LegalSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-3", className)}>
      <h2 className="text-lg text-foreground">{title}</h2>
      {children}
    </section>
  );
}

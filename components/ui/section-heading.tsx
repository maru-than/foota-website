/**
 * @file Reusable section title block — eyebrow, heading, description, optional action link.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Link from "next/link";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow text-primary">{eyebrow}</span> : null}
      <div
        className={cn(
          "flex w-full items-end justify-between gap-6",
          align === "center" && "justify-center",
        )}
      >
        <h2 className="display text-balance text-4xl leading-[1.02] sm:text-5xl">
          {title}
        </h2>
        {action ? (
          <Link
            href={action.href}
            className="hidden shrink-0 items-center gap-1.5 border-b border-border pb-1 text-sm text-foreground transition-colors hover:border-primary hover:text-primary sm:inline-flex"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

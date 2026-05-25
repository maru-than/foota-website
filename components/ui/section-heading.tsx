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
      {eyebrow ? <span className="eyebrow text-grass">{eyebrow}</span> : null}
      <div
        className={cn(
          "flex w-full items-end justify-between gap-6",
          align === "center" && "justify-center",
        )}
      >
        <h2 className="text-balance text-3xl leading-[1.05] sm:text-4xl">
          {title}
        </h2>
        {action ? (
          <Link
            href={action.href}
            className="hidden shrink-0 border-b border-ink/30 pb-1 text-sm transition-colors hover:border-ink sm:inline-block"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

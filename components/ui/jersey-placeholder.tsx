import { Shirt } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Neutral image placeholder shown until real Shopify product photography is
 * connected. Intentional and on-brand rather than a broken-image box.
 */
export function JerseyPlaceholder({
  label,
  sublabel,
  className,
}: {
  label?: string;
  sublabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-paper via-paper to-[#e9e5d9] px-4 text-center",
        className,
      )}
    >
      <Shirt className="size-10 text-line" strokeWidth={1} aria-hidden />
      {label ? (
        <span className="eyebrow text-muted/70">{label}</span>
      ) : null}
      {sublabel ? (
        <span className="font-display text-base text-muted/60">{sublabel}</span>
      ) : null}
    </div>
  );
}

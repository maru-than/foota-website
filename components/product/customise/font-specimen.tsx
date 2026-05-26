"use client";

import { fontFor } from "@/lib/customisation";

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

/**
 * Inline specimen of the printed-name font. Lives in the PDP accordion
 * and on /customise. Rendered as plain text spans (not SVG) so it
 * inherits the page's font-family variable and stays crisp at any size.
 */
export function FontSpecimen({
  confederation,
  className,
}: {
  confederation: string | null | undefined;
  className?: string;
}) {
  const f = fontFor(confederation);
  const style = {
    fontFamily: f.family,
    letterSpacing: f.letterSpacing,
    fontWeight: f.weight as number,
  } as const;

  return (
    <div className={className}>
      <p className="eyebrow mb-2 text-fg-3">{f.label}</p>
      <p
        className="break-words text-base uppercase text-fg-1"
        style={style}
        aria-hidden
      >
        {ALPHA}
      </p>
      <p
        className="mt-1 break-words text-base text-fg-1 tabular-nums"
        style={style}
        aria-hidden
      >
        {DIGITS}
      </p>
    </div>
  );
}

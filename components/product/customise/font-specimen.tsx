"use client";

/**
 * @file Alphabet + digits in the matchday print font — read-only showcase.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { fontFor } from "@/lib/customisation";

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

/**
 * Inline specimen of the printed-name font. Rendered as plain text spans
 * (not SVG) so it inherits the page's font-family variable and stays crisp
 * at any size. `confederation` selects the font family internally; the
 * federation name is never surfaced — we just label it "Print font".
 */
export function FontSpecimen({
  confederation,
  className,
  showLabel = true,
}: {
  confederation: string | null | undefined;
  className?: string;
  showLabel?: boolean;
}) {
  const f = fontFor(confederation);
  const style = {
    fontFamily: f.family,
    letterSpacing: f.letterSpacing,
    fontWeight: f.weight as number,
  } as const;

  return (
    <div className={className}>
      {showLabel ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Print font
        </p>
      ) : null}
      <p
        className="break-words text-base uppercase text-foreground"
        style={style}
        aria-hidden
      >
        {ALPHA}
      </p>
      <p
        className="mt-1 break-words text-base text-foreground tabular-nums"
        style={style}
        aria-hidden
      >
        {DIGITS}
      </p>
    </div>
  );
}

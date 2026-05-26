"use client";

/**
 * @file Segmented control — Blank vs Custom (+ * @file 5) with dynamic pricing display.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { cn } from "@/lib/utils";
import { useCustomise } from "./customise-context";

/**
 * Segmented control for the buy box: Blank vs Custom (+$15). Mirrors the
 * size selector's visual weight so the buyer sees customisation as another
 * routine choice, not an upsell pop-out.
 */
export function CustomiseToggle() {
  const { enabled, setEnabled, available } = useCustomise();
  if (!available) return null;

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="eyebrow text-fg-3">Personalise</span>
      </div>
      <div
        role="group"
        aria-label="Personalise"
        className="grid grid-cols-2 gap-1.5"
      >
        <button
          type="button"
          aria-pressed={!enabled}
          onClick={() => setEnabled(false)}
          className={cn(
            "flex h-12 items-center justify-center border text-sm font-bold tracking-[-0.03em] transition-colors duration-150 ease-worldkit",
            !enabled
              ? "border-accent bg-accent text-bg-1"
              : "border-line-accent text-fg-1 hover:border-accent hover:bg-accent-12",
          )}
        >
          Blank
        </button>
        <button
          type="button"
          aria-pressed={enabled}
          onClick={() => setEnabled(true)}
          className={cn(
            "flex h-12 items-center justify-center border text-sm font-bold tracking-[-0.03em] transition-colors duration-150 ease-worldkit",
            enabled
              ? "border-accent bg-accent text-bg-1"
              : "border-line-accent text-fg-1 hover:border-accent hover:bg-accent-12",
          )}
        >
          Name &amp; number
        </button>
      </div>
    </div>
  );
}

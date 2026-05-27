"use client";

/**
 * @file Segmented control — Blank vs Custom (+ * @file 5) with dynamic pricing display.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { Button } from "@/components/ui/button";
import { useCustomise } from "./customise-context";

/**
 * Segmented control for the buy box: Blank vs Custom (+$5). Mirrors the
 * size selector's visual weight so the buyer sees customisation as another
 * routine choice, not an upsell pop-out.
 */
export function CustomiseToggle() {
  const { enabled, setEnabled, available } = useCustomise();
  if (!available) return null;

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Personalise</span>
      </div>
      <div
        role="group"
        aria-label="Personalise"
        className="grid grid-cols-2 gap-1.5"
      >
        <Button
          type="button"
          variant={!enabled ? "default" : "outline"}
          aria-pressed={!enabled}
          onClick={() => setEnabled(false)}
        >
          Blank
        </Button>
        <Button
          type="button"
          variant={enabled ? "default" : "outline"}
          aria-pressed={enabled}
          onClick={() => setEnabled(true)}
        >
          Name &amp; number
        </Button>
      </div>
    </div>
  );
}

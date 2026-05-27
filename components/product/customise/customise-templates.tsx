"use client";

/**
 * @file Quick-pick rail — Legends / Squad / Mine presets populate the form, or clear it for manual entry.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { useState } from "react";
import { PencilLine, Trophy, Users } from "lucide-react";

import { legendsFor, squadFor, type CustomTemplate } from "@/lib/custom-templates";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";
import { useCustomise } from "./customise-context";

type Track = "legends" | "squad" | "mine";

/**
 * Quick-pick rail that fills name + number in one tap. Three tracks:
 * Legends (heroes), Squad (current senior players), Mine (clears so the
 * buyer types their own). Available only when the toggle is on, so the
 * picker never competes with the field labels.
 */
export function CustomiseTemplates({ product }: { product: Product }) {
  const { enabled, applyTemplate, clear, name, number, available } = useCustomise();
  const [track, setTrack] = useState<Track>("legends");

  if (!available || !enabled) return null;

  const nation = product.meta.nation;
  const items: CustomTemplate[] =
    track === "legends" ? legendsFor(nation) : track === "squad" ? squadFor(nation) : [];

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="eyebrow text-muted-foreground">Quick picks</span>
        <div role="tablist" aria-label="Quick picks" className="flex gap-3">
          {(["legends", "squad", "mine"] as Track[]).map((t) => {
            const Icon = t === "legends" ? Trophy : t === "squad" ? Users : PencilLine;
            return (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={track === t}
                onClick={() => {
                  setTrack(t);
                  if (t === "mine") {
                    clear();
                    // Re-enable customs so the form stays visible.
                    applyTemplate("", "");
                  }
                }}
                className={cn(
                  "inline-flex items-center gap-1 text-[11px] font-semibold uppercase transition-colors",
                  track === t ? "text-lime-400" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" strokeWidth={1.5} aria-hidden />
                {t === "legends" ? "Legends" : t === "squad" ? "Squad" : "Mine"}
              </button>
            );
          })}
        </div>
      </div>

      {track === "mine" ? (
        <p className="text-xs text-muted-foreground">
          Type any name and number above — that&rsquo;s it.
        </p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => {
            const active = item.name === name && item.number === number;
            return (
              <button
                key={`${item.name}-${item.number}`}
                type="button"
                onClick={() => applyTemplate(item.name, item.number)}
                aria-pressed={active}
                className={cn(
                  "flex h-9 items-center gap-2 border px-2.5 text-xs font-bold uppercase transition-colors duration-150 ease-worldkit",
                  active
                    ? "border-lime-400 bg-lime-400 text-background"
                    : "border-lime-400/20 text-foreground hover:border-lime-400 hover:bg-lime-400/12",
                )}
              >
                <span>{item.name}</span>
                <span className="tabular-nums text-muted-foreground group-aria-pressed:text-background">
                  {item.number}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

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
        <span className="eyebrow text-fg-3">Quick picks</span>
        <div role="tablist" aria-label="Quick picks" className="flex gap-3">
          {(["legends", "squad", "mine"] as Track[]).map((t) => (
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
                "text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                track === t ? "text-accent" : "text-fg-3 hover:text-fg-1",
              )}
            >
              {t === "legends" ? "Legends" : t === "squad" ? "Squad" : "Mine"}
            </button>
          ))}
        </div>
      </div>

      {track === "mine" ? (
        <p className="text-xs text-fg-3">
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
                  "flex h-9 items-center gap-2 border px-2.5 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-150 ease-worldkit",
                  active
                    ? "border-accent bg-accent text-bg-1"
                    : "border-line-accent text-fg-1 hover:border-accent hover:bg-accent-12",
                )}
              >
                <span>{item.name}</span>
                <span className="tabular-nums text-fg-3 group-aria-pressed:text-bg-1">
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

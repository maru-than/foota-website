"use client";

/**
 * @file Name & number inputs with character counter — inherits the confederation font from the provider.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { useId } from "react";

import { CUSTOM_MAX_NAME_CHARS } from "@/lib/customisation";
import { cn } from "@/lib/utils";
import { useCustomise } from "./customise-context";

/**
 * Name + number fields shown when the customise toggle is on. Keeps the
 * pattern of the buy-box (eyebrow label + tight controls) so the form
 * doesn't feel grafted onto the page.
 */
export function CustomiseForm() {
  const nameId = useId();
  const numberId = useId();
  const { enabled, name, number, setName, setNumber, fontSpec, available } =
    useCustomise();

  if (!available || !enabled) return null;

  const remaining = CUSTOM_MAX_NAME_CHARS - name.length;

  return (
    <div className="space-y-4 border border-line-accent p-4">
      <div className="grid grid-cols-[1fr_5rem] gap-3">
        <div>
          <label
            htmlFor={nameId}
            className="eyebrow mb-2 block text-fg-3"
          >
            Name on back
          </label>
          <input
            id={nameId}
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="YOUR NAME"
            maxLength={CUSTOM_MAX_NAME_CHARS}
            className={cn(
              "block h-12 w-full border border-line-accent bg-transparent px-3 text-sm font-bold uppercase tracking-[0.14em] text-fg-1 placeholder:text-fg-4",
              "focus:border-accent focus:outline-none focus-visible:border-accent",
            )}
            style={{
              fontFamily: fontSpec.family,
              letterSpacing: fontSpec.letterSpacing,
              fontWeight: fontSpec.weight,
            }}
            aria-describedby={`${nameId}-help`}
          />
          <p id={`${nameId}-help`} className="mt-1.5 text-[11px] text-fg-3">
            {remaining} of {CUSTOM_MAX_NAME_CHARS} characters left · A–Z, spaces, hyphens, dots.
          </p>
        </div>

        <div>
          <label
            htmlFor={numberId}
            className="eyebrow mb-2 block text-fg-3"
          >
            Number
          </label>
          <input
            id={numberId}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="10"
            maxLength={2}
            className={cn(
              "block h-12 w-full border border-line-accent bg-transparent px-3 text-center text-base font-bold tracking-tight text-fg-1 placeholder:text-fg-4 tabular-nums",
              "focus:border-accent focus:outline-none focus-visible:border-accent",
            )}
            style={{
              fontFamily: fontSpec.family,
              fontWeight: fontSpec.weight,
            }}
          />
          <p className="mt-1.5 text-[11px] text-fg-3">0–99</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line-1 pt-3">
        <span className="text-[11px] uppercase tracking-[0.14em] text-fg-3">
          Font
        </span>
        <span className="text-xs text-fg-1">{fontSpec.label}</span>
      </div>
    </div>
  );
}

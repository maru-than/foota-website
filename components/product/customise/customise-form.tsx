"use client";

/**
 * @file Name & number inputs with character counter — inherits the confederation font from the provider.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { useId } from "react";
import { AlertCircle, Hash, Type } from "lucide-react";

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
    <div className="space-y-4 border border-lime-400/20 p-4">
      <div className="grid grid-cols-[1fr_5rem] gap-3">
        <div>
          <label
            htmlFor={nameId}
            className="eyebrow mb-2 flex items-center gap-1.5 text-muted-foreground"
          >
            <Type className="size-3.5" strokeWidth={1.5} aria-hidden />
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
              "block h-12 w-full border border-lime-400/20 bg-transparent px-3 text-sm font-bold uppercase text-foreground placeholder:text-muted-foreground/60",
              "focus:border-lime-400 focus:outline-none focus-visible:border-lime-400",
            )}
            style={{
              fontFamily: fontSpec.family,
              letterSpacing: fontSpec.letterSpacing,
              fontWeight: fontSpec.weight,
            }}
            aria-describedby={`${nameId}-help`}
          />
          <p
            id={`${nameId}-help`}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground"
          >
            {remaining <= 3 ? (
              <AlertCircle
                className="size-3 shrink-0 text-lime-400"
                strokeWidth={1.5}
                aria-hidden
              />
            ) : null}
            <span>
              {remaining} of {CUSTOM_MAX_NAME_CHARS} characters left · A–Z, spaces, hyphens, dots.
            </span>
          </p>
        </div>

        <div>
          <label
            htmlFor={numberId}
            className="eyebrow mb-2 flex items-center gap-1.5 text-muted-foreground"
          >
            <Hash className="size-3.5" strokeWidth={1.5} aria-hidden />
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
              "block h-12 w-full border border-lime-400/20 bg-transparent px-3 text-center text-base font-bold tracking-tight text-foreground placeholder:text-muted-foreground/60 tabular-nums",
              "focus:border-lime-400 focus:outline-none focus-visible:border-lime-400",
            )}
            style={{
              fontFamily: fontSpec.family,
              fontWeight: fontSpec.weight,
            }}
          />
          <p className="mt-1.5 text-[11px] text-muted-foreground">0–99</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-[11px] uppercase text-muted-foreground">
          Font
        </span>
        <span className="text-xs text-foreground">{fontSpec.label}</span>
      </div>
    </div>
  );
}

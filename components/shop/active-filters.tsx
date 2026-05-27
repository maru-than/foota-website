"use client";

/**
 * @file Pill-chip of applied filters — remove individually or clear all; hides when empty.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import {
  getFilterValues,
  toggleFilterValue,
} from "@/lib/filters";

/**
 * Pill chips for every active filter, with a × to remove individually and a
 * "Clear all" at the end. Hidden when nothing is applied. Renders above the
 * sort row in {@link components/shop/product-browser.tsx} — on mobile this is
 * the single biggest discoverability win because the user otherwise has to
 * open the filter drawer just to see what they applied.
 */

const FACET_KEYS = ["nation", "type", "size"] as const;

export function ActiveFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const chips: { key: string; label: string; remove: () => void }[] = [];
  for (const key of FACET_KEYS) {
    for (const value of getFilterValues(searchParams, key)) {
      chips.push({
        key: `${key}:${value}`,
        label: value,
        remove: () =>
          router.push(
            buildHref(pathname, toggleFilterValue(searchParams, key, value)),
            { scroll: false },
          ),
      });
    }
  }

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice || maxPrice) {
    chips.push({
      key: "price",
      label: priceLabel(minPrice, maxPrice),
      remove: () => {
        const next = new URLSearchParams(searchParams.toString());
        next.delete("minPrice");
        next.delete("maxPrice");
        router.push(buildHref(pathname, next), { scroll: false });
      },
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="-mt-2 mb-6 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.remove}
          aria-label={`Remove filter ${c.label}`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-accent pl-3.5 pr-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-accent focus:outline-none focus-visible:border-primary"
        >
          <span>{c.label}</span>
          <X className="size-3.5 text-foreground/80" strokeWidth={1.75} />
        </button>
      ))}
      <button
        type="button"
        onClick={() => router.push(pathname, { scroll: false })}
        className="ml-1 min-h-9 px-2 text-xs text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:text-primary"
      >
        Clear all
      </button>
    </div>
  );
}

function priceLabel(min: string | null, max: string | null) {
  if (min && max) return `${min}–${max} USD`;
  if (min) return `≥ ${min} USD`;
  return `≤ ${max} USD`;
}

function buildHref(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

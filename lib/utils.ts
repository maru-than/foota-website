import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { CartLine } from "@/lib/shopify/types";

/** Tailwind-aware className combiner (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a money amount as e.g. "$119.00". MVP is USD-only; the second
 * argument is accepted for compatibility with the Shopify Money shape but
 * ignored — every price renders with a US dollar prefix.
 */
export function formatPrice(
  amount: number | string,
  _currencyCode = "USD",
): string {
  const value = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
  return `$${formatted}`;
}

/** Title-case a single token (used for derived metadata labels). */
export function titleCase(input: string): string {
  return input
    .toLowerCase()
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Per-line subtotal in cart currency, accounting for any customisation
 * delta. Shopify can't compute the delta server-side (we don't explode
 * variants), so the client reconciles `unit + delta` × quantity.
 */
export function lineSubtotal(line: CartLine): number {
  const unit = Number.parseFloat(line.merchandise.price.amount);
  const delta = line.customisation
    ? Number.parseFloat(line.customisation.priceDelta.amount)
    : 0;
  return (unit + delta) * line.quantity;
}

/** Build a query string from a partial record, dropping empty values. */
export function buildSearchParams(
  params: Record<string, string | string[] | undefined | null>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === "") continue;
    if (Array.isArray(value)) {
      for (const v of value) if (v) search.append(key, v);
    } else {
      search.set(key, value);
    }
  }
  const str = search.toString();
  return str ? `?${str}` : "";
}

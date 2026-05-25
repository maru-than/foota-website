import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className combiner (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a money amount as e.g. "CHF 119.00".
 * Currency code comes from Shopify (or "CHF" for mock data) and is shown
 * as a prefix so any ISO currency renders predictably.
 */
export function formatPrice(
  amount: number | string,
  currencyCode = "CHF",
): string {
  const value = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
  return `${currencyCode} ${formatted}`;
}

/** Title-case a single token (used for derived metadata labels). */
export function titleCase(input: string): string {
  return input
    .toLowerCase()
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
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

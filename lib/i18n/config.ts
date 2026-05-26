/**
 * @file MVP shape — single locale (EN), single currency (USD). The country table
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

/* MVP shape — single locale (EN), single currency (USD). The country table
   is kept around because the per-country shipping promise still uses it. */

export const DEFAULT_CURRENCY = "USD" as const;
export type CurrencyCode = "USD";

/* Cookies — proxy writes the country cookie based on geo headers; the
   shipping-promise component reads it server-side. The currency + locale
   cookies are no-ops in this build but reserved here so we can revive them
   without renaming. */
export const COOKIE = {
  country: "wk-country",
  currency: "wk-currency",
  locale: "wk-locale",
} as const;

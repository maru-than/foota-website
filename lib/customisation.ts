/* ------------------------------------------------------------------ */
/*  Customisation constants — name & number printing on the back.      */
/*                                                                      */
/*  A shirt is customisable by default. Products opt out by carrying a  */
/*  `custom:off` tag in Shopify (mocked via Spec.customisable === false */
/*  in lib/mock-data.ts).                                               */
/*                                                                      */
/*  Pricing is a single flat add-on per shirt, applied client-side at   */
/*  line-render time. We do NOT explode Shopify variants by name/number */
/*  — those choices ride along as Cart Line `attributes` and the price  */
/*  delta is reconciled in lineSubtotal().                              */
/* ------------------------------------------------------------------ */

import type { Money } from "./shopify/types";

/** Flat customisation add-on per shirt, in USD. */
export const CUSTOM_PRICE_DELTA = 15;

/** Maximum characters for the back-of-shirt name. */
export const CUSTOM_MAX_NAME_CHARS = 12;

/** Inclusive range for the printed number. */
export const CUSTOM_NUMBER_RANGE: readonly [number, number] = [0, 99];

/** Allowed characters in a custom name. Letters, spaces, hyphens, dots. */
export const CUSTOM_NAME_PATTERN = /^[A-Z .'-]*$/;

/** Sanitise raw input into a printable custom name. */
export function sanitiseName(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z .'-]/g, "")
    .slice(0, CUSTOM_MAX_NAME_CHARS);
}

/** Sanitise raw input into a printable number string ("0" – "99"). */
export function sanitiseNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 2);
  if (!digits) return "";
  const n = Number.parseInt(digits, 10);
  if (n < CUSTOM_NUMBER_RANGE[0] || n > CUSTOM_NUMBER_RANGE[1]) return "";
  return digits;
}

/** A confederation-specific font treatment for the printed name + number. */
export interface FontSpec {
  /** CSS font-family stack (and the SVG-rendered specimen). */
  family: string;
  /** Tracking for the printed name. */
  letterSpacing: string;
  /** Weight for both name + number. */
  weight: number;
  /** Short human label, shown on the buy-box font chip. */
  label: string;
}

const DEFAULT_FONT: FontSpec = {
  family: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
  letterSpacing: "0.18em",
  weight: 800,
  label: "Worldkit standard",
};

/**
 * Font treatment keyed by confederation. These are stylistic stand-ins,
 * not licensed federation fonts. The shape lets us later swap in real
 * webfonts (e.g. via next/font) without touching the buy-box or preview.
 */
export const CUSTOM_FONT_BY_CONFED: Record<string, FontSpec> = {
  UEFA: {
    family: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
    letterSpacing: "0.22em",
    weight: 800,
    label: "UEFA — block",
  },
  CONMEBOL: {
    family: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
    letterSpacing: "0.14em",
    weight: 700,
    label: "CONMEBOL — slab",
  },
  CONCACAF: {
    family: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
    letterSpacing: "0.20em",
    weight: 800,
    label: "CONCACAF — square",
  },
  CAF: {
    family: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
    letterSpacing: "0.24em",
    weight: 800,
    label: "CAF — wide",
  },
  AFC: {
    family: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
    letterSpacing: "0.16em",
    weight: 700,
    label: "AFC — round",
  },
  OFC: {
    family: "var(--font-geist-sans), 'Inter', system-ui, sans-serif",
    letterSpacing: "0.18em",
    weight: 800,
    label: "OFC — block",
  },
};

/** Resolve the font for a confederation, falling back to the default. */
export function fontFor(confederation: string | null | undefined): FontSpec {
  if (!confederation) return DEFAULT_FONT;
  return CUSTOM_FONT_BY_CONFED[confederation] ?? DEFAULT_FONT;
}

/** Format the customisation price delta as a Money object in the cart's currency. */
export function customisationDelta(currencyCode: string = "USD"): Money {
  return { amount: CUSTOM_PRICE_DELTA.toFixed(2), currencyCode };
}

/** A customisation triple as it rides on a cart line. */
export interface Customisation {
  name?: string;
  number?: string;
  priceDelta: Money;
}

/** True when the customisation has any printable content. */
export function hasCustomContent(c: Customisation | undefined): boolean {
  if (!c) return false;
  return Boolean((c.name && c.name.length > 0) || (c.number && c.number.length > 0));
}

/** Human-readable badge for a cart line, e.g. "MARUTHAN 26". */
export function formatCustomLabel(c: Customisation | undefined): string | null {
  if (!hasCustomContent(c)) return null;
  const parts: string[] = [];
  if (c?.name) parts.push(c.name);
  if (c?.number) parts.push(c.number);
  return parts.join(" ");
}

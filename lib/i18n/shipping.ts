/**
 * @file Shipping zones — one row per country group with the customer-facing ETA
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

/* Shipping zones — one row per country group with the customer-facing ETA
   window and a free-shipping threshold. MVP is USD-only, so the threshold is
   expressed as a flat USD figure across all zones. */

interface Zone {
  label: string;
  /** Country ISO codes that map to this zone. */
  countries: string[];
  /** Lower + upper bound delivery days. */
  etaDays: [number, number];
  /** Free-shipping threshold in USD. */
  freeOverUsd: number;
}

const ZONES: Zone[] = [
  {
    label: "United States",
    countries: ["US"],
    etaDays: [2, 4],
    freeOverUsd: 150,
  },
  {
    label: "Canada",
    countries: ["CA"],
    etaDays: [4, 7],
    freeOverUsd: 175,
  },
  {
    label: "Mexico",
    countries: ["MX"],
    etaDays: [5, 9],
    freeOverUsd: 175,
  },
  {
    label: "European Union",
    countries: [
      "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR",
      "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO",
      "SE", "SI", "SK",
    ],
    etaDays: [4, 7],
    freeOverUsd: 175,
  },
  {
    label: "United Kingdom",
    countries: ["GB"],
    etaDays: [4, 7],
    freeOverUsd: 175,
  },
  {
    label: "Switzerland",
    countries: ["CH", "LI"],
    etaDays: [4, 7],
    freeOverUsd: 175,
  },
  {
    label: "Brazil",
    countries: ["BR"],
    etaDays: [7, 12],
    freeOverUsd: 200,
  },
  {
    label: "Japan",
    countries: ["JP"],
    etaDays: [5, 8],
    freeOverUsd: 200,
  },
];

const DEFAULT_ZONE: Zone = {
  label: "Rest of world",
  countries: [],
  etaDays: [7, 14],
  freeOverUsd: 200,
};

const COUNTRY_INDEX: Record<string, Zone> = Object.fromEntries(
  ZONES.flatMap((z) => z.countries.map((c) => [c, z] as const)),
);

export interface ShippingPromise {
  zoneLabel: string;
  countryLabel: string;
  etaDays: [number, number];
  freeOverFormatted: string;
}

const REGION_NAMES = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();

function formatUsd(amount: number): string {
  return `$${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function getShippingPromise(country?: string): ShippingPromise {
  const zone = (country && COUNTRY_INDEX[country.toUpperCase()]) || DEFAULT_ZONE;
  const countryLabel = country
    ? REGION_NAMES?.of(country.toUpperCase()) ?? zone.label
    : zone.label;
  return {
    zoneLabel: zone.label,
    countryLabel,
    etaDays: zone.etaDays,
    freeOverFormatted: formatUsd(zone.freeOverUsd),
  };
}

/**
 * @file Parse URL search params into typed filters + sort — confederation, nation, type, size, price.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { ProductFilters, SortKey } from "./shopify/types";

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

const SORT_KEYS: SortKey[] = ["featured", "newest", "price-asc", "price-desc"];

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .flatMap((s) => s.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
}

function toNumber(value: string | string[] | undefined): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** Parse URL search params into typed filters + sort for the data layer. */
export function parseFilterParams(sp: SearchParamsRecord): {
  filters: ProductFilters;
  sort: SortKey;
} {
  const sortRaw = Array.isArray(sp.sort) ? sp.sort[0] : sp.sort;
  const sort = SORT_KEYS.includes(sortRaw as SortKey)
    ? (sortRaw as SortKey)
    : "featured";

  return {
    sort,
    filters: {
      nation: toArray(sp.nation),
      confederation: toArray(sp.confederation),
      size: toArray(sp.size),
      type: toArray(sp.type),
      minPrice: toNumber(sp.minPrice),
      maxPrice: toNumber(sp.maxPrice),
    },
  };
}

export function activeFilterCount(f: ProductFilters): number {
  return (
    (f.nation?.length ?? 0) +
    (f.confederation?.length ?? 0) +
    (f.size?.length ?? 0) +
    (f.type?.length ?? 0) +
    (f.minPrice != null ? 1 : 0) +
    (f.maxPrice != null ? 1 : 0)
  );
}

/* ----------------- URL helpers shared by filter UIs ------------------- */

/** Read a CSV-list filter param ("?nation=Brazil,France") back to an array. */
export function getFilterValues(
  params: URLSearchParams,
  key: string,
): string[] {
  return params.get(key)?.split(",").filter(Boolean) ?? [];
}

/** Return a new URLSearchParams with `value` toggled on `key`. */
export function toggleFilterValue(
  params: URLSearchParams,
  key: string,
  value: string,
): URLSearchParams {
  const next = new URLSearchParams(params.toString());
  const current = getFilterValues(next, key);
  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  if (updated.length) next.set(key, updated.join(","));
  else next.delete(key);
  return next;
}

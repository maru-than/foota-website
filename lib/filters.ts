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
      club: toArray(sp.club),
      nation: toArray(sp.nation),
      confederation: toArray(sp.confederation),
      season: toArray(sp.season),
      size: toArray(sp.size),
      type: toArray(sp.type),
      era: toArray(sp.era),
      minPrice: toNumber(sp.minPrice),
      maxPrice: toNumber(sp.maxPrice),
    },
  };
}

export function activeFilterCount(f: ProductFilters): number {
  return (
    (f.club?.length ?? 0) +
    (f.nation?.length ?? 0) +
    (f.confederation?.length ?? 0) +
    (f.season?.length ?? 0) +
    (f.size?.length ?? 0) +
    (f.type?.length ?? 0) +
    (f.era?.length ?? 0) +
    (f.minPrice != null ? 1 : 0) +
    (f.maxPrice != null ? 1 : 0)
  );
}

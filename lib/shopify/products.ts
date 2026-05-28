/**
 * @file Fetch & search Shopify products — meta/price/size filters, sort, derived facets, related recommendations.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import {
  getMockProduct,
  getMockProducts,
  getMockRecommendations,
  searchMockProducts,
} from "../mock-data";
import { isShopifyConfigured, shopifyFetch, TAGS } from "./client";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries";
import { reshapeProduct, reshapeProducts } from "./reshape";
import type {
  Connection,
  Product,
  ProductFilters,
  ShopifyProduct,
  SortKey,
} from "./types";

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const CONFEDERATION_ORDER = [
  "UEFA",
  "CONMEBOL",
  "CONCACAF",
  "CAF",
  "AFC",
  "OFC",
];

const SHOPIFY_PRODUCT_SORT: Record<
  SortKey,
  { sortKey: string; reverse: boolean }
> = {
  featured: { sortKey: "BEST_SELLING", reverse: false },
  newest: { sortKey: "CREATED_AT", reverse: true },
  "price-asc": { sortKey: "PRICE", reverse: false },
  "price-desc": { sortKey: "PRICE", reverse: true },
};

function priceOf(product: Product): number {
  return Number.parseFloat(product.priceRange.minVariantPrice.amount);
}

/** Storefront query fragment that hides internal/add-on products. */
const EXCLUDE_SYSTEM = "-tag:system";

/** False for internal/add-on products (e.g. the printing add-on) that must
 *  never appear in listings, search, new arrivals, or recommendations. */
function isListable(product: Product): boolean {
  return !product.tags.includes("system");
}

/* ------------------------- filtering / sorting ------------------------- */

export function applyFilters(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  return products.filter((p) => {
    if (
      filters.nation?.length &&
      !(p.meta.nation && filters.nation.includes(p.meta.nation))
    )
      return false;
    if (
      filters.confederation?.length &&
      !(
        p.meta.confederation &&
        filters.confederation.includes(p.meta.confederation)
      )
    )
      return false;
    if (filters.type?.length && !(p.meta.type && filters.type.includes(p.meta.type)))
      return false;
    if (
      filters.size?.length &&
      !p.variants.some((v) => filters.size!.includes(v.title))
    )
      return false;
    const price = priceOf(p);
    if (filters.minPrice != null && price < filters.minPrice) return false;
    if (filters.maxPrice != null && price > filters.maxPrice) return false;
    return true;
  });
}

/** Rank for "New Arrivals": "New"-badged shirts first, then recency.
 *  Once ranked, walks confederations round-robin so the visible row spans
 *  regions instead of clustering on whichever confederation has the most
 *  "New"-tagged items (today: UEFA). */
export function pickNewArrivals(products: Product[], limit = 8): Product[] {
  const score = (p: Product) => (p.meta.badge === "New" ? 2 : 0);

  const ranked = [...products].sort((a, b) => {
    const diff = score(b) - score(a);
    return diff !== 0 ? diff : b.createdAt.localeCompare(a.createdAt);
  });

  const buckets = new Map<string, Product[]>();
  for (const p of ranked) {
    const key = p.meta.confederation ?? "_";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(p);
  }

  const out: Product[] = [];
  while (out.length < limit && buckets.size > 0) {
    for (const [key, bucket] of [...buckets]) {
      if (out.length >= limit) break;
      const next = bucket.shift();
      if (next) out.push(next);
      if (bucket.length === 0) buckets.delete(key);
    }
  }
  return out;
}

export function applySort(products: Product[], sort: SortKey): Product[] {
  switch (sort) {
    case "newest":
      return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return [...products].sort((a, b) => priceOf(a) - priceOf(b));
    case "price-desc":
      return [...products].sort((a, b) => priceOf(b) - priceOf(a));
    case "featured":
    default:
      return products;
  }
}

export interface Facets {
  nations: string[];
  confederations: string[];
  sizes: string[];
  types: string[];
  priceRange: { min: number; max: number };
}

export function deriveFacets(products: Product[]): Facets {
  const nations = new Set<string>();
  const confederations = new Set<string>();
  const sizes = new Set<string>();
  const types = new Set<string>();
  let min = Infinity;
  let max = 0;

  for (const p of products) {
    if (p.meta.nation) nations.add(p.meta.nation);
    if (p.meta.confederation) confederations.add(p.meta.confederation);
    if (p.meta.type) types.add(p.meta.type);
    for (const v of p.variants) sizes.add(v.title);
    const price = priceOf(p);
    if (price < min) min = price;
    if (price > max) max = price;
  }

  return {
    nations: [...nations].sort(),
    confederations: [...confederations].sort(
      (a, b) => CONFEDERATION_ORDER.indexOf(a) - CONFEDERATION_ORDER.indexOf(b),
    ),
    sizes: [...sizes].sort(
      (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b),
    ),
    types: ["Home", "Away"].filter((t) => types.has(t)),
    priceRange: {
      min: Number.isFinite(min) ? Math.floor(min) : 0,
      max: Math.ceil(max) || 0,
    },
  };
}

/* ------------------------------ data API ------------------------------ */

export async function getProducts(opts?: {
  sort?: SortKey;
  filters?: ProductFilters;
  first?: number;
}): Promise<Product[]> {
  const { sort = "featured", filters, first = 100 } = opts ?? {};

  let products: Product[];
  if (isShopifyConfigured) {
    const { sortKey, reverse } = SHOPIFY_PRODUCT_SORT[sort];
    const data = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
      query: getProductsQuery,
      variables: { first, sortKey, reverse, query: EXCLUDE_SYSTEM },
      tags: [TAGS.products],
      revalidate: 60,
    });
    products = reshapeProducts(data.products.edges.map((e) => e.node)).filter(
      isListable,
    );
  } else {
    products = getMockProducts();
  }

  if (filters) products = applyFilters(products, filters);
  return applySort(products, sort);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  if (!isShopifyConfigured) return getMockProduct(handle);

  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: getProductQuery,
    variables: { handle },
    tags: [TAGS.products],
    revalidate: 60,
  });
  return data.product ? reshapeProduct(data.product) : undefined;
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  if (!isShopifyConfigured) return pickNewArrivals(getMockProducts(), limit);

  const data = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
    query: getProductsQuery,
    variables: {
      first: limit,
      sortKey: "CREATED_AT",
      reverse: true,
      query: EXCLUDE_SYSTEM,
    },
    tags: [TAGS.products],
    revalidate: 60,
  });
  return reshapeProducts(data.products.edges.map((e) => e.node)).filter(
    isListable,
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];
  if (!isShopifyConfigured) return searchMockProducts(query);

  const data = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
    query: getProductsQuery,
    variables: {
      first: 50,
      sortKey: "RELEVANCE",
      reverse: false,
      query: `${query} ${EXCLUDE_SYSTEM}`,
    },
    tags: [TAGS.products],
    revalidate: 60,
  });
  return reshapeProducts(data.products.edges.map((e) => e.node)).filter(
    isListable,
  );
}

export async function getProductRecommendations(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  if (!isShopifyConfigured) return getMockRecommendations(productId, limit);

  const data = await shopifyFetch<{
    productRecommendations: ShopifyProduct[] | null;
  }>({
    query: getProductRecommendationsQuery,
    variables: { productId },
    tags: [TAGS.products],
    revalidate: 60,
  });
  return reshapeProducts(data.productRecommendations ?? [])
    .filter(isListable)
    .slice(0, limit);
}

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

/* ------------------------- filtering / sorting ------------------------- */

export function applyFilters(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  return products.filter((p) => {
    if (filters.club?.length && !(p.meta.club && filters.club.includes(p.meta.club)))
      return false;
    if (
      filters.nation?.length &&
      !(p.meta.nation && filters.nation.includes(p.meta.nation))
    )
      return false;
    if (
      filters.season?.length &&
      !(p.meta.season && filters.season.includes(p.meta.season))
    )
      return false;
    if (filters.type?.length && !(p.meta.type && filters.type.includes(p.meta.type)))
      return false;
    if (filters.era?.length && !filters.era.includes(p.meta.era)) return false;
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

/** Rank for "New Arrivals": current-season / "New" shirts first, then recency. */
export function pickNewArrivals(products: Product[], limit = 8): Product[] {
  const score = (p: Product) =>
    (p.meta.badge === "New" ? 2 : 0) + (p.meta.era === "Current" ? 1 : 0);
  return [...products]
    .sort((a, b) => {
      const diff = score(b) - score(a);
      return diff !== 0 ? diff : b.createdAt.localeCompare(a.createdAt);
    })
    .slice(0, limit);
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
  clubs: string[];
  nations: string[];
  seasons: string[];
  sizes: string[];
  types: string[];
  eras: string[];
  priceRange: { min: number; max: number };
}

export function deriveFacets(products: Product[]): Facets {
  const clubs = new Set<string>();
  const nations = new Set<string>();
  const seasons = new Set<string>();
  const sizes = new Set<string>();
  const types = new Set<string>();
  const eras = new Set<string>();
  let min = Infinity;
  let max = 0;

  for (const p of products) {
    if (p.meta.club) clubs.add(p.meta.club);
    if (p.meta.nation) nations.add(p.meta.nation);
    if (p.meta.season) seasons.add(p.meta.season);
    if (p.meta.type) types.add(p.meta.type);
    eras.add(p.meta.era);
    for (const v of p.variants) sizes.add(v.title);
    const price = priceOf(p);
    if (price < min) min = price;
    if (price > max) max = price;
  }

  return {
    clubs: [...clubs].sort(),
    nations: [...nations].sort(),
    seasons: [...seasons].sort().reverse(),
    sizes: [...sizes].sort(
      (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b),
    ),
    types: ["Home", "Away", "Third", "Goalkeeper"].filter((t) => types.has(t)),
    eras: ["Current", "Retro"].filter((e) => eras.has(e)),
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
      variables: { first, sortKey, reverse, query: null },
      tags: [TAGS.products],
      revalidate: 60,
    });
    products = reshapeProducts(data.products.edges.map((e) => e.node));
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
    variables: { first: limit, sortKey: "CREATED_AT", reverse: true, query: null },
    tags: [TAGS.products],
    revalidate: 60,
  });
  return reshapeProducts(data.products.edges.map((e) => e.node));
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];
  if (!isShopifyConfigured) return searchMockProducts(query);

  const data = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
    query: getProductsQuery,
    variables: { first: 50, sortKey: "RELEVANCE", reverse: false, query },
    tags: [TAGS.products],
    revalidate: 60,
  });
  return reshapeProducts(data.products.edges.map((e) => e.node));
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
  return reshapeProducts(data.productRecommendations ?? []).slice(0, limit);
}

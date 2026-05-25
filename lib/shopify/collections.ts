import {
  MOCK_COLLECTIONS,
  getMockCollection,
  getMockCollectionProducts,
} from "../mock-data";
import { isShopifyConfigured, shopifyFetch, TAGS } from "./client";
import { applyFilters, applySort } from "./products";
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from "./queries";
import { reshapeCollection, reshapeProducts } from "./reshape";
import type {
  Collection,
  Connection,
  Product,
  ProductFilters,
  ShopifyCollection,
  ShopifyProduct,
  SortKey,
} from "./types";

const SHOPIFY_COLLECTION_SORT: Record<
  SortKey,
  { sortKey: string; reverse: boolean }
> = {
  featured: { sortKey: "COLLECTION_DEFAULT", reverse: false },
  newest: { sortKey: "CREATED", reverse: true },
  "price-asc": { sortKey: "PRICE", reverse: false },
  "price-desc": { sortKey: "PRICE", reverse: true },
};

export async function getCollections(): Promise<Collection[]> {
  if (!isShopifyConfigured) return MOCK_COLLECTIONS;

  const data = await shopifyFetch<{
    collections: Connection<ShopifyCollection>;
  }>({
    query: getCollectionsQuery,
    variables: { first: 20 },
    tags: [TAGS.collections],
    revalidate: 60,
  });
  return data.collections.edges.map((e) => reshapeCollection(e.node));
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  if (!isShopifyConfigured) return getMockCollection(handle);

  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: getCollectionQuery,
    variables: { handle },
    tags: [TAGS.collections],
    revalidate: 60,
  });
  return data.collection ? reshapeCollection(data.collection) : undefined;
}

export async function getCollectionProducts(
  handle: string,
  opts?: { sort?: SortKey; filters?: ProductFilters },
): Promise<Product[]> {
  const { sort = "featured", filters } = opts ?? {};

  let products: Product[];
  if (!isShopifyConfigured) {
    products = getMockCollectionProducts(handle);
  } else {
    const { sortKey, reverse } = SHOPIFY_COLLECTION_SORT[sort];
    const data = await shopifyFetch<{
      collection: { products: Connection<ShopifyProduct> } | null;
    }>({
      query: getCollectionProductsQuery,
      variables: { handle, first: 100, sortKey, reverse },
      tags: [TAGS.collections],
      revalidate: 60,
    });
    products = data.collection
      ? reshapeProducts(data.collection.products.edges.map((e) => e.node))
      : [];
  }

  if (filters) products = applyFilters(products, filters);
  return applySort(products, sort);
}

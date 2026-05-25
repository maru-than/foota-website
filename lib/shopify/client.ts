/* ------------------------------------------------------------------ */
/*  Shopify Storefront API GraphQL client.                             */
/*  Reads env vars; when they are absent the data layer falls back to  */
/*  local mock data (see lib/mock-data.ts).                            */
/* ------------------------------------------------------------------ */

const rawDomain = process.env.SHOPIFY_STORE_DOMAIN ?? "";
const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2025-01";

/** True only when a real Storefront API connection is configured. */
export const isShopifyConfigured = Boolean(domain && token);

const endpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : "";

/** Cache tags so Shopify webhooks can revalidate via /api/revalidate. */
export const TAGS = {
  products: "products",
  collections: "collections",
  cart: "cart",
} as const;

export class ShopifyNotConfiguredError extends Error {
  constructor() {
    super("Shopify Storefront API is not configured.");
    this.name = "ShopifyNotConfiguredError";
  }
}

interface ShopifyFetchOptions<V> {
  query: string;
  variables?: V;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function shopifyFetch<T, V = Record<string, unknown>>({
  query,
  variables,
  cache = "force-cache",
  tags,
  revalidate,
}: ShopifyFetchOptions<V>): Promise<T> {
  if (!isShopifyConfigured) {
    throw new ShopifyNotConfiguredError();
  }

  const next =
    tags || revalidate !== undefined
      ? { tags, ...(revalidate !== undefined ? { revalidate } : {}) }
      : undefined;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(next ? { next } : {}),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shopify request failed (${res.status}): ${body}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(
      `Shopify GraphQL error: ${json.errors.map((e) => e.message).join("; ")}`,
    );
  }

  if (!json.data) {
    throw new Error("Shopify returned no data.");
  }

  return json.data;
}

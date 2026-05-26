import type { MetadataRoute } from "next";

import { getCollections } from "@/lib/shopify/collections";
import { getProducts } from "@/lib/shopify/products";
import { resolveSiteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "",
  "/shop",
  "/search",
  "/about",
  "/shipping-returns",
  "/authenticity",
  "/contact",
  "/size-guide",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = resolveSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${base}/collections/${c.handle}`,
    lastModified: now,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: new Date(p.updatedAt),
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}

/**
 * @file robots.txt — allows all crawlers except /cart, points at the sitemap.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { MetadataRoute } from "next";

import { resolveSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = resolveSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

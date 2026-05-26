"use server";

/**
 * @file Server action for the header quick-search — caps results to 6 products.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { searchProducts } from "@/lib/shopify/products";
import type { Product } from "@/lib/shopify/types";

/** Quick search used by the header overlay (returns a capped result set). */
export async function searchAction(query: string): Promise<Product[]> {
  const results = await searchProducts(query);
  return results.slice(0, 6);
}

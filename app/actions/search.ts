"use server";

import { searchProducts } from "@/lib/shopify/products";
import type { Product } from "@/lib/shopify/types";

/** Quick search used by the header overlay (returns a capped result set). */
export async function searchAction(query: string): Promise<Product[]> {
  const results = await searchProducts(query);
  return results.slice(0, 6);
}

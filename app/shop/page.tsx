/**
 * @file All-jerseys browse page — fetches products, applies URL filters/sort, renders with facets sidebar.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProductBrowser } from "@/components/shop/product-browser";
import { parseFilterParams, type SearchParamsRecord } from "@/lib/filters";
import {
  applyFilters,
  applySort,
  deriveFacets,
  getProducts,
} from "@/lib/shopify/products";

export const metadata: Metadata = {
  title: "Shop All Jerseys",
  description:
    "Browse every jersey in the Worldkit Soccer archive — filter by club, nation, season, size, type and era.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const sp = await searchParams;
  const { filters, sort } = parseFilterParams(sp);

  const all = await getProducts({ sort: "featured" });
  const facets = deriveFacets(all);
  const products = applySort(applyFilters(all, filters), sort);

  return (
    <>
      <PageHeader
        eyebrow="Summer 2026"
        title="Shop all jerseys"
        description="2026 home jerseys — all 48 nations. Filter by confederation, nation and size."
      />
      <ProductBrowser products={products} facets={facets} clearHref="/shop" />
    </>
  );
}

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
    "Browse every jersey in the Foota archive — filter by club, nation, season, size, type and era.",
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
        eyebrow="The Archive"
        title="Shop all jerseys"
        description="Every shirt in the collection — authentic, retro and iconic, filterable by club, nation, season and more."
      />
      <ProductBrowser products={products} facets={facets} clearHref="/shop" />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { ProductBrowser } from "@/components/shop/product-browser";
import {
  getCollection,
  getCollectionProducts,
  getCollections,
} from "@/lib/shopify/collections";
import { applyFilters, applySort, deriveFacets } from "@/lib/shopify/products";
import { parseFilterParams, type SearchParamsRecord } from "@/lib/filters";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.seo.title,
    description: collection.seo.description,
    openGraph: {
      title: collection.seo.title,
      description: collection.seo.description,
    },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<SearchParamsRecord>;
}) {
  const { handle } = await params;
  const sp = await searchParams;
  const { filters, sort } = parseFilterParams(sp);

  const collection = await getCollection(handle);
  if (!collection) notFound();

  const all = await getCollectionProducts(handle, { sort: "featured" });
  const facets = deriveFacets(all);
  const products = applySort(applyFilters(all, filters), sort);

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={collection.title}
        description={collection.description || undefined}
      />
      <ProductBrowser
        products={products}
        facets={facets}
        clearHref={`/collections/${handle}`}
      />
    </>
  );
}

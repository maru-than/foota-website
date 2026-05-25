import { Suspense } from "react";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Facets } from "@/lib/shopify/products";
import type { Product } from "@/lib/shopify/types";
import { FilterPanel, FiltersDrawer } from "./filters";
import { SortSelect } from "./sort-select";

/**
 * Shared filter sidebar + sort toolbar + product grid.
 * Used by both /shop and /collections/[handle]. Filtering and sorting are
 * driven through the URL by the client Filters/Sort components and applied
 * server-side by the page that renders this.
 */
export function ProductBrowser({
  products,
  facets,
  clearHref,
}: {
  products: Product[];
  facets: Facets;
  clearHref: string;
}) {
  return (
    <Container className="py-10 lg:py-14">
      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <Suspense fallback={null}>
            <FilterPanel facets={facets} />
          </Suspense>
        </aside>

        <div>
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
            <div className="flex items-center gap-4">
              <Suspense fallback={null}>
                <FiltersDrawer facets={facets} resultCount={products.length} />
              </Suspense>
              <p className="text-sm text-muted">
                {products.length} {products.length === 1 ? "jersey" : "jerseys"}
              </p>
            </div>
            <Suspense fallback={null}>
              <SortSelect />
            </Suspense>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} priorityCount={4} />
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="font-display text-2xl">No jerseys match these filters.</p>
              <p className="text-sm text-muted">Try removing a filter or two.</p>
              <Button asChild variant="outline">
                <Link href={clearHref}>Clear filters</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

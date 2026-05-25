import { Suspense } from "react";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Facets } from "@/lib/shopify/products";
import type { Product } from "@/lib/shopify/types";
import { FilterPanel, FiltersDrawer } from "./filters";
import { SortSelect } from "./sort-select";

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
      <div className="md:grid md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden md:block">
          <Suspense fallback={null}>
            <FilterPanel facets={facets} />
          </Suspense>
        </aside>

        <div>
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-line-1 pb-4">
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <Suspense fallback={null}>
                  <FiltersDrawer facets={facets} resultCount={products.length} />
                </Suspense>
              </div>
              <p className="text-sm text-fg-3">
                <b className="font-bold tabular-nums text-fg-1">{products.length}</b>{" "}
                {products.length === 1 ? "jersey" : "jerseys"}
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
              <p className="text-2xl font-bold tracking-[-0.03em]">
                No jerseys match these filters.
              </p>
              <p className="text-sm text-fg-3">Try removing a filter or two.</p>
              <Button asChild variant="secondary">
                <Link href={clearHref}>Clear filters</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

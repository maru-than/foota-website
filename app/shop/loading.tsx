/**
 * @file Shop-route skeleton — mirrors filter sidebar + grid layout to smooth navigation in from elsewhere.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { PageHeader } from "@/components/layout/page-header";
import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown during the server fetch for /shop — replaces the global loading.tsx
 * with a shape that matches what's about to render (header → grid), so the
 * transition feels intentional instead of a layout jump.
 */
export default function ShopLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Summer 2026"
        title="Shop all jerseys"
        description="2026 home and away jerseys — all 48 nations. Filter by nation, type and size."
      />
      <Container className="py-10 lg:py-14">
        <div className="md:grid md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
          <aside className="hidden md:block">
            <Skeleton className="h-5 w-20" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>
          </aside>
          <div>
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-40" />
            </div>
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </Container>
    </>
  );
}

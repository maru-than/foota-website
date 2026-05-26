/**
 * @file Collection-route skeleton — matches the page header + grid shape to avoid layout jump on navigation.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mirrors the collection page shape (eyebrow + title + grid) so navigations
 * from the homepage tiles feel like part of the destination, not a flash.
 */
export default function CollectionLoading() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line-accent bg-bg-2">
        <Container className="relative py-16 lg:py-24">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-12 w-72 max-w-full" />
          <Skeleton className="mt-4 h-4 w-96 max-w-full" />
        </Container>
      </section>
      <Container className="py-10 lg:py-14">
        <div className="md:grid md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
          <div className="hidden md:block" />
          <div>
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-line-1 pb-4">
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

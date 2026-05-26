/**
 * @file Root skeleton — generic product-grid placeholder shown while the first server fetch resolves.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-16">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-4 h-4 w-96 max-w-full" />
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="mt-3 h-3 w-1/2" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/4" />
          </div>
        ))}
      </div>
    </Container>
  );
}

/**
 * @file Skeleton matching ProductCard layout — configurable count, aria-hidden.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Matches the layout of {@link ProductGrid}/{@link ProductCard} so navigation
 * and filter changes don't flash through an empty state.
 */
export function ProductGridSkeleton({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col bg-bg-3">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="flex flex-col gap-3 border border-t-0 border-line-accent p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="mt-1 h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

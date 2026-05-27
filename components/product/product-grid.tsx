/**
 * @file Responsive product grid — 2 cols mobile / 3 tablet / 4 desktop, optional priority image loading.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}

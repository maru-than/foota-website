/**
 * @file New-arrivals section — heading, product grid, view-all link.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/shopify/types";

export function NewArrivals({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-border py-16 lg:py-20">
      <Container>
        <div>
          <SectionHeading
            eyebrow="Just landed"
            title="New arrivals"
            description="The latest 2026 kits to land — fresh drops from across the confederations."
            action={{ label: "View all", href: "/collections/new-arrivals" }}
          />
        </div>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}

/**
 * @file New-arrivals section — heading, product grid, view-all link.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/shopify/types";

export function NewArrivals({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-line-1 py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Just landed"
            title="New arrivals"
            description="The latest shirts to enter the archive — current-season kits and fresh rare finds."
            action={{ label: "View all", href: "/collections/new-arrivals" }}
          />
        </Reveal>
        <Reveal className="mt-10">
          <ProductGrid products={products} />
        </Reveal>
      </Container>
    </section>
  );
}

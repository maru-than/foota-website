/**
 * @file "More from the catalogue" section — related products grid with heading.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/shopify/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-lime-400/20 py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow="You might also like" title="More nations" />
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}

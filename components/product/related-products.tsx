import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/lib/shopify/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-line-accent py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow="You might also like" title="More from the archive" />
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}

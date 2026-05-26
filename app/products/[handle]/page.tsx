/**
 * @file Product detail page — gallery, specs, customise preview, buy box, related products, testimonials.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BackPreview } from "@/components/product/customise/back-preview";
import { CustomiseProvider } from "@/components/product/customise/customise-context";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductDetails } from "@/components/product/product-details";
import { ProductGallery } from "@/components/product/product-gallery";
import { RelatedProducts } from "@/components/product/related-products";
import { ShippingPromise } from "@/components/product/shipping-promise";
import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { Badge, jerseyBadgeVariant } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Price } from "@/components/ui/price";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTestimonialsForProduct } from "@/lib/testimonials";
import {
  getProduct,
  getProductRecommendations,
  getProducts,
} from "@/lib/shopify/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product not found" };

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${handle}` },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      type: "website",
      // Image is auto-discovered from app/products/[handle]/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const related = await getProductRecommendations(product.id, 4);
  const reviews = getTestimonialsForProduct(handle, 4);
  const price = product.priceRange.minVariantPrice;
  const label = [product.meta.confederation, product.meta.season]
    .filter(Boolean)
    .join(" · ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: product.meta.teamName ?? "Worldkit Soccer" },
    offers: {
      "@type": "Offer",
      priceCurrency: price.currencyCode,
      price: price.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="py-8 lg:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-xs text-fg-3"
        >
          <Link href="/" className="transition-colors hover:text-fg-1">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/shop" className="transition-colors hover:text-fg-1">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span className="text-fg-1">{product.title}</span>
        </nav>

        <CustomiseProvider product={product}>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <ProductGallery
              images={product.images}
              title={product.title}
              meta={product.meta}
              backSlot={
                product.meta.customisable !== false ? (
                  <BackPreview meta={product.meta} />
                ) : undefined
              }
            />

            <div className="lg:py-2">
              <div className="flex flex-wrap items-center gap-3">
                {label ? <span className="eyebrow text-fg-3">{label}</span> : null}
                {product.meta.badge ? (
                  <Badge variant={jerseyBadgeVariant(product.meta.badge)}>
                    {product.meta.badge}
                  </Badge>
                ) : null}
              </div>

              <h1 className="mt-3 text-3xl font-bold leading-none tracking-[-0.03em] text-accent sm:text-4xl">
                {product.meta.teamName ?? product.title}
              </h1>
              <p className="mt-2 text-sm text-fg-3">{product.title}</p>

              <div className="mt-5">
                <Price
                  amount={price.amount}
                  currencyCode={price.currencyCode}
                  compareAt={product.compareAtPrice}
                  className="text-2xl font-bold text-fg-1"
                />
              </div>

              <div className="mt-8">
                <ProductBuyBox product={product} />
              </div>

              <div className="mt-5">
                <ShippingPromise />
              </div>

              <div className="mt-10">
                <ProductDetails product={product} />
              </div>
            </div>
          </div>
        </CustomiseProvider>
      </Container>

      {reviews.length > 0 ? (
        <section className="border-t border-line-accent py-16 lg:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Reviews"
                title="From the locker room"
                description="What other buyers said about this shirt and its confederation."
              />
            </Reveal>
            <div className="mt-10">
              <TestimonialGrid items={reviews} columns={2} />
            </div>
          </Container>
        </section>
      ) : null}

      <RelatedProducts products={related} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductDetails } from "@/components/product/product-details";
import { ProductGallery } from "@/components/product/product-gallery";
import { RelatedProducts } from "@/components/product/related-products";
import { Badge, jerseyBadgeVariant } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Price } from "@/components/ui/price";
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

  const image = product.featuredImage?.url;
  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
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
    brand: { "@type": "Brand", name: product.meta.teamName ?? "Foota Jerseys" },
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
      <Container className="py-8 pb-28 lg:py-12 lg:pb-12">
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

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            images={product.images}
            title={product.title}
            meta={product.meta}
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

            <div className="mt-10">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </Container>

      <RelatedProducts products={related} />
    </>
  );
}

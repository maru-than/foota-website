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
          className="mb-6 flex items-center gap-1.5 text-xs text-muted"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/shop" className="transition-colors hover:text-ink">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            images={product.images}
            title={product.title}
            meta={product.meta}
          />

          <div className="lg:py-2">
            <div className="flex flex-wrap items-center gap-2">
              {product.meta.teamName ? (
                <span className="eyebrow text-grass">{product.meta.teamName}</span>
              ) : null}
              {product.meta.badge ? (
                <Badge variant={jerseyBadgeVariant(product.meta.badge)}>
                  {product.meta.badge}
                </Badge>
              ) : null}
            </div>

            <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              {product.meta.season ? <span>Season {product.meta.season}</span> : null}
              {product.meta.type ? <span>· {product.meta.type}</span> : null}
              {product.meta.era ? <span>· {product.meta.era}</span> : null}
            </div>

            <div className="mt-5">
              <Price
                amount={price.amount}
                currencyCode={price.currencyCode}
                className="font-display text-2xl"
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

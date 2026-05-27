/**
 * @file Homepage — hero, featured collections, new arrivals, editorial banner, testimonials.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";

import { EditorialBanner } from "@/components/home/editorial-banner";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { getCollections } from "@/lib/shopify/collections";
import { getProducts, pickNewArrivals } from "@/lib/shopify/products";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ sort: "featured" }),
  ]);

  const arrivals = pickNewArrivals(products, 4);

  return (
    <>
      <Hero />
      <FeaturedCollections collections={collections} />
      <NewArrivals products={arrivals} />
      <EditorialBanner />
      <TestimonialsSection />
    </>
  );
}

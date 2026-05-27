/**
 * @file Homepage — hero, featured collections, new arrivals, editorial banner, testimonials.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { RegionsStrip } from "@/components/home/regions-strip";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { getProducts, pickNewArrivals } from "@/lib/shopify/products";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const products = await getProducts({ sort: "featured" });
  const arrivals = pickNewArrivals(products, 4);

  return (
    <>
      <Hero />
      <RegionsStrip />
      <NewArrivals products={arrivals} />
      <TestimonialsSection />
    </>
  );
}

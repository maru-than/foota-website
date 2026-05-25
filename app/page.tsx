import { EditorialBanner } from "@/components/home/editorial-banner";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { NewArrivals } from "@/components/home/new-arrivals";
import { ShopByConfederation } from "@/components/home/shop-by-confederation";
import { getCollections } from "@/lib/shopify/collections";
import { getProducts, pickNewArrivals } from "@/lib/shopify/products";

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
      <ShopByConfederation />
      <Newsletter />
    </>
  );
}

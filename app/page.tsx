import { EditorialBanner } from "@/components/home/editorial-banner";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { NewArrivals } from "@/components/home/new-arrivals";
import { ShopByClub } from "@/components/home/shop-by-club";
import { getCollections } from "@/lib/shopify/collections";
import { deriveFacets, getProducts, pickNewArrivals } from "@/lib/shopify/products";

export default async function HomePage() {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ sort: "featured" }),
  ]);

  const arrivals = pickNewArrivals(products, 4);
  const clubs = deriveFacets(products).clubs.slice(0, 8);

  return (
    <>
      <Hero />
      <FeaturedCollections collections={collections} />
      <NewArrivals products={arrivals} />
      <EditorialBanner />
      <ShopByClub clubs={clubs} />
      <Newsletter />
    </>
  );
}

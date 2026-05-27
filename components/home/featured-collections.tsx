/**
 * @file Four-tile collection grid (hosts, Europe, South America, Customise) backed by real photos.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { stripConfederation } from "@/lib/utils";
import type { Collection } from "@/lib/shopify/types";

const FEATURED_ORDER = ["hosts", "uefa", "conmebol", "customs"];

const COLLECTION_IMAGES: Record<string, string> = {
  hosts: "/collections/hosts.png",
  uefa: "/collections/uefa.png",
  conmebol: "/collections/conmebol.png",
  customs: "/content/0-image.png",
  "new-arrivals": "/collections/new-arrivals.png",
  "best-sellers": "/collections/best-sellers.png",
};

/**
 * Synthetic "customs" tile — not a real Collection in the data, just a
 * marketing slot. Routes to /customise rather than /collections/customs.
 */
const CUSTOMS_TILE: Collection = {
  id: "customs",
  handle: "customs",
  title: "Customise",
  description: "Add your name on the back · +$5",
  image: null,
  seo: { title: "Customise", description: "" },
};

export function FeaturedCollections({
  collections,
}: {
  collections: Collection[];
}) {
  const ordered = FEATURED_ORDER.map((handle) => {
    if (handle === "customs") return CUSTOMS_TILE;
    return collections.find((c) => c.handle === handle);
  }).filter((c): c is Collection => Boolean(c));
  const list = ordered.length ? ordered : collections.slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div>
          <SectionHeading
            eyebrow="Collections"
            title="Find your nation"
            description="Hosts, regions, and the latest drops — every 2026 World Cup kit."
          />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((collection, i) => {
            const isCustoms = collection.handle === "customs";
            const image = COLLECTION_IMAGES[collection.handle];
            const href = isCustoms
              ? "/customise"
              : `/collections/${collection.handle}`;
            return (
              <div key={collection.id}>
                <Link
                  href={href}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-6 transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  {image ? (
                    <>
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Dark fade for text legibility (motive image stays clean). */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
                      />
                    </>
                  ) : (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-border transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  )}
                  <div className="relative">
                    <span className="eyebrow text-primary">
                      {isCustoms ? "Personalise" : "Collection"}
                    </span>
                    <h3 className="mt-1 text-2xl font-bold leading-tight">
                      {stripConfederation(collection.title)}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors group-hover:text-primary">
                      {isCustoms ? "Build yours" : "Explore"}
                      <ArrowRight
                        className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Collection } from "@/lib/shopify/types";

const FEATURED_ORDER = ["hosts", "uefa", "conmebol", "best-sellers"];

const COLLECTION_IMAGES: Record<string, string> = {
  hosts: "/collections/hosts.png",
  uefa: "/collections/uefa.png",
  conmebol: "/collections/conmebol.png",
  "new-arrivals": "/collections/new-arrivals.png",
  "best-sellers": "/collections/best-sellers.png",
};

export function FeaturedCollections({
  collections,
}: {
  collections: Collection[];
}) {
  const ordered = FEATURED_ORDER.map((handle) =>
    collections.find((c) => c.handle === handle),
  ).filter((c): c is Collection => Boolean(c));
  const list = ordered.length ? ordered : collections.slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Collections"
            title="Find your nation"
            description="Start with the hosts, a confederation, or the latest drops."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((collection, i) => {
            const image = COLLECTION_IMAGES[collection.handle];
            return (
              <Reveal key={collection.id} delay={i * 70}>
                <Link
                  href={`/collections/${collection.handle}`}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden border border-line-accent bg-bg-2 p-6 transition-transform duration-300 ease-foota hover:-translate-y-1"
                >
                  {image ? (
                    <>
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-foota group-hover:scale-105"
                      />
                      {/* Dark fade for text legibility (motive image stays clean). */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/60 to-transparent"
                      />
                    </>
                  ) : (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-line-accent transition-transform duration-500 ease-foota group-hover:scale-110"
                    />
                  )}
                  <div className="relative">
                    <span className="eyebrow text-accent">Collection</span>
                    <h3 className="mt-1 text-2xl font-bold leading-tight tracking-[-0.03em]">
                      {collection.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors group-hover:text-accent">
                      Explore
                      <ArrowRight
                        className="size-3.5 transition-transform duration-300 ease-foota group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

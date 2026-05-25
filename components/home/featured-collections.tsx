import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Collection } from "@/lib/shopify/types";

const FEATURED_ORDER = [
  "club-jerseys",
  "national-teams",
  "retro-classics",
  "new-arrivals",
];

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
    <section className="py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Collections"
            title="Browse the archive"
            description="Four ways into the collection — by club, by nation, by era and by what just landed."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {list.map((collection, i) => (
            <Reveal key={collection.id} delay={i * 80}>
              <Link
                href={`/collections/${collection.handle}`}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden border border-line bg-gradient-to-b from-paper to-[#e6e1d4] p-6 transition-colors hover:border-ink"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-line/80 transition-transform duration-500 group-hover:scale-110"
                />
                <span className="eyebrow text-grass">Collection</span>
                <h3 className="mt-1 font-display text-2xl leading-tight">
                  {collection.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink/70 transition-colors group-hover:text-ink">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

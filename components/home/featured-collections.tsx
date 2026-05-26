/**
 * @file Four-tile collection grid (hosts, UEFA, CONMEBOL, customs) with an SVG fallback for missing photos.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { teamColors } from "@/components/ui/jersey-placeholder";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { fontFor } from "@/lib/customisation";
import type { Collection } from "@/lib/shopify/types";

const FEATURED_ORDER = ["hosts", "uefa", "conmebol", "customs"];

const COLLECTION_IMAGES: Record<string, string> = {
  hosts: "/collections/hosts.png",
  uefa: "/collections/uefa.png",
  conmebol: "/collections/conmebol.png",
  "new-arrivals": "/collections/new-arrivals.png",
  "best-sellers": "/collections/best-sellers.png",
  // "customs": photo lands in commit 7. Until then, CustomsTileFallback is used.
};

/**
 * Synthetic "customs" tile — not a real Collection in the data, just a
 * marketing slot. Routes to /customise rather than /collections/customs.
 */
const CUSTOMS_TILE: Collection = {
  id: "customs",
  handle: "customs",
  title: "Customise",
  description: "Add your name on the back · +$15",
  image: null,
  seo: { title: "Customise", description: "" },
};

/** Inline SVG-rendered back tile shown until /collections/customs.webp lands. */
function CustomsTileFallback() {
  const colors = teamColors("customs");
  const font = fontFor("UEFA");
  return (
    <svg
      viewBox="0 0 200 240"
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover p-6"
    >
      <path
        d="M40 40 L70 30 L85 36 L115 36 L130 30 L160 40 L175 70 L155 80 L155 200 Q155 210 145 210 L55 210 Q45 210 45 200 L45 80 L25 70 Z"
        fill={colors.color1}
      />
      <rect x="85" y="30" width="30" height="12" fill={colors.color2} opacity="0.85" />
      <text
        x="100"
        y="92"
        textAnchor="middle"
        fontFamily={font.family}
        fontWeight={font.weight}
        fontSize="13"
        letterSpacing="3"
        fill={colors.color2}
      >
        YOUR NAME
      </text>
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fontFamily={font.family}
        fontWeight={900}
        fontSize="76"
        letterSpacing="-2"
        fill={colors.color2}
      >
        26
      </text>
    </svg>
  );
}

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
        <Reveal>
          <SectionHeading
            eyebrow="Collections"
            title="Find your nation"
            description="Start with the hosts, a confederation, or the latest drops."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((collection, i) => {
            const isCustoms = collection.handle === "customs";
            const image = COLLECTION_IMAGES[collection.handle];
            const href = isCustoms
              ? "/customise"
              : `/collections/${collection.handle}`;
            return (
              <Reveal key={collection.id} delay={i * 70}>
                <Link
                  href={href}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden border border-line-accent bg-bg-2 p-6 transition-transform duration-300 ease-worldkit hover:-translate-y-1"
                >
                  {isCustoms ? (
                    <>
                      <CustomsTileFallback />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/60 to-transparent"
                      />
                    </>
                  ) : image ? (
                    <>
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-worldkit group-hover:scale-105"
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
                      className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-line-accent transition-transform duration-500 ease-worldkit group-hover:scale-110"
                    />
                  )}
                  <div className="relative">
                    <span className="eyebrow text-accent">
                      {isCustoms ? "Personalise" : "Collection"}
                    </span>
                    <h3 className="mt-1 text-2xl font-bold leading-tight tracking-[-0.03em]">
                      {collection.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors group-hover:text-accent">
                      {isCustoms ? "Build yours" : "Explore"}
                      <ArrowRight
                        className="size-3.5 transition-transform duration-300 ease-worldkit group-hover:translate-x-1"
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

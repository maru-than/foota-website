/**
 * @file "United by one ball." — five region tiles with watercolour landmarks under colour-gradient fades.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-27
 */

import Image from "next/image";
import Link from "next/link";

type Region = {
  slug: string;
  /* Two-word region names break onto two lines per Figma; single-word names
   * sit on a single line. Storing as an array keeps the markup neutral. */
  label: readonly string[];
  /* Tailwind gradient-to colour. Nearest Tailwind shade to the Figma hex —
   * see the plan file for the hex → token mapping. */
  toneClass: string;
};

const REGIONS: readonly Region[] = [
  { slug: "north-america", label: ["North", "America"], toneClass: "to-yellow-400" },
  { slug: "south-america", label: ["South", "America"], toneClass: "to-indigo-500" },
  { slug: "europe",        label: ["Europe"],           toneClass: "to-lime-400" },
  { slug: "africa",        label: ["Africa"],           toneClass: "to-emerald-400" },
  { slug: "asia",          label: ["Asia"],             toneClass: "to-red-500" },
] as const;

export function RegionsStrip() {
  return (
    <section className="bg-background py-20 lg:py-32">
      {/* Heading column kept narrower for readable measure; the rail below
          breaks out to a wider container so the five tiles read as a broad
          editorial spread. */}
      <div className="mx-auto mb-10 max-w-7xl px-6">
        <div className="flex flex-col gap-2">
          <h2
            className="font-display leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            United by one ball.
          </h2>
          <p className="text-base tracking-[-0.02em] text-foreground/30">
            Five regions. Forty-eight nations. One trophy on the line.
          </p>
        </div>
      </div>

      {/* Desktop (lg+): 5-col grid filling a wider container so each tile is
          broader — ~290–320px wide on a 1440 viewport.
          Below lg: horizontal scroll-snap with bigger fixed tiles. */}
      <div className="mx-auto max-w-[1600px] px-3 sm:px-6">
        <div className="-mx-3 overflow-x-auto px-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex snap-x snap-mandatory gap-2 lg:grid lg:grid-cols-5 lg:gap-2">
            {REGIONS.map((region) => (
              <li
                key={region.slug}
                className="shrink-0 snap-start lg:shrink lg:snap-none"
              >
                <Link
                  href={`/shop?region=${region.slug}`}
                  className="group relative flex h-[520px] w-[280px] flex-col justify-end overflow-hidden p-6 transition-transform duration-300 hover:scale-[1.01] lg:aspect-[1/2] lg:h-auto lg:w-full"
                >
                  <Image
                    src={`/regions/${region.slug}.png`}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 280px, (max-width: 1600px) 19vw, 304px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-b from-transparent from-55% ${region.toneClass}`}
                  />
                  <div
                    className="relative font-display leading-none tracking-tight text-white"
                    style={{ fontSize: "clamp(28px, 2.8vw, 44px)" }}
                  >
                    {region.label.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

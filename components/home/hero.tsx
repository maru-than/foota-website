"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AR,
  BR,
  DE,
  ES,
  FR,
  GB_ENG,
  NL,
  PT,
} from "country-flag-icons/react/3x2";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Nation = {
  slug: string;
  name: string;
  Flag: React.ComponentType<{
    title?: string;
    className?: string;
    style?: React.CSSProperties;
  }>;
};

/* 8 most famous footballing nations. */
const NATIONS: Nation[] = [
  { slug: "brazil", name: "Brazil", Flag: BR },
  { slug: "argentina", name: "Argentina", Flag: AR },
  { slug: "germany", name: "Germany", Flag: DE },
  { slug: "france", name: "France", Flag: FR },
  { slug: "england", name: "England", Flag: GB_ENG },
  { slug: "spain", name: "Spain", Flag: ES },
  { slug: "portugal", name: "Portugal", Flag: PT },
  { slug: "netherlands", name: "Netherlands", Flag: NL },
];

const AUTO_MS = 3000;
const MANUAL_HOLD_MS = 6000;

export function Hero() {
  const [activeSlug, setActiveSlug] = useState(NATIONS[0].slug);
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const active = NATIONS.find((n) => n.slug === activeSlug) ?? NATIONS[0];

  /* Auto-advance one flag per second while in auto mode. Honors
     prefers-reduced-motion — page reload handles preference changes, so we
     read the matchMedia once and bail if reduced. */
  useEffect(() => {
    if (mode !== "auto") return;
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActiveSlug((slug) => {
        const i = NATIONS.findIndex((n) => n.slug === slug);
        return NATIONS[(i + 1) % NATIONS.length].slug;
      });
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [mode]);

  /* After a manual click, hold for 3s then resume auto. */
  const resumeTimer = useRef<number | null>(null);
  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  const handleSelect = useCallback((slug: string) => {
    setActiveSlug(slug);
    setMode("manual");
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setMode("auto");
    }, MANUAL_HOLD_MS);
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-0">
      {/* 8-column grid — the spine of the Worldkit mark. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-full flex-1 border-r border-white/20" />
        ))}
      </div>

      {/* pb reserves room for the absolute tablist below. At ≤340px the
          tablist wraps to 3 rows (~156px) + bottom-10 → ~196px needed. */}
      <div className="relative flex min-h-[600px] flex-col items-center justify-center gap-5 px-6 pb-[200px] pt-12 sm:gap-6 sm:pb-[160px] md:pb-32 lg:min-h-[90svh]">
        <Reveal className="flex flex-col items-center gap-5 sm:gap-6">
          <div className="relative h-[220px] w-[176px] shrink-0 sm:h-[260px] sm:w-[208px] lg:h-[300px] lg:w-[240px]">
            {NATIONS.map(({ slug, name }) => (
              <Image
                key={slug}
                src={`/jerseys/home-transparent/${slug}.webp`}
                alt={slug === active.slug ? `${name} 2026 home jersey` : ""}
                aria-hidden={slug !== active.slug}
                fill
                /* All 8 are rendered at mount (only opacity flips), and the
                   auto-rotate may settle on any of them — mark every one as
                   priority so the actual LCP image isn't lazy-loaded. */
                priority
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
                className={cn(
                  "object-contain transition-opacity duration-300 ease-out",
                  slug === active.slug ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>

          <h1
            className="display text-center text-fg-1"
            style={{ fontSize: "clamp(28px, 9vw, 64px)" }}
          >
            A home for jerseys<span className="text-accent">.</span>
          </h1>

          {/* CTAs fill the row on small phones (no wrapping at 280/320px),
              lock to 160px from sm: up so the design intent is preserved on
              tablets/desktop. whitespace-nowrap defends against subpixel
              wrap on the lowercase 20px labels. */}
          <div className="flex w-full max-w-[336px] items-center justify-center gap-3 sm:max-w-none">
            <Link
              href={`/products/${active.slug}-home`}
              className="inline-flex flex-1 items-center justify-center whitespace-nowrap bg-accent px-3 py-3 text-[20px] font-semibold lowercase text-bg-0 transition-colors hover:bg-accent-hi sm:w-[160px] sm:flex-none sm:px-5"
            >
              buy now
            </Link>
            <Link
              href="/shop"
              className="inline-flex flex-1 items-center justify-center whitespace-nowrap border border-white/25 px-3 py-3 text-[20px] font-semibold lowercase text-fg-1 transition-colors hover:border-white/60 hover:bg-white/5 sm:w-[160px] sm:flex-none sm:px-5"
            >
              see all
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Nation flag selector. */}
      <div
        role="tablist"
        aria-label="Choose a nation"
        className="absolute inset-x-0 bottom-10 flex flex-wrap items-center justify-center gap-3 px-6 sm:gap-4"
      >
        {NATIONS.map(({ slug, name, Flag }) => {
          const isActive = slug === activeSlug;
          return (
            <button
              key={slug}
              role="tab"
              aria-selected={isActive}
              aria-label={name}
              onClick={() => handleSelect(slug)}
              className={cn(
                "group relative overflow-hidden transition-transform duration-200",
                "h-[44px] w-[64px] sm:h-[48px] sm:w-[70px]",
                isActive && "scale-110",
              )}
            >
              <Flag
                title={name}
                className="h-full w-full object-cover transition-[filter] duration-200 group-hover:!filter-none"
                style={
                  isActive
                    ? undefined
                    : { filter: "brightness(0.6) saturate(0.75)" }
                }
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

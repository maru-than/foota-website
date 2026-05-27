/**
 * @file Editorial split-screen hero — Worldkit copy + daily nation jersey on a lime grid.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Nation = { slug: string; name: string };

/* The eight most famous footballing nations. The active hero shirt rotates
 * by UTC day — each day shows a different nation, deterministic per server
 * render so SSR/CSR stay consistent and the lint purity rule is satisfied. */
const NATIONS: Nation[] = [
  { slug: "brazil", name: "Brazil" },
  { slug: "argentina", name: "Argentina" },
  { slug: "germany", name: "Germany" },
  { slug: "france", name: "France" },
  { slug: "england", name: "England" },
  { slug: "spain", name: "Spain" },
  { slug: "portugal", name: "Portugal" },
  { slug: "netherlands", name: "Netherlands" },
];

function pickNationOfTheDay(): Nation {
  const dayIndex = Math.floor(Date.now() / 86_400_000) % NATIONS.length;
  return NATIONS[dayIndex];
}

/* 18×18 of 22px cells = 396px. The grid is rendered as a CSS background
 * pattern so the lines stay pixel-perfect regardless of container math —
 * 196 wrapped flex children were one row off on a 280px frame because the
 * 1px outer border ate into the inner area. */
const GRID_LINE_COLOR = "rgba(163, 230, 53, 0.55)"; // lime-400 / 55%
const GRID_BG_IMAGE = `linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)`;

export function Hero() {
  const active = pickNationOfTheDay();

  return (
    <section className="bg-background">
      <div className="grid min-h-[80svh] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-0 lg:py-32">
        {/* LEFT — copy + CTAs */}
        <div className="flex flex-col items-start gap-6 lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h1
                className="font-display leading-none tracking-tight whitespace-nowrap text-foreground"
                style={{ fontSize: "clamp(36px, 4.2vw, 56px)" }}
              >
                <span className="block">Worldkit,</span>
                <span className="block">A home for jerseys.</span>
              </h1>
              <p className="mt-2 text-base tracking-[-0.02em] text-foreground/30">
                2026 World Cup. 48 nations. Dispatched worldwide.
              </p>
            </div>

            <div className="flex flex-col items-start gap-1">
              <Link
                href={`/products/${active.slug}-away`}
                className="inline-flex items-center gap-3 rounded-full bg-lime-400 px-4 py-[11px] text-[15px] tracking-[-0.04em] text-gray-950 shadow-[inset_0_0_4px_0_rgba(255,255,255,1)] transition-colors hover:bg-lime-500"
              >
                Explore the {active.name.toLowerCase()} kit
                <ArrowRight className="size-3" strokeWidth={2} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center rounded-full bg-neutral-950 px-4 py-[11px] text-[15px] tracking-[-0.04em] text-white shadow-[inset_0_0_4px_0_rgba(255,255,255,0.2),0_0_1px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-neutral-900"
              >
                See all
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — jersey layered over lime grid.
            Proportions: lime block & grid are 90%×77% of the container;
            jersey fills 90%×100%. The container scales from ~300px wide on
            phones up to 440px on desktop via `aspect-[440/515]` + max-w,
            so every layer scales together — no breakpoint-specific math. */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-[440/515] w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[440px]">
            {/* Lime fill block, offset back-left */}
            <div
              className="absolute left-0 top-[15.5%] aspect-square w-[90%] bg-lime-200"
              aria-hidden
            />

            {/* White grid square — 22px CSS-gradient pattern. The cell size
                is absolute so the grid stays crisp at every breakpoint
                (count varies, density reads the same). Hidden on the very
                smallest viewports where the layered card gets too dense. */}
            <div
              className="absolute left-[10%] top-[23.3%] hidden aspect-square w-[90%] bg-white sm:block"
              aria-hidden
              style={{
                backgroundImage: GRID_BG_IMAGE,
                backgroundSize: "22px 22px",
                boxShadow: "inset 0 0 0 1px rgba(163, 230, 53, 0.55)",
              }}
            />

            {/* Jersey — front of stack, fills the full container so it can
                read through grid + lime via its transparent margins. */}
            <Image
              src={`/jerseys/away-transparent/${active.slug}.webp`}
              alt={`${active.name} 2026 away jersey`}
              fill
              priority
              sizes="(max-width: 640px) 252px, (max-width: 1024px) 342px, 396px"
              className="absolute left-[10%] top-0 h-full w-[90%] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

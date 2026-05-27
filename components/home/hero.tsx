/**
 * @file Single-shot editorial hero — one jersey, one headline, one CTA. Active nation randomized per request.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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

export function Hero() {
  const active = pickNationOfTheDay();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative flex min-h-[640px] flex-col items-center justify-center gap-8 px-6 py-20 sm:gap-10 lg:min-h-[80svh] lg:py-32">
        <div className="relative h-[260px] w-[208px] shrink-0 sm:h-[320px] sm:w-[256px] lg:h-[400px] lg:w-[320px]">
          <Image
            src={`/jerseys/home-transparent/${active.slug}.webp`}
            alt={`${active.name} 2026 home jersey`}
            fill
            priority
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
            className="object-contain"
          />
        </div>

        <h1
          className="font-display text-center leading-none text-foreground"
          style={{ fontSize: "clamp(48px, 11vw, 120px)" }}
        >
          A home for jerseys<span className="text-primary">.</span>
        </h1>

        <div className="flex flex-col items-center gap-4">
          <Button asChild size="xl">
            <Link href={`/products/${active.slug}-home`}>
              Shop the {active.name} kit →
            </Link>
          </Button>
          <Link
            href="/shop"
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            or browse all 48
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-paper to-[#ece8dd]">
      {/* Faint pitch-circle motif — editorial, no photography required. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 hidden size-[560px] -translate-y-1/2 rounded-full border border-line/70 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-1/2 hidden size-[190px] -translate-y-1/2 rounded-full border border-line/70 lg:block"
      />

      <Container className="relative flex min-h-[78vh] flex-col justify-center py-24">
        <Reveal>
          <span className="eyebrow text-grass">Authentic · Retro · Iconic</span>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            A home for jerseys.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Discover authentic, retro and iconic football shirts from clubs and
            nations around the world.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="uppercase tracking-[0.12em]">
              <Link href="/shop">Shop Jerseys</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="uppercase tracking-[0.12em]"
            >
              <Link href="/collections/retro-classics">Explore Retro</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

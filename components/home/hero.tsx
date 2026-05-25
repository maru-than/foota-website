import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const STATS = [
  { value: "48", label: "Nations" },
  { value: "16", label: "Host cities" },
  { value: "Jun 11", label: "Kickoff" },
];

export function Hero() {
  return (
    <section className="hero-grid-texture relative overflow-hidden border-b border-line-accent bg-bg-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 30%, rgba(193,255,86,.06), transparent 60%)",
        }}
      />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-24">
        <Reveal className="flex flex-col gap-6">
          <h1 className="display text-fg-1" style={{ fontSize: "clamp(44px, 8vw, 92px)", lineHeight: 0.9 }}>
            A home for jerseys<span className="text-accent">.</span>
          </h1>
          <p className="max-w-md text-[17px] leading-relaxed text-fg-2">
            Every nation at the 2026 FIFA World Cup. Official home shirts from
            all 48 teams — dispatched worldwide, in 48h.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-5">
            <Button asChild>
              <Link href="/shop">
                Shop jerseys <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Link
              href="/collections/hosts"
              className="border-b border-line-accent pb-1 text-[13px] font-semibold text-fg-1 transition-colors hover:border-accent hover:text-accent"
            >
              View the hosts →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-8 border-t border-line-1 pt-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <b className="text-2xl font-bold tracking-[-0.03em] text-accent tabular-nums">
                  {s.value}
                </b>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-3">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="relative flex items-center justify-center">
          <div className="relative flex aspect-[5/6] w-full max-w-[420px] items-center justify-center overflow-hidden border border-line-accent bg-white">
            <Image
              src="/jerseys/home/brazil.jpg"
              alt="Brazil 2026 home jersey"
              fill
              sizes="(max-width: 1024px) 70vw, 420px"
              priority
              className="object-contain p-6"
            />
          </div>
          <div className="absolute right-0 top-8 hidden min-w-[160px] flex-col gap-1 border border-line-accent bg-bg-1 p-3 sm:flex lg:-right-4">
            <span className="eyebrow text-fg-3">Featured</span>
            <span className="text-sm font-bold tracking-[-0.03em]">Brazil · Home</span>
            <span className="text-sm font-bold tracking-[-0.03em] text-accent tabular-nums">
              CHF 119.00
            </span>
          </div>
          <div className="absolute bottom-14 left-0 hidden flex-col gap-1 border border-line-accent bg-bg-1 p-3 sm:flex lg:-left-6">
            <span className="eyebrow text-fg-3">In stock</span>
            <span className="text-sm font-bold tracking-[-0.03em]">All sizes S–XXL</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * @file About page — brand story, Worldkit's 2026 World Cup focus, single-product scope and operational promise.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Worldkit Soccer is the home for the World Cup 2026 — every nation's home and away kit in one place.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="A home for jerseys."
        description="The home for the World Cup 2026 — every nation's home and away kit, in one place."
        image="/pages/about.png"
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-foreground/80 [&_h2]:text-foreground">
          <section className="space-y-3">
            <h2 className="font-display text-3xl">
              Built for the summer of 2026
            </h2>
            <p>
              The World Cup 2026 is the biggest ever — 48 nations,
              16 cities, one summer across the USA, Canada and Mexico. Worldkit
              Soccer is built for it: one place to find both kits of every
              side in the draw.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-3xl">What we stock</h2>
            <p>
              All 48 qualified nations, from the co-hosts to the debutants —
              shop your continent, your rivals or your second team.
              2026 home and away jerseys, sizes S–XXL.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-3xl">How we work</h2>
            <p>
              Every shirt is inspected before it ships and dispatched worldwide in
              48 hours. Checkout, payments and fulfilment run securely through
              Shopify, so you can back your nation from anywhere.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}

import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Foota Jerseys is the home for the 2026 FIFA World Cup — every nation's official home shirt in one place.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="A home for jerseys."
        description="The home for the 2026 FIFA World Cup — every nation's home shirt, in one place."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-fg-2 [&_h2]:text-fg-1">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">
              Built for the World Cup
            </h2>
            <p>
              The 2026 FIFA World Cup is the biggest ever — 48 nations, 16 cities,
              one tournament across the USA, Canada and Mexico. Foota is built for
              it: one place to find the home shirt of every side in the draw.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">What we stock</h2>
            <p>
              All 48 qualified nations, from the co-hosts to the debutants —
              grouped by confederation so you can shop your continent, your rivals
              or your second team. Official 2026 home jerseys, sizes S–XXL.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">How we work</h2>
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

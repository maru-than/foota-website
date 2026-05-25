import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Foota Jerseys is a curated home for authentic, retro and iconic football shirts — chosen for the moments they belong to.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="A home for jerseys."
        description="Foota Jerseys is a curated destination for football fans, collectors and anyone who loves the culture of the game."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-muted [&_h2]:text-ink">
          <section className="space-y-3">
            <h2 className="font-display text-2xl">More than a shop</h2>
            <p>
              We started Foota with a simple belief: a football shirt is never
              just a shirt. It&apos;s a season, a city, a player, a night you
              never forgot. Our archive is built around that idea — shirts
              chosen for the stories they carry, not just the badge on the
              chest.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-2xl">What we curate</h2>
            <p>
              From current-season club and national-team kits to deep-cut retro
              classics and genuinely rare finds, every jersey is selected by
              hand. We care about the eras that mattered and the designs that
              became part of football&apos;s visual language.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-2xl">How we work</h2>
            <p>
              Each shirt is inspected and graded before it reaches the archive.
              Checkout, payments and fulfilment are handled securely through
              Shopify, so you can shop with confidence wherever you are in the
              world.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}

import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Worldwide shipping with tracking, dispatched in 48h, and a 30-day returns policy on unworn shirts.",
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Shipping & Returns"
        description="Getting your jersey, and what to do if it isn't quite right."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-fg-2 [&_h2]:text-fg-1">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">Shipping</h2>
            <p>
              Worldwide shipping with tracking on every order. Costs and delivery
              estimates are calculated at checkout by destination. Most orders are
              dispatched within 48 hours.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">Returns</h2>
            <p>
              Returns within 30 days of delivery on unworn shirts with original
              tags. Retro and rare shirts are eligible unless noted on the product
              page.
            </p>
            <p>
              To start a return, contact us with your order number and we&apos;ll
              guide you through it.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">Order tracking</h2>
            <p>
              Once your order ships, you&apos;ll get a confirmation email with
              tracking from our Shopify-powered checkout.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}

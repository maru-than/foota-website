import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Worldwide shipping with tracking, and a 30-day returns policy on unworn shirts.",
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Shipping & Returns"
        description="Everything you need to know about getting your jersey, and what to do if it isn't quite right."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-muted [&_h2]:text-ink">
          <section className="space-y-3">
            <h2 className="font-display text-2xl">Shipping</h2>
            <p>
              We ship worldwide with tracking on every order. Shipping costs and
              delivery estimates are calculated at checkout based on your
              destination. Most orders are dispatched within 1–2 working days.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-2xl">Returns</h2>
            <p>
              We accept returns within 30 days of delivery on unworn shirts with
              their original tags attached. Retro and rare shirts are eligible
              for return unless described otherwise on the product page.
            </p>
            <p>
              To start a return, contact us with your order number and we&apos;ll
              guide you through the next steps.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-2xl">Order tracking</h2>
            <p>
              Once your order ships, you&apos;ll receive a confirmation email
              with tracking details directly from our Shopify-powered checkout.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}

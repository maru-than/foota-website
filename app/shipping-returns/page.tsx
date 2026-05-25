import type { Metadata } from "next";

import { ShippingReturnsContent } from "@/components/info/shipping-returns-content";
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
        <div className="max-w-3xl">
          <ShippingReturnsContent />
        </div>
      </Container>
    </>
  );
}

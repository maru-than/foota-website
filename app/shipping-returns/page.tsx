/**
 * @file Shipping & returns policy — 48h dispatch, worldwide tracking, 30-day returns on unworn jerseys.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";

import { ShippingReturnsContent } from "@/components/info/shipping-returns-content";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Worldwide shipping with tracking, dispatched in 48h, and a 30-day returns policy on unworn shirts.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Shipping & Returns"
        description="Getting your jersey, and what to do if it isn't quite right."
        image="/pages/shipping-returns.png"
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl">
          <ShippingReturnsContent />
        </div>
      </Container>
    </>
  );
}

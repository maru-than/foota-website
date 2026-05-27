/**
 * @file Authenticity page — pre-ship QC narrative (stitching, crest, font verification) plus social proof.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";

import { AuthenticityContent } from "@/components/info/authenticity-content";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Quality check",
  description:
    "Every 2026 World Cup jersey at Worldkit Soccer is inspected on arrival — stitching, crest, fonts and finish are checked before it ships.",
  alternates: { canonical: "/authenticity" },
};

export default function AuthenticityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our promise"
        title="Quality check"
        description="Every 2026 shirt is inspected before it ships."
        image="/pages/authenticity.png"
      />
      <Container className="py-20 lg:py-32">
        <div className="max-w-3xl">
          <AuthenticityContent />
        </div>
      </Container>
    </>
  );
}

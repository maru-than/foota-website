import type { Metadata } from "next";

import { SizeGuideContent } from "@/components/info/size-guide-content";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Measurements for football shirts by size, plus how to measure and choose your fit.",
};

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Size Guide"
        description="Shirts vary by era and manufacturer — use these measurements as a guide before picking your size."
        image="/pages/size-guide.png"
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl">
          <SizeGuideContent />
        </div>
      </Container>
    </>
  );
}

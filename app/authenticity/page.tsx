import type { Metadata } from "next";

import { AuthenticityContent } from "@/components/info/authenticity-content";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Quality check",
  description:
    "Every 2026 home jersey at Foota is inspected on arrival — stitching, crest, fonts and finish are checked before it ships.",
};

export default function AuthenticityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our promise"
        title="Quality check"
        description="Every 2026 shirt is inspected before it ships."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl">
          <AuthenticityContent />
        </div>
      </Container>
    </>
  );
}

import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Authenticity",
  description:
    "Every 2026 World Cup home jersey at Foota is an official replica, inspected before it ships.",
};

const POINTS = [
  {
    name: "Official replica",
    text: "Every 2026 home shirt is an official replica, sourced as licensed product in new condition.",
  },
  {
    name: "Quality-checked",
    text: "Each shirt is inspected for print, badge and stitching before it ships.",
  },
  {
    name: "Dispatched worldwide",
    text: "Tracked shipping to every nation, dispatched within 48 hours.",
  },
];

export default function AuthenticityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our promise"
        title="Authenticity & Condition"
        description="Every 2026 World Cup shirt is official and inspected before it ships."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-fg-2 [&_h2]:text-fg-1">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">What you get</h2>
            <p>
              Foota stocks official 2026 home jerseys for all 48 World Cup
              nations. Each one is sourced as licensed product and checked against
              official references for badge, crest and manufacturing details.
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            {POINTS.map((point) => (
              <div key={point.name} className="border border-line-accent bg-bg-2 p-5">
                <h3 className="eyebrow text-accent">{point.name}</h3>
                <p className="mt-3 text-sm">{point.text}</p>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">Inspection</h2>
            <p>
              Each shirt is photographed, measured and condition-checked. Any
              notable details are described on the product page — no surprises
              when your jersey arrives.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}

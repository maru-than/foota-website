import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Authenticity",
  description:
    "How we grade and verify every shirt in the Foota archive — Authentic, Retro and Rare Find.",
};

const GRADES = [
  {
    name: "Authentic",
    text: "Current and recent-season shirts sourced as officially licensed product, in new condition.",
  },
  {
    name: "Retro",
    text: "Archive shirts from past seasons. Vintage cuts and colourways, checked against original references.",
  },
  {
    name: "Rare Find",
    text: "Hard-to-source shirts with limited availability — verified, graded and described in detail.",
  },
];

export default function AuthenticityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our promise"
        title="Authenticity & Condition"
        description="Every jersey is inspected and graded by our team before it joins the archive."
      />
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl space-y-10 text-pretty leading-relaxed text-muted [&_h2]:text-ink">
          <section className="space-y-3">
            <h2 className="font-display text-2xl">How we grade</h2>
            <p>
              We classify every shirt so you always know what you&apos;re
              buying. Where a shirt is officially licensed, it is sourced as
              such; retro and rare shirts are checked against original
              references for badges, fonts and manufacturing details.
            </p>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            {GRADES.map((grade) => (
              <div key={grade.name} className="border border-line bg-paper p-5">
                <h3 className="eyebrow text-grass">{grade.name}</h3>
                <p className="mt-3 text-sm">{grade.text}</p>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl">Inspection</h2>
            <p>
              Each shirt is photographed, measured and condition-checked. Any
              notable flaws are described on the product page, so there are no
              surprises when your jersey arrives.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}

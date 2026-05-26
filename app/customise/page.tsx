import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, Truck } from "lucide-react";

import { FontSpecimen } from "@/components/product/customise/font-specimen";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CUSTOM_MAX_NAME_CHARS,
  CUSTOM_PRICE_DELTA,
} from "@/lib/customisation";

export const metadata: Metadata = {
  title: "Customise — name & number printing",
  description:
    "Add any name and any number (0–99) to the back of any 2026 home jersey. Heat-pressed in the official confederation font, dispatched in 5–7 days.",
  alternates: { canonical: "/customise" },
};

const CONFEDS = ["UEFA", "CONMEBOL", "CONCACAF", "CAF", "AFC", "OFC"];

const HOW = [
  {
    Icon: Flame,
    title: "Officially heat-pressed",
    note: "Each name and number is pressed at the same temperature and pressure as a stadium jersey.",
  },
  {
    Icon: ShieldCheck,
    title: "Confederation-accurate font",
    note: "The letter set matches the one used by your nation's federation. Six fonts covered.",
  },
  {
    Icon: Truck,
    title: "Tracked worldwide",
    note: "Customs ship in 5–7 days with tracking to the door. Non-returnable, so double-check spelling.",
  },
];

export default function CustomisePage() {
  return (
    <>
      <section className="border-b border-line-accent py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Personalise"
              title="The name on the back is yours."
              description={`Add any name (up to ${CUSTOM_MAX_NAME_CHARS} characters) and any number from 0 to 99 to any 2026 home jersey. Flat $${CUSTOM_PRICE_DELTA} add-on per shirt.`}
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 bg-accent px-5 py-3 text-sm font-semibold lowercase text-bg-0 transition-colors hover:bg-accent-hi"
              >
                Pick a jersey
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/products/brazil-home?customise=open"
                className="inline-flex items-center gap-1.5 border border-line-accent px-5 py-3 text-sm font-semibold lowercase text-fg-1 transition-colors hover:border-accent hover:bg-accent-12"
              >
                Try it on Brazil
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="From input to heat-press" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW.map(({ Icon, title, note }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="flex flex-col gap-3 border border-line-accent p-6">
                  <Icon className="size-5 text-accent" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold leading-tight tracking-[-0.03em] text-fg-1">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-2">{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line-accent bg-bg-2 py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Letter sets"
              title="Six fonts, one for each confederation"
              description="Pick a nation and the matching font ships automatically — the same letter set the federation uses on stadium kits."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONFEDS.map((confed, i) => (
              <Reveal key={confed} delay={i * 60}>
                <div className="border border-line-accent bg-bg-1 p-5">
                  <FontSpecimen confederation={confed} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <h2 className="display text-3xl leading-tight sm:text-4xl">
              Ready to put your name on it
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-fg-2">
              Customs are non-returnable. Please double-check spelling and number
              before adding to the bag — every shirt is heat-pressed to order.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 bg-accent px-5 py-3 text-sm font-semibold lowercase text-bg-0 transition-colors hover:bg-accent-hi"
              >
                Pick a jersey
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

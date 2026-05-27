/**
 * @file Customisation landing — name & number printing explained, with pricing, fonts and confederation breakdown.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, Truck } from "lucide-react";

import { FontSpecimen } from "@/components/product/customise/font-specimen";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CUSTOM_MAX_NAME_CHARS,
  CUSTOM_PRICE_DELTA,
} from "@/lib/customisation";

export const metadata: Metadata = {
  title: "Customise — name & number printing",
  description:
    "Add any name and any number (0–99) to the back of any 2026 World Cup jersey. Heat-pressed in the official confederation font, dispatched in 5–7 days.",
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
      <section className="border-b border-border py-16 lg:py-24">
        <Container>
          <div>
            <SectionHeading
              eyebrow="Personalise"
              title="The name on the back is yours."
              description={`Add any name (up to ${CUSTOM_MAX_NAME_CHARS} characters) and any number from 0 to 99 to any 2026 World Cup jersey. Flat $${CUSTOM_PRICE_DELTA} add-on per shirt.`}
            />
          </div>
          <div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 bg-primary px-5 py-3 text-sm font-semibold lowercase text-background transition-colors hover:bg-primary/90"
              >
                Pick a jersey
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/products/brazil-home?customise=open"
                className="inline-flex items-center gap-1.5 border border-border px-5 py-3 text-sm font-semibold lowercase text-foreground transition-colors hover:border-primary hover:bg-accent"
              >
                Try it on Brazil
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div>
            <SectionHeading eyebrow="How it works" title="From input to heat-press" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW.map(({ Icon, title, note }, i) => (
              <div key={title}>
                <div className="flex flex-col gap-3 border border-border p-6">
                  <Icon className="size-5 text-primary" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold leading-tight text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-card py-16 lg:py-20">
        <Container>
          <div>
            <SectionHeading
              eyebrow="Letter sets"
              title="Six fonts, one for each confederation"
              description="Pick a nation and the matching font ships automatically — the same letter set the federation uses on stadium kits."
            />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONFEDS.map((confed, i) => (
              <div key={confed}>
                <div className="border border-border bg-background p-5">
                  <FontSpecimen confederation={confed} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-2xl text-center">
          <div>
            <h2 className="display text-3xl leading-tight sm:text-4xl">
              Ready to put your name on it
              <span className="text-primary">.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              Customs are non-returnable. Please double-check spelling and number
              before adding to the bag — every shirt is heat-pressed to order.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 bg-primary px-5 py-3 text-sm font-semibold lowercase text-background transition-colors hover:bg-primary/90"
              >
                Pick a jersey
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

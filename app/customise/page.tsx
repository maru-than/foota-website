/**
 * @file Customisation landing — name & number printing explained, with pricing and process.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CUSTOM_MAX_NAME_CHARS,
  CUSTOM_PRICE_DELTA,
} from "@/lib/customisation";

export const metadata: Metadata = {
  title: "Customise — name & number printing",
  description:
    "Add any name and any number (0–99) to the back of any 2026 World Cup jersey. Officially heat-pressed, dispatched in 5–7 days.",
  alternates: { canonical: "/customise" },
};

const HOW = [
  {
    Icon: Flame,
    title: "Officially heat-pressed",
    note: "Each name and number is pressed at the same temperature and pressure as a stadium jersey.",
  },
  {
    Icon: ShieldCheck,
    title: "Authentic lettering",
    note: "The letter set matches the official font used on stadium kits.",
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
      <section className="border-b border-border py-20 lg:py-32">
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
              <Button asChild size="lg">
                <Link href="/shop">
                  Pick a jersey
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products/brazil-home?customise=open">
                  Try it on Brazil
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-40">
        <Container>
          <div>
            <SectionHeading eyebrow="How it works" title="From input to heat-press" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW.map(({ Icon, title, note }) => (
              <div key={title}>
                <div className="flex flex-col gap-3 rounded-xl border border-border p-6">
                  <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  <h3 className="text-lg leading-tight text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-40">
        <Container className="max-w-2xl text-center">
          <div>
            <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Ready to put your name on it
              <span className="text-primary">.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              Customs are non-returnable. Please double-check spelling and number
              before adding to the bag — every shirt is heat-pressed to order.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/shop">
                  Pick a jersey
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

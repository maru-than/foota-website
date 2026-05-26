/**
 * @file Shared authenticity / quality-check body. Used by route page and modal.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { CheckCircle2, Globe, Layers, type LucideIcon } from "lucide-react";

import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { getFeaturedTestimonials } from "@/lib/testimonials";

const POINTS: { name: string; text: string; Icon: LucideIcon }[] = [
  {
    name: "Inspected on arrival",
    text: "Every shirt is checked against reference photos before it leaves the warehouse.",
    Icon: CheckCircle2,
  },
  {
    name: "Stitching & finish",
    text: "Each piece is examined for print, badge alignment and seam quality.",
    Icon: Layers,
  },
  {
    name: "Dispatched worldwide",
    text: "Tracked shipping to every nation, dispatched within 48 hours.",
    Icon: Globe,
  },
];

export function AuthenticityContent() {
  const testimonials = getFeaturedTestimonials(3);
  return (
    <div className="space-y-8 text-pretty leading-relaxed text-fg-2 [&_h3]:text-fg-1">
      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">What you get</h3>
        <p>
          Worldkit Soccer stocks 2026 home and away jerseys for all 48 nations in the field. Every
          jersey is inspected on arrival — stitching, crest, fonts and finish
          are checked against reference photos before it ships.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {POINTS.map(({ name, text, Icon }) => (
          <div key={name} className="border border-line-accent bg-bg-2 p-4">
            <h4 className="eyebrow flex items-center gap-1.5 text-accent">
              <Icon className="size-3.5" strokeWidth={1.5} aria-hidden />
              {name}
            </h4>
            <p className="mt-2 text-sm">{text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Inspection</h3>
        <p>
          Each shirt is photographed, measured and condition-checked. Any
          notable details are described on the product page — no surprises when
          your jersey arrives.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Customisation</h3>
        <p>
          Custom names and numbers are heat-pressed in-house with the same
          equipment used on stadium kits. Letter sets match the official font
          used by each confederation — UEFA, CONMEBOL, CONCACAF, CAF, AFC and
          OFC each ship their own typeface.
        </p>
        <p>
          Every custom is held for a final QC pass: alignment to the back
          centre, print adhesion under a heat test, and a spell-check against
          the order. Customs ship in 5–7 days and are non-returnable — read
          more on{" "}
          <a href="/shipping-returns" className="text-accent underline">
            shipping &amp; returns
          </a>
          .
        </p>
      </section>

      {testimonials.length > 0 ? (
        <section className="space-y-4">
          <div>
            <span className="eyebrow text-accent">In their words</span>
            <h3 className="mt-1 text-lg font-bold tracking-[-0.02em]">
              From recent buyers
            </h3>
          </div>
          <TestimonialGrid items={testimonials} columns={3} />
        </section>
      ) : null}
    </div>
  );
}

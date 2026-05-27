/**
 * @file Verified-reviews homepage section — fetches six testimonials and renders as a 3-column grid.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedTestimonials } from "@/lib/testimonials";

export function TestimonialsSection() {
  const items = getFeaturedTestimonials(6);
  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div>
          <SectionHeading
            eyebrow="Worn worldwide"
            title="What collectors are saying"
            description="Verified reviews from buyers across all six confederations."
          />
        </div>
        <div className="mt-10">
          <TestimonialGrid items={items} columns={3} />
        </div>
      </Container>
    </section>
  );
}

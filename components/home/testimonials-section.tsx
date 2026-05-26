import { TestimonialGrid } from "@/components/testimonials/testimonial-grid";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedTestimonials } from "@/lib/testimonials";

export function TestimonialsSection() {
  const items = getFeaturedTestimonials(6);
  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Worn worldwide"
            title="What collectors are saying"
            description="Verified reviews from buyers across all six confederations."
          />
        </Reveal>
        <div className="mt-10">
          <TestimonialGrid items={items} columns={3} />
        </div>
      </Container>
    </section>
  );
}

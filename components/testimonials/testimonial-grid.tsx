import { Reveal } from "@/components/ui/reveal";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

import { TestimonialCard } from "./testimonial-card";

export function TestimonialGrid({
  items,
  columns = 3,
}: {
  items: Testimonial[];
  columns?: 2 | 3;
}) {
  if (items.length === 0) return null;
  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-5",
        columns === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2",
      )}
    >
      {items.map((t, i) => (
        <Reveal key={t.id} delay={i * 70}>
          <TestimonialCard testimonial={t} />
        </Reveal>
      ))}
    </div>
  );
}

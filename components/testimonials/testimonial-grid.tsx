/**
 * @file Responsive grid of testimonial cards — 2 or 3 columns, staggered reveal animation.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

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
      {items.map((t) => (
        <div key={t.id}>
          <TestimonialCard testimonial={t} />
        </div>
      ))}
    </div>
  );
}

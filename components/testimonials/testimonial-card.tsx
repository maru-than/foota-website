/**
 * @file Review card — star rating, quote, author with flag, product link, formatted date.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { CountryFlag } from "@/components/testimonials/country-flag";
import { StarRating } from "@/components/ui/star-rating";
import { getMockProduct } from "@/lib/mock-data";
import type { Testimonial } from "@/lib/testimonials";

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const product = testimonial.productHandle
    ? getMockProduct(testimonial.productHandle)
    : undefined;
  const verifiedDate = DATE_FMT.format(new Date(testimonial.date));

  return (
    <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <StarRating rating={testimonial.rating} />

      <blockquote className="mt-5 text-pretty leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex flex-col gap-1 border-t border-border pt-4 text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-foreground">
          <CountryFlag code={testimonial.country} />
          {testimonial.author}
        </span>
        <span className="text-xs text-muted-foreground">
          {product ? `${product.title} · ` : ""}
          {verifiedDate}
        </span>
      </figcaption>
    </figure>
  );
}

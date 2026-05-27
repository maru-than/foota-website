/**
 * @file Inline-SVG 5-star rating — filled = accent, empty = muted hairline, sr-only summary.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { cn } from "@/lib/utils";

/**
 * Inline-SVG 5-star rating. Filled = accent, empty = muted hairline.
 * Keep purely presentational — no semantics beyond the sr-only summary.
 */
export function StarRating({
  rating,
  size = "md",
  className,
}: {
  rating: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "sm" ? 12 : 14;
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= rating;
        return (
          <svg
            key={i}
            width={px}
            height={px}
            viewBox="0 0 14 14"
            aria-hidden
            className={filled ? "text-primary" : "text-muted-foreground/60"}
          >
            <path
              d="M7 1.2l1.79 3.63 4.01.58-2.9 2.83.69 3.99L7 10.36l-3.59 1.87.69-3.99L1.2 5.41l4.01-.58L7 1.2z"
              fill="currentColor"
            />
          </svg>
        );
      })}
      <span className="sr-only">Rated {rating} out of 5</span>
    </div>
  );
}

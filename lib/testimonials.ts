/**
 * @file Mock customer testimonials — social proof for homepage, PDPs and
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

/* ------------------------------------------------------------------ */
/*  Mock customer testimonials — social proof for homepage, PDPs and   */
/*  the authenticity page. Single pool, tagged by confederation /      */
/*  nation so PDPs can filter to relevant voices.                       */
/* ------------------------------------------------------------------ */

import { MOCK_PRODUCTS } from "./mock-data";

type Confederation = "UEFA" | "CONMEBOL" | "CONCACAF" | "CAF" | "AFC" | "OFC";

/** ISO 3166-1 alpha-2 (or GB-ENG / GB-SCT for British home nations).
 *  Matches the symbol names re-exported by country-flag-icons/react/3x2. */
export type CountryCode =
  | "AR" | "AU" | "BR" | "CA" | "CO" | "ES" | "FR" | "GB" | "GB_ENG"
  | "GH" | "JP" | "MA" | "MX" | "NL" | "NZ" | "PT" | "US";

export interface Testimonial {
  id: string;
  author: string;
  /** Country of residence — rendered as a flag chip on the card. */
  country: CountryCode;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Optional direct link to a product handle in MOCK_PRODUCTS. */
  productHandle?: string;
  confederation?: Confederation;
  nation?: string;
  /** Surface on homepage / authenticity grids. */
  featured?: boolean;
  /** ISO date. Rendered as "Verified · Mon YYYY". */
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-01",
    author: "James K.",
    country: "GB_ENG",
    rating: 5,
    quote:
      "The fit is sharper than the official store and it landed in three days. Crest stitching is exactly like the photos — no surprises.",
    productHandle: "england-home",
    confederation: "UEFA",
    nation: "England",
    featured: true,
    date: "2026-03-12",
  },
  {
    id: "t-02",
    author: "Sofía M.",
    country: "AR",
    rating: 5,
    quote:
      "Arrived in perfect condition, properly packaged. The Argentina shirt is the real one — I compared it side-by-side with my 2022.",
    productHandle: "argentina-home",
    confederation: "CONMEBOL",
    nation: "Argentina",
    featured: true,
    date: "2026-02-28",
  },
  {
    id: "t-03",
    author: "Marcus T.",
    country: "US",
    rating: 5,
    quote:
      "Got my daughter's name on the back for her birthday — the font matches the official stadium kit exactly. She hasn't taken it off since.",
    confederation: "CONCACAF",
    featured: true,
    date: "2026-04-02",
  },
  {
    id: "t-04",
    author: "Yuki S.",
    country: "JP",
    rating: 5,
    quote:
      "Shipping to Japan was faster than ordering domestically. The Samurai Blue print is crisp and the collar sits properly.",
    productHandle: "japan-home",
    confederation: "AFC",
    nation: "Japan",
    date: "2026-03-19",
  },
  {
    id: "t-05",
    author: "Khalid B.",
    country: "MA",
    rating: 5,
    quote:
      "Inspection note in the package was a nice touch. You can tell someone actually looked at this shirt before it left.",
    productHandle: "morocco-home",
    confederation: "CAF",
    nation: "Morocco",
    featured: true,
    date: "2026-03-08",
  },
  {
    id: "t-06",
    author: "Lucas F.",
    country: "BR",
    rating: 5,
    quote:
      "I've been burned by knock-offs twice. This is the first online shirt I've kept. Stitching, weight, fonts — all correct.",
    productHandle: "brazil-home",
    confederation: "CONMEBOL",
    nation: "Brazil",
    featured: true,
    date: "2026-04-11",
  },
  {
    id: "t-07",
    author: "Élise R.",
    country: "FR",
    rating: 4,
    quote:
      "Quality is exactly what I wanted. Took off a star because I'd love size in EU as well, but the S–XXL fit was true.",
    productHandle: "france-home",
    confederation: "UEFA",
    nation: "France",
    date: "2026-02-14",
  },
  {
    id: "t-08",
    author: "Diego A.",
    country: "MX",
    rating: 5,
    quote:
      "Ordered MESSI 10 on the Argentina shirt. Heat-press is dead-straight, no fraying after three washes — exactly like the stadium version.",
    productHandle: "argentina-home",
    confederation: "CONMEBOL",
    nation: "Argentina",
    featured: true,
    date: "2026-04-22",
  },
  {
    id: "t-09",
    author: "Hannah W.",
    country: "AU",
    rating: 5,
    quote:
      "Ordered the Socceroos kit not expecting much — it arrived in 5 days with tracking the whole way. Properly packed too.",
    productHandle: "australia-home",
    confederation: "AFC",
    nation: "Australia",
    date: "2026-03-27",
  },
  {
    id: "t-10",
    author: "Pieter V.",
    country: "NL",
    rating: 5,
    quote:
      "The Oranje shirt is the right shade, the right weight, and the badge sits where it should. I'll be back for the away.",
    productHandle: "netherlands-home",
    confederation: "UEFA",
    nation: "Netherlands",
    date: "2026-03-04",
  },
  {
    id: "t-11",
    author: "Ana P.",
    country: "CO",
    rating: 5,
    quote:
      "Customer service answered me at midnight my time. Replaced a size with no friction. That's why I'm buying the away next.",
    productHandle: "colombia-home",
    confederation: "CONMEBOL",
    nation: "Colombia",
    date: "2026-04-01",
  },
  {
    id: "t-12",
    author: "Tom H.",
    country: "CA",
    rating: 5,
    quote:
      "Picked up the Canada home for the home tournament. The shirt's better than I remember from 2022 and it shipped same-day.",
    productHandle: "canada-home",
    confederation: "CONCACAF",
    nation: "Canada",
    date: "2026-04-15",
  },
  {
    id: "t-13",
    author: "Adesua O.",
    country: "GH",
    rating: 5,
    quote:
      "Genuinely surprised by the packaging — flat, protected, ready to frame. The Black Stars shirt is gorgeous in person.",
    productHandle: "ghana-home",
    confederation: "CAF",
    nation: "Ghana",
    featured: true,
    date: "2026-02-19",
  },
  {
    id: "t-14",
    author: "Inés G.",
    country: "ES",
    rating: 5,
    quote:
      "Worldkit's photos don't lie. Whatever you see in the listing is what shows up. That alone makes them my default now.",
    productHandle: "spain-home",
    confederation: "UEFA",
    nation: "Spain",
    date: "2026-03-22",
  },
  {
    id: "t-15",
    author: "Rafael C.",
    country: "PT",
    rating: 5,
    quote:
      "Bought three shirts across two orders. Both arrived in 48 hours flat. The condition checks are not marketing — they're real.",
    productHandle: "portugal-home",
    confederation: "UEFA",
    nation: "Portugal",
    date: "2026-04-08",
  },
  {
    id: "t-16",
    author: "Liam O.",
    country: "NZ",
    rating: 5,
    quote:
      "Shipping to NZ is usually a nightmare. Worldkit got the All Whites kit to me faster than most local stores. Quality matched.",
    productHandle: "new-zealand-home",
    confederation: "OFC",
    nation: "New Zealand",
    featured: true,
    date: "2026-03-30",
  },
];

/* ------------------------------- Lookups -------------------------------- */

export function getFeaturedTestimonials(limit = 6): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.featured).slice(0, limit);
}

/**
 * Resolve testimonials for a given product handle. Falls back to
 * confederation / nation tag matches when no direct productHandle hits.
 * Returns an empty array if nothing matches — caller should hide the section.
 */
export function getTestimonialsForProduct(
  handle: string,
  limit = 4,
): Testimonial[] {
  const product = MOCK_PRODUCTS.find((p) => p.handle === handle);
  if (!product) return [];

  const seen = new Set<string>();
  const out: Testimonial[] = [];

  const push = (t: Testimonial) => {
    if (seen.has(t.id) || out.length >= limit) return;
    seen.add(t.id);
    out.push(t);
  };

  // 1. Direct handle match.
  for (const t of TESTIMONIALS) {
    if (t.productHandle === handle) push(t);
  }
  // 2. Same nation (covers home <-> away of the same side).
  for (const t of TESTIMONIALS) {
    if (t.nation && t.nation === product.meta.nation) push(t);
  }
  // 3. Same confederation — group-stage neighbours.
  for (const t of TESTIMONIALS) {
    if (t.confederation && t.confederation === product.meta.confederation) push(t);
  }

  return out;
}

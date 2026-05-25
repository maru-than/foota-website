import type {
  Collection,
  JerseyBadge,
  JerseyEra,
  JerseyType,
  Product,
  ProductVariant,
} from "./shopify/types";

/* ------------------------------------------------------------------ */
/*  Local development catalogue.                                       */
/*  Used automatically whenever Shopify env vars are not configured,   */
/*  so the storefront is fully previewable offline. Shaped exactly     */
/*  like the normalized `Product`/`Collection` types the components    */
/*  consume, so swapping to live Shopify data needs no UI changes.     */
/* ------------------------------------------------------------------ */

const CURRENCY = "CHF";
const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

interface Spec {
  handle: string;
  title: string;
  club?: string;
  nation?: string;
  season: string;
  type: JerseyType;
  era: JerseyEra;
  badge?: JerseyBadge;
  price: number;
  soldOut?: string[];
  blurb: string;
}

const SPECS: Spec[] = [
  {
    handle: "ac-milan-2006-07-home",
    title: "AC Milan 2006/07 Home Jersey",
    club: "AC Milan",
    season: "2006/07",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 119,
    soldOut: ["XXL"],
    blurb:
      "The shirt of Milan's seventh European crown — bold rossoneri stripes worn through the 2007 Champions League triumph in Athens.",
  },
  {
    handle: "brazil-2002-home",
    title: "Brazil 2002 Home Jersey",
    nation: "Brazil",
    season: "2002",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 129,
    blurb:
      "Canary yellow from the Seleção's fifth World Cup — the shirt of the Ronaldo, Rivaldo and Ronaldinho front line.",
  },
  {
    handle: "arsenal-2025-26-home",
    title: "Arsenal 2025/26 Home Jersey",
    club: "Arsenal",
    season: "2025/26",
    type: "Home",
    era: "Current",
    badge: "New",
    price: 99,
    blurb:
      "The latest home shirt from North London — classic red and white, reworked for the new season.",
  },
  {
    handle: "inter-milan-1997-98-away",
    title: "Inter Milan 1997/98 Away Jersey",
    club: "Inter Milan",
    season: "1997/98",
    type: "Away",
    era: "Retro",
    badge: "Rare Find",
    price: 149,
    soldOut: ["S", "XXL"],
    blurb:
      "Ronaldo's UEFA Cup-winning season in deep navy. A genuinely hard-to-find away shirt for the collector.",
  },
  {
    handle: "switzerland-2024-home",
    title: "Switzerland 2024 Home Jersey",
    nation: "Switzerland",
    season: "2024",
    type: "Home",
    era: "Current",
    price: 89,
    blurb:
      "The Nati's home shirt — crisp red with the white cross, made for a new generation of supporters.",
  },
  {
    handle: "fc-barcelona-2010-11-home",
    title: "FC Barcelona 2010/11 Home Jersey",
    club: "FC Barcelona",
    season: "2010/11",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 139,
    blurb:
      "Blaugrana stripes from the Guardiola era — the shirt of arguably the finest club side ever assembled.",
  },
  {
    handle: "juventus-2025-26-home",
    title: "Juventus 2025/26 Home Jersey",
    club: "Juventus",
    season: "2025/26",
    type: "Home",
    era: "Current",
    badge: "New",
    price: 99,
    blurb: "Black and white from Turin, freshly drawn for the new campaign.",
  },
  {
    handle: "germany-1990-home",
    title: "Germany 1990 Home Jersey",
    nation: "Germany",
    season: "1990",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 134,
    blurb:
      "The geometric colourway of the 1990 World Cup winners — an undisputed design classic.",
  },
  {
    handle: "manchester-united-1998-99-home",
    title: "Manchester United 1998/99 Home Jersey",
    club: "Manchester United",
    season: "1998/99",
    type: "Home",
    era: "Retro",
    badge: "Rare Find",
    price: 159,
    soldOut: ["XXL"],
    blurb:
      "The Treble shirt — worn through the most famous comeback in Camp Nou history.",
  },
  {
    handle: "france-1998-home",
    title: "France 1998 Home Jersey",
    nation: "France",
    season: "1998",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 144,
    blurb:
      "Les Bleus on home soil — the shirt of a first World Cup, won in Saint-Denis.",
  },
  {
    handle: "real-madrid-2025-26-away",
    title: "Real Madrid 2025/26 Away Jersey",
    club: "Real Madrid",
    season: "2025/26",
    type: "Away",
    era: "Current",
    badge: "New",
    price: 99,
    blurb: "A modern away shirt from the Bernabéu, ready for the road.",
  },
  {
    handle: "liverpool-2005-home",
    title: "Liverpool 2005 Home Jersey",
    club: "Liverpool",
    season: "2004/05",
    type: "Home",
    era: "Retro",
    badge: "Rare Find",
    price: 154,
    soldOut: ["S"],
    blurb:
      "Istanbul. Three goals down, then immortal — the most romantic Liverpool shirt of the modern era.",
  },
  {
    handle: "argentina-1986-home",
    title: "Argentina 1986 Home Jersey",
    nation: "Argentina",
    season: "1986",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 139,
    blurb:
      "Albiceleste stripes from Mexico '86 — the shirt of the greatest individual tournament ever played.",
  },
  {
    handle: "netherlands-1988-home",
    title: "Netherlands 1988 Home Jersey",
    nation: "Netherlands",
    season: "1988",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 129,
    blurb:
      "Oranje geometry from the '88 European Championship — and Van Basten's impossible volley.",
  },
  {
    handle: "napoli-1987-88-home",
    title: "Napoli 1987/88 Home Jersey",
    club: "Napoli",
    season: "1987/88",
    type: "Home",
    era: "Retro",
    badge: "Rare Find",
    price: 149,
    soldOut: ["S", "XL"],
    blurb: "Sky blue from Maradona's Napoli — a shirt that carried a city's dreams.",
  },
  {
    handle: "england-1990-home",
    title: "England 1990 Home Jersey",
    nation: "England",
    season: "1990",
    type: "Home",
    era: "Retro",
    badge: "Retro",
    price: 119,
    blurb:
      "Italia '90 — the shirt of Gazza's tears and a nation half in love with its team again.",
  },
];

function makeVariants(
  productId: string,
  price: number,
  soldOut: string[],
): ProductVariant[] {
  return SIZES.map((size) => ({
    id: `${productId}/${size}`,
    title: size,
    availableForSale: !soldOut.includes(size),
    selectedOptions: [{ name: "Size", value: size }],
    price: { amount: price.toFixed(2), currencyCode: CURRENCY },
  }));
}

function makeProduct(spec: Spec, index: number): Product {
  const id = `gid://mock/Product/${index + 1}`;
  const soldOut = spec.soldOut ?? [];
  const variants = makeVariants(id, spec.price, soldOut);
  const money = { amount: spec.price.toFixed(2), currencyCode: CURRENCY };
  const teamName = spec.club ?? spec.nation ?? null;
  // Stagger timestamps so "Newest" sorting is deterministic.
  const created = new Date(2026, 4, 1);
  created.setDate(created.getDate() - index * 9);

  const tags = [
    spec.club ? `club:${spec.club}` : null,
    spec.nation ? `nation:${spec.nation}` : null,
    `season:${spec.season}`,
    spec.type ? `type:${spec.type}` : null,
    `era:${spec.era}`,
    spec.badge ? `badge:${spec.badge}` : null,
  ].filter((t): t is string => Boolean(t));

  return {
    id,
    handle: spec.handle,
    title: spec.title,
    description: spec.blurb,
    descriptionHtml: `<p>${spec.blurb}</p><p>Each shirt is inspected and graded by our team before it joins the archive. Officially licensed where applicable.</p>`,
    availableForSale: variants.some((v) => v.availableForSale),
    tags,
    options: [{ id: `${id}/option/size`, name: "Size", values: [...SIZES] }],
    priceRange: { minVariantPrice: money, maxVariantPrice: money },
    compareAtPrice: null,
    featuredImage: null,
    images: [],
    variants,
    meta: {
      club: spec.club ?? null,
      nation: spec.nation ?? null,
      season: spec.season,
      type: spec.type,
      era: spec.era,
      badge: spec.badge ?? null,
      teamName,
    },
    seo: { title: spec.title, description: spec.blurb },
    createdAt: created.toISOString(),
    updatedAt: created.toISOString(),
  };
}

export const MOCK_PRODUCTS: Product[] = SPECS.map(makeProduct);

/* ------------------------------ Collections ----------------------------- */

interface CollectionRule {
  handle: string;
  title: string;
  description: string;
  match: (p: Product) => boolean;
}

const COLLECTION_RULES: CollectionRule[] = [
  {
    handle: "club-jerseys",
    title: "Club Jerseys",
    description:
      "Shirts from the clubs that shaped the game — league nights, derby days and European epics.",
    match: (p) => p.meta.club !== null,
  },
  {
    handle: "national-teams",
    title: "National Teams",
    description:
      "International shirts from World Cups and continental tournaments across the decades.",
    match: (p) => p.meta.nation !== null,
  },
  {
    handle: "retro-classics",
    title: "Retro Classics",
    description:
      "Archive shirts from the seasons that became legend — vintage cuts, unmistakable colourways.",
    match: (p) => p.meta.era === "Retro",
  },
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    description:
      "The latest jerseys to land in the archive — current-season kits and fresh rare finds.",
    match: (p) => p.meta.badge === "New" || p.meta.era === "Current",
  },
];

export const MOCK_COLLECTIONS: Collection[] = COLLECTION_RULES.map((rule, i) => ({
  id: `gid://mock/Collection/${i + 1}`,
  handle: rule.handle,
  title: rule.title,
  description: rule.description,
  image: null,
  seo: { title: rule.title, description: rule.description },
}));

/* ------------------------------- Lookups -------------------------------- */

export function getMockProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getMockProduct(handle: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.handle === handle);
}

export function getMockCollection(handle: string): Collection | undefined {
  return MOCK_COLLECTIONS.find((c) => c.handle === handle);
}

export function getMockCollectionProducts(handle: string): Product[] {
  const rule = COLLECTION_RULES.find((r) => r.handle === handle);
  if (!rule) return [];
  return MOCK_PRODUCTS.filter(rule.match);
}

export function getMockNewArrivals(limit = 8): Product[] {
  // Current-season and "New" shirts first, then most-recent retros.
  const ranked = [...MOCK_PRODUCTS].sort((a, b) => {
    const score = (p: Product) =>
      (p.meta.badge === "New" ? 2 : 0) + (p.meta.era === "Current" ? 1 : 0);
    const diff = score(b) - score(a);
    if (diff !== 0) return diff;
    return b.createdAt.localeCompare(a.createdAt);
  });
  return ranked.slice(0, limit);
}

export function searchMockProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return MOCK_PRODUCTS.filter((p) => {
    const haystack = [
      p.title,
      p.meta.club,
      p.meta.nation,
      p.meta.season,
      p.meta.type,
      p.meta.era,
      ...p.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every((term) => haystack.includes(term));
  });
}

export function getMockRecommendations(productId: string, limit = 4): Product[] {
  const current = MOCK_PRODUCTS.find((p) => p.id === productId);
  const pool = MOCK_PRODUCTS.filter((p) => p.id !== productId);
  if (!current) return pool.slice(0, limit);
  // Prefer same era, then everything else.
  const ranked = pool.sort((a, b) => {
    const score = (p: Product) =>
      (p.meta.era === current.meta.era ? 1 : 0) +
      (p.meta.type === current.meta.type ? 1 : 0);
    return score(b) - score(a);
  });
  return ranked.slice(0, limit);
}

/** Resolve a mock variant id back to its product + variant (for cart). */
export function findMockVariant(
  variantId: string,
): { product: Product; variant: ProductVariant } | undefined {
  for (const product of MOCK_PRODUCTS) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

/** Curated club list for the homepage "Shop by club" section. */
export const MOCK_CLUBS: string[] = Array.from(
  new Set(MOCK_PRODUCTS.map((p) => p.meta.club).filter((c): c is string => Boolean(c))),
);

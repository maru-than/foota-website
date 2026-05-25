import type {
  Collection,
  JerseyBadge,
  Product,
  ProductVariant,
} from "./shopify/types";

/* ------------------------------------------------------------------ */
/*  Foota catalogue — FIFA World Cup 2026.                             */
/*  The shop sells official 2026 home jerseys for the 48 nations of    */
/*  the first 48-team World Cup, co-hosted by the USA, Canada & Mexico.*/
/*  Images live in /public/jerseys/home/<slug>.jpg (and away/).        */
/*  fallback; shaped exactly like the normalized Shopify types.        */
/* ------------------------------------------------------------------ */

const CURRENCY = "CHF";
const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

const REGION: Record<string, string> = {
  UEFA: "Europe",
  CONMEBOL: "South America",
  CONCACAF: "North & Central America",
  CAF: "Africa",
  AFC: "Asia",
  OFC: "Oceania",
};

interface Spec {
  slug: string; // matches /public/jerseys/home|away/<slug>.jpg and the handle
  nation: string;
  conf: keyof typeof REGION;
  price: number;
  host?: boolean;
  isNew?: boolean;
  soldOut?: string[];
}

// Ordered so marquee / new drops surface first in "New arrivals".
const SPECS: Spec[] = [
  // UEFA
  { slug: "england", nation: "England", conf: "UEFA", price: 119, isNew: true, soldOut: ["XXL"] },
  { slug: "france", nation: "France", conf: "UEFA", price: 119, isNew: true },
  { slug: "spain", nation: "Spain", conf: "UEFA", price: 119, isNew: true },
  { slug: "portugal", nation: "Portugal", conf: "UEFA", price: 119, isNew: true },
  { slug: "germany", nation: "Germany", conf: "UEFA", price: 119, soldOut: ["S"] },
  { slug: "netherlands", nation: "Netherlands", conf: "UEFA", price: 109 },
  { slug: "belgium", nation: "Belgium", conf: "UEFA", price: 109 },
  { slug: "croatia", nation: "Croatia", conf: "UEFA", price: 109 },
  { slug: "switzerland", nation: "Switzerland", conf: "UEFA", price: 99 },
  { slug: "austria", nation: "Austria", conf: "UEFA", price: 99 },
  { slug: "scotland", nation: "Scotland", conf: "UEFA", price: 99 },
  { slug: "norway", nation: "Norway", conf: "UEFA", price: 99, isNew: true },
  // CONMEBOL
  { slug: "argentina", nation: "Argentina", conf: "CONMEBOL", price: 119, isNew: true, soldOut: ["XXL"] },
  { slug: "brazil", nation: "Brazil", conf: "CONMEBOL", price: 119, isNew: true },
  { slug: "uruguay", nation: "Uruguay", conf: "CONMEBOL", price: 109 },
  { slug: "colombia", nation: "Colombia", conf: "CONMEBOL", price: 109, isNew: true },
  { slug: "ecuador", nation: "Ecuador", conf: "CONMEBOL", price: 99 },
  { slug: "paraguay", nation: "Paraguay", conf: "CONMEBOL", price: 89 },
  { slug: "venezuela", nation: "Venezuela", conf: "CONMEBOL", price: 89 },
  { slug: "bolivia", nation: "Bolivia", conf: "CONMEBOL", price: 89 },
  // CONCACAF (incl. hosts)
  { slug: "usa", nation: "USA", conf: "CONCACAF", price: 119, host: true, soldOut: ["XXL"] },
  { slug: "mexico", nation: "Mexico", conf: "CONCACAF", price: 119, host: true },
  { slug: "canada", nation: "Canada", conf: "CONCACAF", price: 109, host: true },
  { slug: "costa-rica", nation: "Costa Rica", conf: "CONCACAF", price: 99 },
  { slug: "jamaica", nation: "Jamaica", conf: "CONCACAF", price: 99, isNew: true },
  { slug: "panama", nation: "Panama", conf: "CONCACAF", price: 89 },
  { slug: "honduras", nation: "Honduras", conf: "CONCACAF", price: 89 },
  { slug: "haiti", nation: "Haiti", conf: "CONCACAF", price: 89 },
  { slug: "curacao", nation: "Curaçao", conf: "CONCACAF", price: 89, isNew: true },
  { slug: "el-salvador", nation: "El Salvador", conf: "CONCACAF", price: 89 },
  // CAF
  { slug: "morocco", nation: "Morocco", conf: "CAF", price: 109, isNew: true, soldOut: ["S"] },
  { slug: "senegal", nation: "Senegal", conf: "CAF", price: 109, soldOut: ["XXL"] },
  { slug: "ivory-coast", nation: "Ivory Coast", conf: "CAF", price: 99 },
  { slug: "egypt", nation: "Egypt", conf: "CAF", price: 99 },
  { slug: "algeria", nation: "Algeria", conf: "CAF", price: 99 },
  { slug: "ghana", nation: "Ghana", conf: "CAF", price: 99 },
  { slug: "cape-verde", nation: "Cape Verde", conf: "CAF", price: 89, isNew: true },
  { slug: "south-africa", nation: "South Africa", conf: "CAF", price: 89 },
  // AFC
  { slug: "japan", nation: "Japan", conf: "AFC", price: 109, isNew: true, soldOut: ["XL"] },
  { slug: "south-korea", nation: "South Korea", conf: "AFC", price: 109 },
  { slug: "australia", nation: "Australia", conf: "AFC", price: 99 },
  { slug: "saudi-arabia", nation: "Saudi Arabia", conf: "AFC", price: 99 },
  { slug: "iran", nation: "Iran", conf: "AFC", price: 99 },
  { slug: "qatar", nation: "Qatar", conf: "AFC", price: 99 },
  { slug: "iraq", nation: "Iraq", conf: "AFC", price: 89 },
  { slug: "jordan", nation: "Jordan", conf: "AFC", price: 89, isNew: true },
  { slug: "united-arab-emirates", nation: "United Arab Emirates", conf: "AFC", price: 89 },
  // OFC
  { slug: "new-zealand", nation: "New Zealand", conf: "OFC", price: 99, isNew: true },
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

function describe(spec: Spec): string {
  if (spec.host) {
    return `${spec.nation}'s home shirt for the 2026 FIFA World Cup — a co-host nation, playing the first 48-team finals on home soil across the USA, Canada and Mexico.`;
  }
  return `${spec.nation}'s home shirt for the 2026 FIFA World Cup — ${REGION[spec.conf]}'s representative at the first 48-nation finals across the USA, Canada and Mexico.`;
}

function makeProduct(spec: Spec, index: number): Product {
  const id = `gid://mock/Product/${index + 1}`;
  const soldOut = spec.soldOut ?? [];
  const variants = makeVariants(id, spec.price, soldOut);
  const money = { amount: spec.price.toFixed(2), currencyCode: CURRENCY };
  const badge: JerseyBadge = spec.host ? "Host" : spec.isNew ? "New" : null;
  const image = {
    url: `/jerseys/home/${spec.slug}.jpg`,
    altText: `${spec.nation} 2026 home jersey`,
  };
  const lead = describe(spec);
  // Stagger timestamps so "New arrivals" / "Newest" sorting is deterministic.
  const created = new Date(2026, 4, 20);
  created.setDate(created.getDate() - index * 2);

  const tags = [
    `nation:${spec.nation}`,
    `confederation:${spec.conf}`,
    "season:2026",
    "type:Home",
    "era:Current",
    badge ? `badge:${badge}` : null,
  ].filter((t): t is string => Boolean(t));

  return {
    id,
    handle: `${spec.slug}-2026-home`,
    title: `${spec.nation} 2026 Home Jersey`,
    description: lead,
    descriptionHtml: `<p>${lead}</p><p>Official home jersey · sizes S–XXL. Inspected before it ships, dispatched worldwide in 48h.</p>`,
    availableForSale: variants.some((v) => v.availableForSale),
    tags,
    options: [{ id: `${id}/option/size`, name: "Size", values: [...SIZES] }],
    priceRange: { minVariantPrice: money, maxVariantPrice: money },
    compareAtPrice: null,
    featuredImage: image,
    images: [image],
    variants,
    meta: {
      club: null,
      nation: spec.nation,
      confederation: spec.conf,
      season: "2026",
      type: "Home",
      era: "Current",
      badge,
      teamName: spec.nation,
    },
    seo: { title: `${spec.nation} 2026 Home Jersey`, description: lead },
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
    handle: "hosts",
    title: "Host Nations",
    description:
      "USA · Canada · Mexico — hosting the first 48-team World Cup across 16 cities.",
    match: (p) => p.meta.badge === "Host",
  },
  {
    handle: "uefa",
    title: "Europe",
    description: "UEFA nations heading to the 2026 World Cup.",
    match: (p) => p.meta.confederation === "UEFA",
  },
  {
    handle: "conmebol",
    title: "South America",
    description: "CONMEBOL nations heading to the 2026 World Cup.",
    match: (p) => p.meta.confederation === "CONMEBOL",
  },
  {
    handle: "concacaf",
    title: "North & Central America",
    description: "CONCACAF nations heading to the 2026 World Cup.",
    match: (p) => p.meta.confederation === "CONCACAF",
  },
  {
    handle: "caf",
    title: "Africa",
    description: "CAF nations heading to the 2026 World Cup.",
    match: (p) => p.meta.confederation === "CAF",
  },
  {
    handle: "afc",
    title: "Asia",
    description: "AFC nations heading to the 2026 World Cup.",
    match: (p) => p.meta.confederation === "AFC",
  },
  {
    handle: "ofc",
    title: "Oceania",
    description: "OFC nations heading to the 2026 World Cup.",
    match: (p) => p.meta.confederation === "OFC",
  },
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "The latest shirts to land in the archive.",
    match: (p) => p.meta.badge === "New",
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

/** Confederations for the homepage "Shop by confederation" section. */
export const MOCK_CONFEDERATIONS = [
  { name: "Europe", abbr: "UEFA", handle: "uefa" },
  { name: "South America", abbr: "CONMEBOL", handle: "conmebol" },
  { name: "N. & C. America", abbr: "CONCACAF", handle: "concacaf" },
  { name: "Africa", abbr: "CAF", handle: "caf" },
  { name: "Asia", abbr: "AFC", handle: "afc" },
  { name: "Oceania", abbr: "OFC", handle: "ofc" },
];

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

export function searchMockProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return MOCK_PRODUCTS.filter((p) => {
    const haystack = [
      p.title,
      p.meta.nation,
      p.meta.confederation,
      p.meta.season,
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
  // Prefer the same confederation — group-stage neighbours.
  const ranked = pool.sort(
    (a, b) =>
      (b.meta.confederation === current.meta.confederation ? 1 : 0) -
      (a.meta.confederation === current.meta.confederation ? 1 : 0),
  );
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

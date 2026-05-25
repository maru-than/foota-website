/* ------------------------------------------------------------------ */
/*  Shopify Storefront API types (raw) + normalized app types.         */
/*  Components consume the normalized `Product`, `Collection`, `Cart`. */
/* ------------------------------------------------------------------ */

export type Maybe<T> = T | null;

export interface Connection<T> {
  edges: Array<{ node: T }>;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}

/* ----------------------------- Raw Shopify ----------------------------- */

export interface ShopifyImage {
  url: string;
  altText: Maybe<string>;
  width: Maybe<number>;
  height: Maybe<number>;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  options: Array<{ id: string; name: string; optionValues: Array<{ name: string }> }>;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPriceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  featuredImage: Maybe<ShopifyImage>;
  images: Connection<ShopifyImage>;
  variants: Connection<ShopifyVariant>;
  seo: { title: Maybe<string>; description: Maybe<string> };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Maybe<ShopifyImage>;
  seo: { title: Maybe<string>; description: Maybe<string> };
  updatedAt: string;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    price: Money;
    product: {
      id: string;
      handle: string;
      title: string;
      tags: string[];
      featuredImage: Maybe<ShopifyImage>;
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Maybe<Money>;
  };
  lines: Connection<ShopifyCartLine>;
}

/* --------------------------- Normalized app --------------------------- */

export interface Image {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string; // e.g. "M"
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
}

export interface ProductOption {
  id: string;
  name: string; // e.g. "Size"
  values: string[];
}

export type JerseyBadge = "Retro" | "New" | "Rare Find" | "Host" | null;
export type JerseyType = "Home" | "Away" | "Third" | "Goalkeeper" | null;
export type JerseyEra = "Current" | "Retro";

export interface JerseyMeta {
  club: string | null;
  nation: string | null;
  /** Confederation: UEFA, CONMEBOL, CONCACAF, CAF, AFC, OFC. */
  confederation: string | null;
  season: string | null; // "2026"
  type: JerseyType;
  era: JerseyEra;
  badge: JerseyBadge;
  /** club ?? nation — the small muted label on cards/pages. */
  teamName: string | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  options: ProductOption[];
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPrice: Money | null;
  featuredImage: Image | null;
  images: Image[];
  variants: ProductVariant[];
  meta: JerseyMeta;
  seo: { title: string; description: string };
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
  seo: { title: string; description: string };
}

export interface CartLine {
  id: string; // line id
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string; // variant id
    title: string; // size label
    selectedOptions: SelectedOption[];
    price: Money;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: Image | null;
      teamName: string | null;
    };
  };
}

export interface Cart {
  id: string;
  /** Shopify-hosted checkout URL. Empty string in mock mode. */
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
}

/* ------------------------------ Query I/O ------------------------------ */

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export interface ProductFilters {
  club?: string[];
  nation?: string[];
  confederation?: string[];
  season?: string[];
  size?: string[];
  type?: string[]; // Home / Away / Third / Goalkeeper
  era?: string[]; // Current / Retro
  minPrice?: number;
  maxPrice?: number;
}

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

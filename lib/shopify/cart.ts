import { cookies } from "next/headers";

import { findMockVariant } from "../mock-data";
import { isShopifyConfigured, shopifyFetch } from "./client";
import {
  addToCartMutation,
  createCartMutation,
  removeFromCartMutation,
  updateCartMutation,
} from "./mutations";
import { getCartQuery } from "./queries";
import { reshapeCart } from "./reshape";
import type { Cart, CartLine, Money, ShopifyCart } from "./types";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

const CART_COOKIE = "cartId";
const MOCK_CART_COOKIE = "mockCart";
const ONE_YEAR = 60 * 60 * 24 * 365;

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR,
  };
}

/* ------------------------------- mock cart ------------------------------ */

interface MockLine {
  merchandiseId: string;
  quantity: number;
}

function readMockLines(store: CookieStore): MockLine[] {
  const raw = store.get(MOCK_CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is MockLine =>
        typeof l === "object" &&
        l !== null &&
        typeof (l as MockLine).merchandiseId === "string" &&
        typeof (l as MockLine).quantity === "number" &&
        (l as MockLine).quantity > 0,
    );
  } catch {
    return [];
  }
}

function writeMockLines(store: CookieStore, lines: MockLine[]): void {
  store.set(MOCK_CART_COOKIE, JSON.stringify(lines), cookieOptions());
}

function buildMockCart(lines: MockLine[]): Cart {
  const cartLines: CartLine[] = [];
  let subtotal = 0;
  let totalQuantity = 0;
  let currency = "USD";

  for (const raw of lines) {
    const found = findMockVariant(raw.merchandiseId);
    if (!found) continue;
    const { product, variant } = found;
    const unit = Number.parseFloat(variant.price.amount);
    const lineTotal = unit * raw.quantity;
    subtotal += lineTotal;
    totalQuantity += raw.quantity;
    currency = variant.price.currencyCode;
    cartLines.push({
      id: raw.merchandiseId, // mock line id === variant id
      quantity: raw.quantity,
      cost: {
        totalAmount: { amount: lineTotal.toFixed(2), currencyCode: currency },
      },
      merchandise: {
        id: variant.id,
        title: variant.title,
        selectedOptions: variant.selectedOptions,
        price: variant.price,
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: product.featuredImage,
          teamName: product.meta.teamName,
        },
      },
    });
  }

  const money = (n: number): Money => ({
    amount: n.toFixed(2),
    currencyCode: currency,
  });

  return {
    id: "mock-cart",
    checkoutUrl: "", // empty string signals mock mode → checkout disabled
    totalQuantity,
    cost: {
      subtotalAmount: money(subtotal),
      totalAmount: money(subtotal),
      totalTaxAmount: null,
    },
    lines: cartLines,
  };
}

/* ------------------------------ Shopify cart ---------------------------- */

interface CartMutationResult {
  cart: ShopifyCart | null;
  userErrors: Array<{ field: string[] | null; message: string }>;
}

async function realAddToCart(
  store: CookieStore,
  merchandiseId: string,
  quantity: number,
): Promise<Cart> {
  const existing = store.get(CART_COOKIE)?.value;

  if (existing) {
    try {
      const data = await shopifyFetch<{ cartLinesAdd: CartMutationResult }>({
        query: addToCartMutation,
        variables: { cartId: existing, lines: [{ merchandiseId, quantity }] },
        cache: "no-store",
      });
      if (data.cartLinesAdd.cart) return reshapeCart(data.cartLinesAdd.cart);
    } catch {
      // Cart expired or missing — fall through and create a fresh one.
    }
  }

  const data = await shopifyFetch<{ cartCreate: CartMutationResult }>({
    query: createCartMutation,
    variables: { lines: [{ merchandiseId, quantity }] },
    cache: "no-store",
  });
  const cart = data.cartCreate.cart;
  if (!cart) throw new Error("Unable to create Shopify cart.");
  store.set(CART_COOKIE, cart.id, cookieOptions());
  return reshapeCart(cart);
}

async function realUpdateCart(
  store: CookieStore,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No active cart.");

  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationResult }>({
    query: updateCartMutation,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: "no-store",
  });
  if (!data.cartLinesUpdate.cart) throw new Error("Unable to update cart.");
  return reshapeCart(data.cartLinesUpdate.cart);
}

async function realRemoveFromCart(
  store: CookieStore,
  lineId: string,
): Promise<Cart> {
  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No active cart.");

  const data = await shopifyFetch<{ cartLinesRemove: CartMutationResult }>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds: [lineId] },
    cache: "no-store",
  });
  if (!data.cartLinesRemove.cart) throw new Error("Unable to remove from cart.");
  return reshapeCart(data.cartLinesRemove.cart);
}

/* -------------------------------- public -------------------------------- */

/** Read the current cart. Returns undefined when there is no cart yet. */
export async function getCart(): Promise<Cart | undefined> {
  const store = await cookies();

  if (!isShopifyConfigured) {
    return buildMockCart(readMockLines(store));
  }

  const cartId = store.get(CART_COOKIE)?.value;
  if (!cartId) return undefined;

  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
      query: getCartQuery,
      variables: { cartId },
      cache: "no-store",
    });
    return data.cart ? reshapeCart(data.cart) : undefined;
  } catch {
    return undefined;
  }
}

export async function addToCart(
  merchandiseId: string,
  quantity = 1,
): Promise<Cart> {
  const store = await cookies();
  if (!isShopifyConfigured) {
    const lines = readMockLines(store);
    const idx = lines.findIndex((l) => l.merchandiseId === merchandiseId);
    if (idx >= 0) lines[idx].quantity += quantity;
    else lines.push({ merchandiseId, quantity });
    writeMockLines(store, lines);
    return buildMockCart(lines);
  }
  return realAddToCart(store, merchandiseId, quantity);
}

export async function updateCartLine(
  lineId: string,
  quantity: number,
): Promise<Cart> {
  const store = await cookies();
  if (quantity <= 0) {
    return removeFromCartWithStore(store, lineId);
  }
  if (!isShopifyConfigured) {
    const lines = readMockLines(store);
    const idx = lines.findIndex((l) => l.merchandiseId === lineId);
    if (idx >= 0) lines[idx].quantity = quantity;
    writeMockLines(store, lines);
    return buildMockCart(lines);
  }
  return realUpdateCart(store, lineId, quantity);
}

export async function removeFromCart(lineId: string): Promise<Cart> {
  const store = await cookies();
  return removeFromCartWithStore(store, lineId);
}

async function removeFromCartWithStore(
  store: CookieStore,
  lineId: string,
): Promise<Cart> {
  if (!isShopifyConfigured) {
    const lines = readMockLines(store).filter((l) => l.merchandiseId !== lineId);
    writeMockLines(store, lines);
    return buildMockCart(lines);
  }
  return realRemoveFromCart(store, lineId);
}

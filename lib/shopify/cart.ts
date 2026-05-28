/**
 * @file Cart CRUD against Shopify with cookie-mock fallback — read / add / update / remove, syncs customisation deltas.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { cookies } from "next/headers";

import { customisationDelta, GROUP_ID_KEY } from "../customisation";
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
import type {
  Cart,
  CartLine,
  CartLineCustomisation,
  Money,
  ShopifyAttribute,
  ShopifyCart,
  ShopifyCartLine,
} from "./types";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

const CART_COOKIE = "cartId";
const MOCK_CART_COOKIE = "mockCart";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Variant GID of the "Name & Number Printing" add-on product. When set, a
 * customised jersey is added alongside a paired printing line so the upcharge
 * is collected at checkout. When unset (e.g. mock/dev), we degrade gracefully
 * to an attribute-only line that carries the name/number but no extra charge.
 */
const CUSTOMISATION_VARIANT_ID =
  process.env.SHOPIFY_CUSTOMISATION_VARIANT_ID ?? "";

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
  customisation?: CartLineCustomisation;
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

/** Two mock lines collapse to one when same variant + matching customisation. */
function sameCustomisation(
  a: CartLineCustomisation | undefined,
  b: CartLineCustomisation | undefined,
): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.name === b.name && a.number === b.number;
}

interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  attributes?: ShopifyAttribute[];
}

/** Stable id pairing a jersey line with its printing add-on line. */
function groupIdFor(
  merchandiseId: string,
  customisation: CartLineCustomisation,
): string {
  return `${merchandiseId}#${customisation.name ?? ""}|${customisation.number ?? ""}`;
}

/** Build a Shopify cart-line `attributes` payload from a customisation. */
function attributesFor(
  customisation: CartLineCustomisation,
  groupId: string,
): ShopifyAttribute[] {
  const out: ShopifyAttribute[] = [{ key: GROUP_ID_KEY, value: groupId }];
  if (customisation.name) out.push({ key: "name", value: customisation.name });
  if (customisation.number) out.push({ key: "number", value: customisation.number });
  // Resilience: keep the per-unit delta so degraded (no add-on variant) mode
  // can still surface the +price label. The real charge rides the add-on line.
  out.push({ key: "priceDelta", value: customisation.priceDelta.amount });
  return out;
}

/**
 * Expand an add-to-cart request into Shopify line inputs. A plain jersey is a
 * single line; a customised jersey becomes the jersey line plus a paired
 * "Name & Number Printing" add-on line (when the add-on variant is configured)
 * so the upcharge is a real, checkout-collected line item. Both lines carry
 * the same `_groupId` so they merge on re-add and move together on
 * update/remove.
 */
function buildLineInputs(
  merchandiseId: string,
  quantity: number,
  customisation: CartLineCustomisation | undefined,
): CartLineInput[] {
  const hasContent = Boolean(
    customisation && (customisation.name || customisation.number),
  );
  if (!customisation || !hasContent) return [{ merchandiseId, quantity }];

  const groupId = groupIdFor(merchandiseId, customisation);
  const attributes = attributesFor(customisation, groupId);
  const jerseyLine: CartLineInput = { merchandiseId, quantity, attributes };
  if (!CUSTOMISATION_VARIANT_ID) return [jerseyLine];

  const printingLine: CartLineInput = {
    merchandiseId: CUSTOMISATION_VARIANT_ID,
    quantity,
    attributes,
  };
  return [jerseyLine, printingLine];
}

/** The `_groupId` attribute of a raw Shopify cart line, if any. */
function groupIdOfLine(line: ShopifyCartLine): string | undefined {
  return line.attributes?.find((a) => a.key === GROUP_ID_KEY)?.value;
}

/**
 * Line ids that move together with `lineId`: itself plus any paired add-on
 * line sharing its `_groupId`. Reads the live cart so pairing survives page
 * reloads (the client only ever holds the folded jersey line id).
 */
async function pairedLineIds(
  cartId: string,
  lineId: string,
): Promise<string[]> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: getCartQuery,
    variables: { cartId },
    cache: "no-store",
  });
  const lines = data.cart ? data.cart.lines.edges.map((e) => e.node) : [];
  const target = lines.find((l) => l.id === lineId);
  const groupId = target ? groupIdOfLine(target) : undefined;
  if (!groupId) return [lineId];
  const ids = lines
    .filter((l) => groupIdOfLine(l) === groupId)
    .map((l) => l.id);
  return ids.length > 0 ? ids : [lineId];
}

/** Stable line key for the mock cart. Lets two custom lines of the same
 *  variant coexist as separate rows (different names → different line ids). */
function mockLineKey(line: MockLine): string {
  const c = line.customisation;
  if (!c) return line.merchandiseId;
  const fingerprint = `${c.name ?? ""}|${c.number ?? ""}`;
  return `${line.merchandiseId}#${fingerprint}`;
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
    const delta = raw.customisation
      ? Number.parseFloat(raw.customisation.priceDelta.amount)
      : 0;
    const lineTotal = (unit + delta) * raw.quantity;
    subtotal += lineTotal;
    totalQuantity += raw.quantity;
    currency = variant.price.currencyCode;
    cartLines.push({
      id: mockLineKey(raw),
      quantity: raw.quantity,
      customisation: raw.customisation,
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
  customisation: CartLineCustomisation | undefined,
): Promise<Cart> {
  const existing = store.get(CART_COOKIE)?.value;
  const lines = buildLineInputs(merchandiseId, quantity, customisation);

  if (existing) {
    try {
      const data = await shopifyFetch<{ cartLinesAdd: CartMutationResult }>({
        query: addToCartMutation,
        variables: { cartId: existing, lines },
        cache: "no-store",
      });
      if (data.cartLinesAdd.cart) return reshapeCart(data.cartLinesAdd.cart);
    } catch {
      // Cart expired or missing — fall through and create a fresh one.
    }
  }

  const data = await shopifyFetch<{ cartCreate: CartMutationResult }>({
    query: createCartMutation,
    variables: { lines },
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

  const ids = await pairedLineIds(cartId, lineId);
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationResult }>({
    query: updateCartMutation,
    variables: { cartId, lines: ids.map((id) => ({ id, quantity })) },
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

  const ids = await pairedLineIds(cartId, lineId);
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationResult }>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds: ids },
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
  customisation?: CartLineCustomisation,
): Promise<Cart> {
  const store = await cookies();
  // Default the delta currency to USD if the caller didn't set it.
  const normalised: CartLineCustomisation | undefined = customisation
    ? {
        ...customisation,
        priceDelta:
          customisation.priceDelta ?? customisationDelta("USD"),
      }
    : undefined;

  if (!isShopifyConfigured) {
    const lines = readMockLines(store);
    const incoming: MockLine = {
      merchandiseId,
      quantity,
      customisation: normalised,
    };
    // Collapse onto an existing row only when the customisation matches.
    const idx = lines.findIndex(
      (l) =>
        l.merchandiseId === merchandiseId &&
        sameCustomisation(l.customisation, normalised),
    );
    if (idx >= 0) lines[idx].quantity += quantity;
    else lines.push(incoming);
    writeMockLines(store, lines);
    return buildMockCart(lines);
  }
  return realAddToCart(store, merchandiseId, quantity, normalised);
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
    const idx = lines.findIndex((l) => mockLineKey(l) === lineId);
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
    const lines = readMockLines(store).filter((l) => mockLineKey(l) !== lineId);
    writeMockLines(store, lines);
    return buildMockCart(lines);
  }
  return realRemoveFromCart(store, lineId);
}

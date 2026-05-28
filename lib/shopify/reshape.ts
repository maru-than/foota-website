/**
 * @file Normalize Shopify GraphQL responses into internal types — products, collections, carts, jersey tag parsing.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import {
  CUSTOMISATION_HANDLE,
  customisationDelta,
  GROUP_ID_KEY,
} from "../customisation";
import type {
  Cart,
  CartLine,
  CartLineCustomisation,
  Collection,
  Connection,
  Image,
  JerseyBadge,
  JerseyMeta,
  JerseyType,
  Money,
  Product,
  ShopifyCart,
  ShopifyCartLine,
  ShopifyCollection,
  ShopifyImage,
  ShopifyProduct,
} from "./types";

function removeEdges<T>(connection: Connection<T> | undefined): T[] {
  return connection?.edges.map((edge) => edge.node) ?? [];
}

function reshapeImage(image: ShopifyImage, fallbackAlt: string): Image {
  return {
    url: image.url,
    altText: image.altText ?? fallbackAlt,
    width: image.width ?? undefined,
    height: image.height ?? undefined,
  };
}

function normalizeType(value: string | null): JerseyType {
  switch (value?.toLowerCase()) {
    case "home":
      return "Home";
    case "away":
      return "Away";
    default:
      return null;
  }
}

function normalizeBadge(value: string | null): JerseyBadge {
  switch (value?.toLowerCase()) {
    case "new":
      return "New";
    case "host":
      return "Host";
    default:
      return null;
  }
}

/**
 * Derive jersey metadata from Shopify product tags.
 * Convention: `nation:Brazil`, `confederation:CONMEBOL`, `season:2026`,
 * `type:Home`, `badge:Host`.
 */
export function parseJerseyMeta(
  tags: string[],
  opts?: { vendor?: string },
): JerseyMeta {
  const get = (prefix: string): string | null => {
    const match = tags.find((t) =>
      t.toLowerCase().startsWith(`${prefix}:`),
    );
    return match ? match.slice(prefix.length + 1).trim() : null;
  };

  const nation = get("nation");
  const confederation = get("confederation");
  const season = get("season");
  const type = normalizeType(get("type"));
  const badge = normalizeBadge(get("badge"));

  // Customs default on; products opt out with a `custom:off` tag.
  const customisable = get("custom")?.toLowerCase() !== "off";

  return {
    nation,
    confederation,
    season,
    type,
    badge,
    teamName: nation ?? opts?.vendor ?? null,
    customisable,
  };
}

export function reshapeProduct(product: ShopifyProduct): Product {
  const images = removeEdges(product.images).map((img) =>
    reshapeImage(img, product.title),
  );
  const featuredImage = product.featuredImage
    ? reshapeImage(product.featuredImage, product.title)
    : (images[0] ?? null);

  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt &&
    Number.parseFloat(compareAt.amount) >
      Number.parseFloat(product.priceRange.minVariantPrice.amount);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    availableForSale: product.availableForSale,
    tags: product.tags,
    options: product.options.map((o) => ({
      id: o.id,
      name: o.name,
      values: o.optionValues.map((v) => v.name),
    })),
    priceRange: product.priceRange,
    compareAtPrice: hasDiscount ? compareAt : null,
    featuredImage,
    images,
    variants: removeEdges(product.variants),
    meta: parseJerseyMeta(product.tags, { vendor: product.vendor }),
    seo: {
      title: product.seo?.title ?? product.title,
      description: product.seo?.description ?? product.description,
    },
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export function reshapeProducts(products: ShopifyProduct[]): Product[] {
  return products.map(reshapeProduct);
}

export function reshapeCollection(collection: ShopifyCollection): Collection {
  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    image: collection.image
      ? reshapeImage(collection.image, collection.title)
      : null,
    seo: {
      title: collection.seo?.title ?? collection.title,
      description: collection.seo?.description ?? collection.description,
    },
  };
}

function groupIdOf(line: ShopifyCartLine): string | undefined {
  return line.attributes?.find((a) => a.key === GROUP_ID_KEY)?.value;
}

function isPrintingLine(line: ShopifyCartLine): boolean {
  return line.merchandise.product.handle === CUSTOMISATION_HANDLE;
}

/**
 * Build the customisation for a jersey line. When a paired printing add-on
 * line exists, the per-unit delta is derived from that line's real cost (so
 * displayed totals match Shopify's checkout). Otherwise we fall back to the
 * line's `priceDelta` attribute (degraded mode with no add-on variant).
 */
function resolveCustomisation(
  jerseyLine: ShopifyCartLine,
  printing: ShopifyCartLine | undefined,
): CartLineCustomisation | undefined {
  const attributes = jerseyLine.attributes;
  if (!attributes || attributes.length === 0) return undefined;
  const byKey = new Map(attributes.map((a) => [a.key.toLowerCase(), a.value]));
  const name = byKey.get("name");
  const number = byKey.get("number");
  if (!name && !number) return undefined;

  const currency = jerseyLine.merchandise.price.currencyCode;
  let priceDelta: Money;
  if (printing && jerseyLine.quantity > 0) {
    const perUnit =
      Number.parseFloat(printing.cost.totalAmount.amount) / jerseyLine.quantity;
    priceDelta = {
      amount: perUnit.toFixed(2),
      currencyCode: printing.cost.totalAmount.currencyCode,
    };
  } else {
    const deltaAttr = byKey.get("pricedelta");
    priceDelta = deltaAttr
      ? { amount: deltaAttr, currencyCode: currency }
      : customisationDelta(currency);
  }

  return {
    name: name || undefined,
    number: number || undefined,
    priceDelta,
  };
}

export function reshapeCart(cart: ShopifyCart): Cart {
  const rawLines = removeEdges(cart.lines);

  // Index printing add-on lines by group id so each can be folded into its
  // parent jersey line and never shown as a standalone row.
  const printingByGroup = new Map<string, ShopifyCartLine>();
  for (const line of rawLines) {
    const groupId = groupIdOf(line);
    if (groupId && isPrintingLine(line)) printingByGroup.set(groupId, line);
  }

  const lines: CartLine[] = [];
  for (const line of rawLines) {
    if (isPrintingLine(line)) continue; // folded into its jersey line below

    const groupId = groupIdOf(line);
    const printing = groupId ? printingByGroup.get(groupId) : undefined;

    lines.push({
      id: line.id,
      quantity: line.quantity,
      cost: line.cost,
      customisation: resolveCustomisation(line, printing),
      merchandise: {
        id: line.merchandise.id,
        title: line.merchandise.title,
        selectedOptions: line.merchandise.selectedOptions,
        price: line.merchandise.price,
        product: {
          id: line.merchandise.product.id,
          handle: line.merchandise.product.handle,
          title: line.merchandise.product.title,
          featuredImage: line.merchandise.product.featuredImage
            ? reshapeImage(
                line.merchandise.product.featuredImage,
                line.merchandise.product.title,
              )
            : null,
          teamName: parseJerseyMeta(line.merchandise.product.tags ?? [])
            .teamName,
        },
      },
    });
  }

  // Shopify's cart cost already includes the printing add-on lines, so we use
  // it verbatim. Only the badge count needs recomputing — Shopify counts the
  // add-on lines, which the buyer perceives as part of the jersey.
  const totalQuantity = lines.reduce((n, l) => n + l.quantity, 0);

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity,
    cost: {
      subtotalAmount: cart.cost.subtotalAmount,
      totalAmount: cart.cost.totalAmount,
      totalTaxAmount: cart.cost.totalTaxAmount ?? null,
    },
    lines,
  };
}

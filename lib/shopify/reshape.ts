import type {
  Cart,
  CartLine,
  Collection,
  Connection,
  Image,
  JerseyBadge,
  JerseyEra,
  JerseyMeta,
  JerseyType,
  Product,
  ShopifyCart,
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
    case "third":
    case "3rd":
      return "Third";
    case "goalkeeper":
    case "gk":
    case "keeper":
      return "Goalkeeper";
    default:
      return null;
  }
}

function normalizeBadge(value: string | null): JerseyBadge {
  switch (value?.toLowerCase()) {
    case "retro":
      return "Retro";
    case "new":
      return "New";
    case "rare find":
    case "rare":
      return "Rare Find";
    default:
      return null;
  }
}

/**
 * Derive jersey metadata from Shopify product tags.
 * Convention: `club:AC Milan`, `nation:Brazil`, `season:2006/07`,
 * `type:Home`, `era:Retro`, `badge:Rare Find`.
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

  const club = get("club");
  const nation = get("nation");
  const season = get("season");
  const type = normalizeType(get("type"));
  const badge = normalizeBadge(get("badge"));

  const eraRaw = get("era")?.toLowerCase();
  const era: JerseyEra =
    eraRaw === "retro"
      ? "Retro"
      : eraRaw === "current"
        ? "Current"
        : badge === "Retro"
          ? "Retro"
          : "Current";

  return {
    club,
    nation,
    season,
    type,
    era,
    badge,
    teamName: club ?? nation ?? opts?.vendor ?? null,
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

export function reshapeCart(cart: ShopifyCart): Cart {
  const lines: CartLine[] = removeEdges(cart.lines).map((line) => ({
    id: line.id,
    quantity: line.quantity,
    cost: line.cost,
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
        teamName: parseJerseyMeta(line.merchandise.product.tags ?? []).teamName,
      },
    },
  }));

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: {
      subtotalAmount: cart.cost.subtotalAmount,
      totalAmount: cart.cost.totalAmount,
      totalTaxAmount: cart.cost.totalTaxAmount ?? null,
    },
    lines,
  };
}

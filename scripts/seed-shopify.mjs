#!/usr/bin/env node
/**
 * @file One-shot seeder: deletes any existing 2026 home/away products, recreates the full 48-nation catalogue in Shopify with the correct handles + prefix-tags, uploads transparent kit images, and creates the confederation collections.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SHOP = process.env.SHOPIFY_STORE_DOMAIN ?? "x1p1vy-z2.myshopify.com";
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
if (!TOKEN) {
  console.error("SHOPIFY_ADMIN_ACCESS_TOKEN env var required");
  process.exit(1);
}
const API = "2025-01";
const ENDPOINT = `https://${SHOP}/admin/api/${API}/graphql.json`;

const SIZES = ["S", "M", "L", "XL", "XXL"];

const REGION = {
  UEFA: "Europe",
  CONMEBOL: "South America",
  CONCACAF: "North & Central America",
  CAF: "Africa",
  AFC: "Asia",
  OFC: "Oceania",
};

// Mirror of lib/mock-data.ts SPECS — the storefront's source of truth.
const SPECS = [
  // UEFA
  { slug: "england", nation: "England", conf: "UEFA", price: 119, isNew: true },
  { slug: "france", nation: "France", conf: "UEFA", price: 119, isNew: true },
  { slug: "spain", nation: "Spain", conf: "UEFA", price: 119, isNew: true },
  { slug: "portugal", nation: "Portugal", conf: "UEFA", price: 119, isNew: true },
  { slug: "germany", nation: "Germany", conf: "UEFA", price: 119 },
  { slug: "netherlands", nation: "Netherlands", conf: "UEFA", price: 109 },
  { slug: "belgium", nation: "Belgium", conf: "UEFA", price: 109 },
  { slug: "croatia", nation: "Croatia", conf: "UEFA", price: 109 },
  { slug: "switzerland", nation: "Switzerland", conf: "UEFA", price: 99, salePrice: 79 },
  { slug: "austria", nation: "Austria", conf: "UEFA", price: 99 },
  { slug: "scotland", nation: "Scotland", conf: "UEFA", price: 99 },
  { slug: "norway", nation: "Norway", conf: "UEFA", price: 99, isNew: true },
  // CONMEBOL
  { slug: "argentina", nation: "Argentina", conf: "CONMEBOL", price: 119, isNew: true },
  { slug: "brazil", nation: "Brazil", conf: "CONMEBOL", price: 119, isNew: true },
  { slug: "uruguay", nation: "Uruguay", conf: "CONMEBOL", price: 109 },
  { slug: "colombia", nation: "Colombia", conf: "CONMEBOL", price: 109, isNew: true },
  { slug: "ecuador", nation: "Ecuador", conf: "CONMEBOL", price: 99 },
  { slug: "paraguay", nation: "Paraguay", conf: "CONMEBOL", price: 89 },
  { slug: "venezuela", nation: "Venezuela", conf: "CONMEBOL", price: 89 },
  { slug: "bolivia", nation: "Bolivia", conf: "CONMEBOL", price: 89 },
  // CONCACAF
  { slug: "usa", nation: "USA", conf: "CONCACAF", price: 119, host: true },
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
  { slug: "morocco", nation: "Morocco", conf: "CAF", price: 109, isNew: true },
  { slug: "senegal", nation: "Senegal", conf: "CAF", price: 109 },
  { slug: "ivory-coast", nation: "Ivory Coast", conf: "CAF", price: 99 },
  { slug: "egypt", nation: "Egypt", conf: "CAF", price: 99 },
  { slug: "algeria", nation: "Algeria", conf: "CAF", price: 99 },
  { slug: "ghana", nation: "Ghana", conf: "CAF", price: 99 },
  { slug: "cape-verde", nation: "Cape Verde", conf: "CAF", price: 89, salePrice: 69, isNew: true },
  { slug: "south-africa", nation: "South Africa", conf: "CAF", price: 89 },
  // AFC
  { slug: "japan", nation: "Japan", conf: "AFC", price: 109, isNew: true },
  { slug: "south-korea", nation: "South Korea", conf: "AFC", price: 109 },
  { slug: "australia", nation: "Australia", conf: "AFC", price: 99 },
  { slug: "saudi-arabia", nation: "Saudi Arabia", conf: "AFC", price: 99 },
  { slug: "iran", nation: "Iran", conf: "AFC", price: 99, salePrice: 79 },
  { slug: "qatar", nation: "Qatar", conf: "AFC", price: 99 },
  { slug: "iraq", nation: "Iraq", conf: "AFC", price: 89 },
  { slug: "jordan", nation: "Jordan", conf: "AFC", price: 89, isNew: true },
  { slug: "united-arab-emirates", nation: "United Arab Emirates", conf: "AFC", price: 89 },
  // OFC
  { slug: "new-zealand", nation: "New Zealand", conf: "OFC", price: 99, isNew: true },
];

const NO_AWAY = new Set([
  "bolivia",
  "costa-rica",
  "el-salvador",
  "honduras",
  "jamaica",
  "united-arab-emirates",
  "venezuela",
]);

async function gql(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

function describe(spec, kit) {
  const shirt = kit === "Home" ? "home shirt" : "away shirt";
  if (spec.host) {
    return `${spec.nation}'s ${shirt} for the World Cup 2026 — a co-host nation, playing the first 48-team finals on home soil across the USA, Canada and Mexico.`;
  }
  return `${spec.nation}'s ${shirt} for the World Cup 2026 — ${REGION[spec.conf]}'s representative at the first 48-nation finals across the USA, Canada and Mexico.`;
}

function makeTags(spec, kit) {
  const badge = spec.host ? "Host" : spec.isNew ? "New" : null;
  const tags = [
    `nation:${spec.nation}`,
    `confederation:${spec.conf}`,
    "season:2026",
    `type:${kit}`,
  ];
  if (badge) tags.push(`badge:${badge}`);
  return tags;
}

async function listExistingProducts() {
  const all = [];
  let cursor = null;
  while (true) {
    const data = await gql(
      `query($cursor: String) {
        products(first: 100, after: $cursor) {
          edges { cursor node { id handle title } }
          pageInfo { hasNextPage }
        }
      }`,
      { cursor },
    );
    for (const e of data.products.edges) all.push(e.node);
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.edges.at(-1).cursor;
  }
  return all;
}

async function deleteProduct(id) {
  await gql(
    `mutation($id: ID!) {
      productDelete(input: { id: $id }) { deletedProductId userErrors { field message } }
    }`,
    { id },
  );
}

async function getPublicationIds() {
  const data = await gql(`{ publications(first: 20) { edges { node { id name } } } }`);
  const map = {};
  for (const e of data.publications.edges) map[e.node.name] = e.node.id;
  return map;
}

async function createProduct(spec, kit, publicationIds) {
  const kitSlug = kit.toLowerCase();
  const handle = `${spec.slug}-${kitSlug}`;
  const title = `${spec.nation} 2026 ${kit} Jersey`;
  const onSale = typeof spec.salePrice === "number" && spec.salePrice < spec.price;
  const sellingPrice = onSale ? spec.salePrice : spec.price;
  const compareAt = onSale ? spec.price : null;
  const lead = describe(spec, kit);
  const tags = makeTags(spec, kit);

  const input = {
    handle,
    title,
    descriptionHtml: `<p>${lead}</p><p>2026 ${kitSlug} jersey · sizes S–XXL. Inspected before it ships, dispatched worldwide in 48h.</p>`,
    tags,
    status: "ACTIVE",
    productType: "Jersey",
    vendor: spec.nation,
    productOptions: [
      { name: "Size", values: SIZES.map((v) => ({ name: v })) },
    ],
    variants: SIZES.map((size) => ({
      optionValues: [{ name: size, optionName: "Size" }],
      price: sellingPrice.toFixed(2),
      ...(compareAt ? { compareAtPrice: compareAt.toFixed(2) } : {}),
      inventoryItem: { tracked: false },
      inventoryPolicy: "CONTINUE",
    })),
  };

  const create = await gql(
    `mutation productSet($input: ProductSetInput!) {
      productSet(input: $input, synchronous: true) {
        product { id handle }
        userErrors { field message }
      }
    }`,
    { input },
  );
  if (create.productSet.userErrors?.length) {
    throw new Error(
      `productSet(${handle}): ${JSON.stringify(create.productSet.userErrors)}`,
    );
  }
  const product = create.productSet.product;

  // Publish to every sales channel we have. (write_publications scope.)
  const pubInputs = Object.values(publicationIds).map((pid) => ({
    publicationId: pid,
  }));
  const pub = await gql(
    `mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        userErrors { field message }
      }
    }`,
    { id: product.id, input: pubInputs },
  );
  if (pub.publishablePublish.userErrors?.length) {
    // Non-fatal — some publications (e.g. POS) won't accept all products.
    console.warn(
      `publish(${handle}) warnings: ${JSON.stringify(pub.publishablePublish.userErrors)}`,
    );
  }

  return product;
}

async function uploadImage(productId, productHandle, kit, slug) {
  const kitSlug = kit.toLowerCase();
  const rel = `public/jerseys/${kitSlug}-transparent/${slug}.webp`;
  const abs = join(ROOT, rel);

  let info;
  try {
    info = await stat(abs);
  } catch {
    console.warn(`  no image for ${productHandle} at ${rel}`);
    return;
  }

  // 1. Get a staged upload target.
  const filename = `${slug}-${kitSlug}.webp`;
  const staged = await gql(
    `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets { url resourceUrl parameters { name value } }
        userErrors { field message }
      }
    }`,
    {
      input: [
        {
          resource: "IMAGE",
          filename,
          mimeType: "image/webp",
          httpMethod: "POST",
          fileSize: String(info.size),
        },
      ],
    },
  );
  if (staged.stagedUploadsCreate.userErrors?.length) {
    throw new Error(`stagedUploads(${rel}): ${JSON.stringify(staged.stagedUploadsCreate.userErrors)}`);
  }
  const target = staged.stagedUploadsCreate.stagedTargets[0];

  // 2. POST the bytes to GCS via the staged URL.
  const form = new FormData();
  for (const { name, value } of target.parameters) form.append(name, value);
  const buf = await readFile(abs);
  form.append("file", new Blob([buf], { type: "image/webp" }), filename);
  const upRes = await fetch(target.url, { method: "POST", body: form });
  if (!upRes.ok) {
    throw new Error(`staged POST failed (${upRes.status}): ${await upRes.text()}`);
  }

  // 3. Attach to the product as media.
  const attach = await gql(
    `mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        mediaUserErrors { field message }
      }
    }`,
    {
      productId,
      media: [
        {
          alt: `${productHandle.split("-")[0]} 2026 ${kitSlug} jersey`,
          mediaContentType: "IMAGE",
          originalSource: target.resourceUrl,
        },
      ],
    },
  );
  if (attach.productCreateMedia.mediaUserErrors?.length) {
    throw new Error(`productCreateMedia(${rel}): ${JSON.stringify(attach.productCreateMedia.mediaUserErrors)}`);
  }
}

async function ensureSmartCollection(handle, title, tagValue) {
  // Find existing
  const existing = await gql(
    `query($q: String!) {
      collections(first: 5, query: $q) { edges { node { id handle ruleSet { rules { column condition relation } } } } }
    }`,
    { q: `handle:${handle}` },
  );
  const found = existing.collections.edges.find((e) => e.node.handle === handle);
  const ruleSet = {
    appliedDisjunctively: false,
    rules: [{ column: "TAG", condition: tagValue, relation: "EQUALS" }],
  };
  if (found) {
    const r = await gql(
      `mutation collectionUpdate($input: CollectionInput!) {
        collectionUpdate(input: $input) {
          collection { id handle }
          userErrors { field message }
        }
      }`,
      { input: { id: found.node.id, ruleSet } },
    );
    if (r.collectionUpdate.userErrors?.length) {
      throw new Error(`collectionUpdate(${handle}): ${JSON.stringify(r.collectionUpdate.userErrors)}`);
    }
    return { updated: true, id: found.node.id };
  }
  const r = await gql(
    `mutation collectionCreate($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id handle }
        userErrors { field message }
      }
    }`,
    { input: { handle, title, ruleSet } },
  );
  if (r.collectionCreate.userErrors?.length) {
    throw new Error(`collectionCreate(${handle}): ${JSON.stringify(r.collectionCreate.userErrors)}`);
  }
  return { created: true, id: r.collectionCreate.collection.id };
}

async function publishCollections(ids, publicationIds) {
  const pubInputs = Object.values(publicationIds).map((pid) => ({ publicationId: pid }));
  for (const id of ids) {
    const r = await gql(
      `mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          userErrors { field message }
        }
      }`,
      { id, input: pubInputs },
    );
    if (r.publishablePublish.userErrors?.length) {
      console.warn(`collection publish: ${JSON.stringify(r.publishablePublish.userErrors)}`);
    }
  }
}

async function main() {
  console.log(`Connecting to ${SHOP}`);
  const pubs = await getPublicationIds();
  console.log("Publications:", Object.keys(pubs));

  // 1. Smart collections — must exist BEFORE products so the membership populates as products land.
  console.log("\n=== Collections ===");
  const collectionIds = [];
  const confs = [
    ["uefa", "UEFA — Europe", "confederation:UEFA"],
    ["conmebol", "CONMEBOL — South America", "confederation:CONMEBOL"],
    ["concacaf", "CONCACAF — N. & C. America", "confederation:CONCACAF"],
    ["caf", "CAF — Africa", "confederation:CAF"],
    ["afc", "AFC — Asia", "confederation:AFC"],
    ["ofc", "OFC — Oceania", "confederation:OFC"],
    ["hosts", "Hosts", "badge:Host"],
    ["new-arrivals", "New Arrivals", "badge:New"],
  ];
  for (const [handle, title, tag] of confs) {
    const r = await ensureSmartCollection(handle, title, tag);
    collectionIds.push(r.id);
    console.log(`  ${r.created ? "created " : "updated "} ${handle}`);
  }
  await publishCollections(collectionIds, pubs);

  // 2. Drop ONLY products with the old `-2026-…-jersey` handle pattern; leave
  //    anything matching the new `<slug>-home|away` scheme alone (idempotent
  //    so we can re-run after a crash).
  console.log("\n=== Cleanup old-scheme products ===");
  const existing = await listExistingProducts();
  const existingByHandle = new Map(existing.map((p) => [p.handle, p]));
  for (const p of existing) {
    if (/-2026-(home|away)-jersey$/.test(p.handle)) {
      console.log(`  delete ${p.handle}`);
      await deleteProduct(p.id);
      existingByHandle.delete(p.handle);
    }
  }

  // 3. Create only the products that don't already exist (resumable after a
  //    partial run).
  console.log("\n=== Create products ===");
  const all = [];
  for (const spec of SPECS) {
    for (const kit of ["Home", "Away"]) {
      if (kit === "Away" && NO_AWAY.has(spec.slug)) continue;
      const handle = `${spec.slug}-${kit.toLowerCase()}`;
      const existing = existingByHandle.get(handle);
      if (existing) {
        all.push({ product: { id: existing.id, handle }, spec, kit });
        console.log(`  skip   ${handle} (exists)`);
        continue;
      }
      const p = await createProduct(spec, kit, pubs);
      all.push({ product: p, spec, kit });
      console.log(`  create ${p.handle}`);
    }
  }

  // 4. Upload images — skip products that already have media.
  console.log("\n=== Upload images ===");
  for (const { product, spec, kit } of all) {
    try {
      const m = await gql(
        `query($id: ID!) { product(id: $id) { media(first: 1) { edges { node { id } } } } }`,
        { id: product.id },
      );
      if (m.product.media.edges.length > 0) {
        console.log(`  skip ${product.handle} (image exists)`);
        continue;
      }
      await uploadImage(product.id, product.handle, kit, spec.slug);
      console.log(`  attached image to ${product.handle}`);
    } catch (e) {
      console.error(`  FAILED ${product.handle}: ${e.message}`);
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

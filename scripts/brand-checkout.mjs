#!/usr/bin/env node
/**
 * @file Pushes the storefront brand (colours, corner radius, Geist/EB Garamond fonts) to Shopify's hosted checkout via the Checkout Branding API. Requires Shopify Plus or a development store — the API is access-denied on Basic, so on this store branding must be set by hand in admin → Settings → Checkout → Customize.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-29
 */

const SHOP = process.env.SHOPIFY_STORE_DOMAIN ?? "x1p1vy-z2.myshopify.com";
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
if (!TOKEN) {
  console.error("SHOPIFY_ADMIN_ACCESS_TOKEN env var required");
  process.exit(1);
}
const API = "2025-01";
const ENDPOINT = `https://${SHOP}/admin/api/${API}/graphql.json`;

// Brand tokens, derived from app/globals.css (OKLCH converted to sRGB hex) and
// the fonts in app/layout.tsx. Keep in sync with those files if the brand moves.
const BRAND = {
  green: "#9AE600", // --primary  (bright signature green)
  greenText: "#35530E", // --primary-foreground (readable text ON the green)
  ink: "#090B0C", // --foreground (body text)
  canvas: "#FFFFFF", // --background
  // Checkout maps `secondary` → headings, `primary` → body/most components.
  bodyFont: "Geist", // --font-sans   (newer Google font; if the picker rejects
  //                                     it, swap to an available grotesque)
  headingFont: "EB Garamond", // --font-display (editorial serif, weights 400/500)
};

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

// Resolve the live profile dynamically so this is portable across the dev/Plus
// store it will actually run on (profile GIDs differ per store).
async function resolvePublishedProfileId() {
  const data = await gql(
    `query { checkoutProfiles(first: 20) { edges { node { id isPublished } } } }`,
  );
  const nodes = data.checkoutProfiles.edges.map((e) => e.node);
  const profile = nodes.find((n) => n.isPublished) ?? nodes[0];
  if (!profile) throw new Error("No checkout profile found on this store");
  return profile.id;
}

const MUTATION = `mutation BrandCheckout($profileId: ID!, $branding: CheckoutBrandingInput!) {
  checkoutBrandingUpsert(checkoutProfileId: $profileId, checkoutBrandingInput: $branding) {
    checkoutBranding {
      designSystem {
        colors {
          global { brand accent }
          schemes { scheme1 { base { background text } primaryButton { background text border } } }
        }
        cornerRadius { small base large }
        typography { primary { name loadingStrategy } secondary { name loadingStrategy } }
      }
    }
    userErrors { field message }
  }
}`;

function buildBranding() {
  return {
    designSystem: {
      colors: {
        // accent (links/selected) uses the dark green — the bright green is
        // unreadable as text/icon on a white canvas.
        global: { brand: BRAND.green, accent: BRAND.greenText },
        schemes: {
          scheme1: {
            base: { background: BRAND.canvas, text: BRAND.ink },
            primaryButton: {
              background: BRAND.green,
              text: BRAND.greenText,
              border: BRAND.green,
            },
          },
        },
      },
      cornerRadius: { small: 2, base: 4, large: 8 }, // px — matches the tight 0.25rem site radius
      typography: {
        primary: {
          shopifyFontGroup: {
            name: BRAND.bodyFont,
            baseWeight: 400,
            boldWeight: 600,
            loadingStrategy: "SWAP",
          },
        },
        secondary: {
          shopifyFontGroup: {
            name: BRAND.headingFont,
            baseWeight: 400,
            boldWeight: 500,
            loadingStrategy: "SWAP",
          },
        },
      },
    },
  };
}

async function main() {
  console.log(`Connecting to ${SHOP}`);
  const profileId = await resolvePublishedProfileId();
  console.log(`Published checkout profile: ${profileId}`);

  const data = await gql(MUTATION, { profileId, branding: buildBranding() });
  const result = data.checkoutBrandingUpsert;

  if (result.userErrors?.length) {
    console.error("Branding rejected:", JSON.stringify(result.userErrors, null, 2));
    process.exit(1);
  }

  console.log("Checkout branding applied:");
  console.dir(result.checkoutBranding, { depth: null });
}

main().catch((err) => {
  const msg = String(err?.message ?? err);
  if (msg.includes("Plus plan") || msg.includes("Access denied")) {
    console.error(
      "\nThe Checkout Branding API is gated to Shopify Plus or a development store.",
    );
    console.error(
      "This store isn't eligible, so set the brand by hand in admin → Settings →",
    );
    console.error("Checkout → Customize. Re-run this script once on Plus or a dev store.\n");
  }
  console.error(msg);
  process.exit(1);
});

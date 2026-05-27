/**
 * @file Dynamic OG image for PDPs — jersey image, name, price and kit type composited via sharp.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import path from "node:path";

import { ImageResponse } from "next/og";
import sharp from "sharp";

import {
  OG_COLORS,
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgChip,
  OgFrame,
  OgTitle,
  logoDataUrl,
  ogImageOptions,
} from "@/lib/og";
import { getProduct } from "@/lib/shopify/products";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const alt = "Worldkit Soccer product";

/** Jerseys ship as `.webp` in `public/`; satori only decodes PNG/JPEG.
 *  Read from disk + convert with sharp, then inline as a data URL. Cached
 *  per-handle in module scope so a popular product warms after one render. */
const _jerseyPng = new Map<string, string>();

async function jerseyDataUrl(publicPath: string): Promise<string | null> {
  if (_jerseyPng.has(publicPath)) return _jerseyPng.get(publicPath)!;
  try {
    const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    // `fit: contain` defaults to OPAQUE BLACK padding; the jerseys are taller
    // than wide, so without an alpha=0 background we get black side bars.
    const png = await sharp(file)
      .resize(560, 560, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    const url = `data:image/png;base64,${png.toString("base64")}`;
    _jerseyPng.set(publicPath, url);
    return url;
  } catch {
    return null;
  }
}

function formatPrice(amount: string, code: string): string {
  const n = Number(amount);
  if (Number.isNaN(n)) return `${amount} ${code}`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function Image({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const [product, logo] = await Promise.all([getProduct(handle), logoDataUrl()]);

  if (!product) {
    return new ImageResponse(
      (
        <OgFrame logo={logo}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <OgTitle>Worldkit Soccer.</OgTitle>
          </div>
        </OgFrame>
      ),
      ogImageOptions(),
    );
  }

  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode,
  );
  const eyebrow = [product.meta.type, product.meta.season]
    .filter(Boolean)
    .join(" · ");
  const teamName = product.meta.teamName ?? product.title;
  const jersey = product.featuredImage?.url
    ? await jerseyDataUrl(product.featuredImage.url)
    : null;

  return new ImageResponse(
    (
      <OgFrame eyebrow={eyebrow} logo={logo}>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* Jersey sits on the frame bg directly — no panel chrome. */}
          {jersey ? (
            <img
              src={jersey}
              alt=""
              width={420}
              height={420}
              style={{ objectFit: "contain" }}
            />
          ) : null}

          {/* Title + price. Subtitle dropped — eyebrow already names the
              kit type and season. */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            {product.meta.badge ? (
              <div style={{ display: "flex" }}>
                <OgChip variant="solid">{product.meta.badge}</OgChip>
              </div>
            ) : null}
            <OgTitle size={92}>{teamName}</OgTitle>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 700,
                color: OG_COLORS.accent,
                letterSpacing: -1,
              }}
            >
              {price}
            </div>
          </div>
        </div>
      </OgFrame>
    ),
    ogImageOptions(),
  );
}

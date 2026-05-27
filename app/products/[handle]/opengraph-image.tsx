/**
 * @file Dynamic OG image for PDPs — jersey on a lime block, EB Garamond name + price.
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

async function jerseyDataUrl(source: string): Promise<string | null> {
  if (_jerseyPng.has(source)) return _jerseyPng.get(source)!;
  try {
    // Sharp accepts either a filesystem path or a Buffer. Local paths are
    // /-prefixed (mock-data); Shopify URLs come back fully-qualified — pull
    // the bytes over the wire in that case.
    let input: Buffer | string;
    if (/^https?:\/\//i.test(source)) {
      const r = await fetch(source);
      if (!r.ok) return null;
      input = Buffer.from(await r.arrayBuffer());
    } else {
      input = path.join(process.cwd(), "public", source.replace(/^\//, ""));
    }
    // `fit: contain` defaults to OPAQUE BLACK padding; the jerseys are taller
    // than wide, so without an alpha=0 background we get black side bars.
    const png = await sharp(input)
      .resize(520, 560, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    const url = `data:image/png;base64,${png.toString("base64")}`;
    _jerseyPng.set(source, url);
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
          {/* Title + price on the left — title in EB Garamond, price beneath. */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {product.meta.badge ? (
              <div style={{ display: "flex" }}>
                <OgChip variant="solid">{product.meta.badge}</OgChip>
              </div>
            ) : null}
            <OgTitle size={96}>{teamName}</OgTitle>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                letterSpacing: -1,
                fontFamily: "EB Garamond, serif",
                color: OG_COLORS.fg,
              }}
            >
              {price}
            </div>
          </div>

          {/* Jersey on layered lime block — the hero composition, reused. */}
          {jersey ? (
            <div
              style={{
                position: "relative",
                width: 380,
                height: 460,
                display: "flex",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 60,
                  width: 320,
                  height: 320,
                  backgroundColor: OG_COLORS.limeBlock,
                  display: "flex",
                }}
              />
              <img
                src={jersey}
                alt=""
                width={340}
                height={440}
                style={{
                  position: "absolute",
                  left: 20,
                  top: 10,
                  objectFit: "contain",
                }}
              />
            </div>
          ) : null}
        </div>
      </OgFrame>
    ),
    ogImageOptions(),
  );
}

/**
 * @file Dynamic OG image for /collections/[handle] — light editorial card with collection title.
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
  OgFrame,
  OgMeta,
  OgTitle,
  logoDataUrl,
  ogImageOptions,
} from "@/lib/og";
import { getCollection } from "@/lib/shopify/collections";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const alt = "Worldkit Soccer collection";

/** Reads a `public/`-relative image off disk and inlines it as a PNG data URL.
 *  Satori can't reliably decode webp/external URLs; this keeps OG rendering
 *  self-contained. Module-scope cache amortises sharp work across requests. */
const _bg = new Map<string, string>();

async function bgDataUrl(source: string): Promise<string | null> {
  if (_bg.has(source)) return _bg.get(source)!;
  try {
    let input: Buffer | string;
    if (/^https?:\/\//i.test(source)) {
      const r = await fetch(source);
      if (!r.ok) return null;
      input = Buffer.from(await r.arrayBuffer());
    } else {
      input = path.join(process.cwd(), "public", source.replace(/^\//, ""));
    }
    const png = await sharp(input)
      .resize(560, 560, {
        fit: "cover",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    const url = `data:image/png;base64,${png.toString("base64")}`;
    _bg.set(source, url);
    return url;
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const [collection, logo] = await Promise.all([
    getCollection(handle),
    logoDataUrl(),
  ]);

  if (!collection) {
    return new ImageResponse(
      (
        <OgFrame logo={logo}>
          <OgTitle>Worldkit Soccer.</OgTitle>
        </OgFrame>
      ),
      ogImageOptions(),
    );
  }

  const bg = collection.image?.url
    ? await bgDataUrl(collection.image.url)
    : null;

  return new ImageResponse(
    (
      <OgFrame eyebrow="Collection" logo={logo}>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* LEFT — title + supporting line. */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <OgTitle size={112}>
              {collection.title}
              <span style={{ color: OG_COLORS.lime }}>.</span>
            </OgTitle>
            <OgMeta size={26}>2026 World Cup · Dispatched worldwide.</OgMeta>
          </div>

          {/* RIGHT — collection lead image on a lime block, mirroring the
              hero composition on PDPs and the home card. */}
          {bg ? (
            <div
              style={{
                position: "relative",
                width: 380,
                height: 380,
                display: "flex",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 30,
                  width: 320,
                  height: 320,
                  backgroundColor: OG_COLORS.limeBlock,
                  display: "flex",
                }}
              />
              <img
                src={bg}
                alt=""
                width={320}
                height={320}
                style={{
                  position: "absolute",
                  left: 30,
                  top: 0,
                  objectFit: "cover",
                  border: `1px solid ${OG_COLORS.border}`,
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

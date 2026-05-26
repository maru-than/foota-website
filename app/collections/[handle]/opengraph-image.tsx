/**
 * @file Dynamic OG image for /collections/[handle] — renders the collection name and lead image with the logo.
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

async function bgDataUrl(publicPath: string): Promise<string | null> {
  if (_bg.has(publicPath)) return _bg.get(publicPath)!;
  try {
    const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const png = await sharp(file).resize(1200, 630, { fit: "cover" }).png().toBuffer();
    const url = `data:image/png;base64,${png.toString("base64")}`;
    _bg.set(publicPath, url);
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
            position: "relative",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          {bg ? (
            <>
              <img
                src={bg}
                alt=""
                width={1200}
                height={500}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.35,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(17,17,17,0.95) 30%, rgba(17,17,17,0.45) 100%)",
                  display: "flex",
                }}
              />
            </>
          ) : null}

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              maxWidth: 980,
            }}
          >
            <OgTitle size={140}>
              {collection.title}
              <span style={{ color: OG_COLORS.accent }}>.</span>
            </OgTitle>
          </div>
        </div>
      </OgFrame>
    ),
    ogImageOptions(),
  );
}

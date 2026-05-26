// Shared primitives for the per-route `opengraph-image.tsx` files.
//
// Centralises:
//   - canonical 1200x630 dimensions
//   - Gambarino (OTF) loader — the live site's display face, used here for
//     headlines and the brand wordmark so social cards read as editorial,
//     not template
//   - <OgFrame> visual envelope (black bg, accent rail, wordmark)
//
// All consumers stay on the default Node.js runtime — `fs.readFileSync`
// is the standard pattern for self-hosted fonts in `ImageResponse`.

import fs from "node:fs";
import path from "node:path";

import { ImageResponse } from "next/og";
import sharp from "sharp";

type OgImageOptions = ConstructorParameters<typeof ImageResponse>[1];

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const COLORS = {
  bg: "#111111",
  bg2: "#1A1A1A",
  fg: "#FFFFFF",
  fgMuted: "rgba(255,255,255,0.72)",
  fgDim: "rgba(255,255,255,0.55)",
  accent: "#C1FF56",
  accentDim: "rgba(193,255,86,0.18)",
} as const;

let _gambarino: Buffer | null = null;
let _geist: Buffer | null = null;
let _logo: string | null = null;

const LOGO_SIZE = 120;

/** Inline `public/logo.png` as a base64 data URL, downsampled once.
 *  Sharp is already a dep (used for jersey conversion). */
export async function logoDataUrl(): Promise<string> {
  if (_logo) return _logo;
  const png = await sharp(path.join(process.cwd(), "public", "logo.png"))
    .resize(LOGO_SIZE * 2, LOGO_SIZE * 2, { fit: "contain" })
    .png()
    .toBuffer();
  _logo = `data:image/png;base64,${png.toString("base64")}`;
  return _logo;
}

function loadGambarino(): Buffer {
  if (_gambarino) return _gambarino;
  _gambarino = fs.readFileSync(
    path.join(process.cwd(), "app", "fonts", "Gambarino-Regular.otf"),
  );
  return _gambarino;
}

function loadGeist(): Buffer {
  if (_geist) return _geist;
  // Bundled with `@vercel/og` — always resolvable in any Next.js install.
  _geist = fs.readFileSync(
    path.join(
      process.cwd(),
      "node_modules",
      "next",
      "dist",
      "compiled",
      "@vercel",
      "og",
      "Geist-Regular.ttf",
    ),
  );
  return _geist;
}

/** Pass to `new ImageResponse(jsx, ogImageOptions())`. */
export function ogImageOptions(): OgImageOptions {
  return {
    ...OG_SIZE,
    fonts: [
      {
        name: "Gambarino",
        data: loadGambarino(),
        style: "normal",
        weight: 400,
      },
      {
        name: "Geist",
        data: loadGeist(),
        style: "normal",
        weight: 400,
      },
    ],
  };
}

const FRAME_PAD = 72;

/** Brand envelope used by every per-route OG image.
 *  Pass `logo` (from `await logoDataUrl()`) to render the brand mark in the
 *  bottom corner — caller awaits the data URL outside the JSX. */
export function OgFrame({
  eyebrow,
  logo,
  children,
}: {
  /** Optional small label above the main content. Sentence case, no tracking. */
  eyebrow?: string;
  /** Base64 data URL from `logoDataUrl()`. */
  logo?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.bg,
        color: COLORS.fg,
        padding: FRAME_PAD,
        position: "relative",
        fontFamily: "Geist, sans-serif",
      }}
    >
      {/* Single accent rule along the top — quieter than the original
          right-corner block, doesn't compete with the headline. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: COLORS.accent,
        }}
      />

      {eyebrow ? (
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: COLORS.fgMuted,
          }}
        >
          {eyebrow}
        </div>
      ) : (
        <div style={{ display: "flex", height: 22 }} />
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          marginTop: 32,
          marginBottom: 32,
        }}
      >
        {children}
      </div>

      {/* Brand mark — logo when supplied, falls back to the Gambarino
          wordmark so the helper still works without an awaited data URL. */}
      {logo ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* next/og only supports raw <img>, not next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt=""
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            style={{ objectFit: "contain" }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            fontFamily: "Gambarino, serif",
            color: COLORS.fg,
            letterSpacing: -0.5,
          }}
        >
          Worldkit Soccer
          <span style={{ color: COLORS.accent }}>.</span>
        </div>
      )}
    </div>
  );
}

/** Display title in Gambarino — matches `.display` on the live site. */
export function OgTitle({
  children,
  size = 96,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: -2,
        fontFamily: "Gambarino, serif",
        color: COLORS.fg,
      }}
    >
      {children}
    </div>
  );
}

/** Body / supporting copy in Geist. */
export function OgMeta({
  children,
  color = COLORS.fgMuted,
  size = 28,
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <div style={{ display: "flex", fontSize: size, color }}>{children}</div>
  );
}

/** Subtle chip — sentence case, hairline border, no tracking. */
export function OgChip({
  children,
  variant = "outline",
}: {
  children: React.ReactNode;
  variant?: "outline" | "solid";
}) {
  const solid = variant === "solid";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 20,
        color: solid ? COLORS.bg : COLORS.accent,
        backgroundColor: solid ? COLORS.accent : "transparent",
        border: solid ? "none" : `1px solid ${COLORS.accent}`,
      }}
    >
      {children}
    </div>
  );
}

export const OG_COLORS = COLORS;

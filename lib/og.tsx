/**
 * @file Shared primitives for the per-route `opengraph-image.tsx` files — light palette + EB Garamond, matches the live site.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

// Centralises:
//   - canonical 1200x630 dimensions
//   - EB Garamond loader (the live site's display face)
//   - <OgFrame> visual envelope: white bg, lime block accent, footer wordmark
//
// All consumers stay on the default Node.js runtime — `fs.readFileSync` is
// the standard pattern for self-hosted fonts in `ImageResponse`.

import fs from "node:fs";
import path from "node:path";

import { ImageResponse } from "next/og";
import sharp from "sharp";

type OgImageOptions = ConstructorParameters<typeof ImageResponse>[1];

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/* Light palette mirrors the site's `:root` tokens. Hex equivalents of the
 * OKLCH values in globals.css; OG's Satori renderer doesn't understand
 * OKLCH so the colours are pinned here. */
const COLORS = {
  bg: "#FFFFFF",
  fg: "#0B1216", // ≈ oklch(0.148 0.004 228.8) — near-black with a hint of blue
  fgMuted: "rgba(11,18,22,0.55)",
  fgDim: "rgba(11,18,22,0.35)",
  border: "rgba(11,18,22,0.10)",
  limeBlock: "#D9F99D", // lime-200 — the hero's lime fill block
  lime: "#A3E635", // lime-400 — accent / grid lines / chip fill
  limeText: "#3F6212", // lime-800 — readable lime on white when used as type
} as const;

let _ebGaramond: Buffer | null = null;
let _geist: Buffer | null = null;
let _logo: string | null = null;

const LOGO_SIZE = 96;

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

function loadEbGaramond(): Buffer {
  if (_ebGaramond) return _ebGaramond;
  // Static (non-variable) instance — satori chokes on variable-font axis tables
  // with a `Cannot read properties of undefined (reading '256')`.
  _ebGaramond = fs.readFileSync(
    path.join(process.cwd(), "app", "fonts", "EBGaramond-Regular.ttf"),
  );
  return _ebGaramond;
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
        name: "EB Garamond",
        data: loadEbGaramond(),
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
      {/* Top-left corner: lime-200 block — the same accent that sits behind
          the hero jersey on the live site. Just visible enough to anchor the
          frame, doesn't crowd the title. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 220,
          height: 220,
          backgroundColor: COLORS.limeBlock,
        }}
      />

      {eyebrow ? (
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: COLORS.fgMuted,
            zIndex: 1,
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
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Footer row: brand mark left, hairline divider above. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingTop: 24,
          borderTop: `1px solid ${COLORS.border}`,
          zIndex: 1,
        }}
      >
        {logo ? (
          /* next/og only supports raw <img>, not next/image. */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={logo}
            alt=""
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            style={{ objectFit: "contain" }}
          />
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontFamily: "EB Garamond, serif",
            color: COLORS.fg,
            letterSpacing: -0.5,
          }}
        >
          Worldkit Soccer
          <span style={{ color: COLORS.lime }}>.</span>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            fontSize: 20,
            color: COLORS.fgMuted,
          }}
        >
          worldkitsoccer.com
        </div>
      </div>
    </div>
  );
}

/** Display title in EB Garamond — matches the live site H1. */
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
        fontFamily: "EB Garamond, serif",
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
        borderRadius: 999,
        color: solid ? COLORS.fg : COLORS.limeText,
        backgroundColor: solid ? COLORS.lime : "transparent",
        border: solid ? "none" : `1px solid ${COLORS.lime}`,
      }}
    >
      {children}
    </div>
  );
}

export const OG_COLORS = COLORS;

/**
 * @file Default OG image — split editorial lockup matching the redesigned hero.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
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
  logoDataUrl,
  ogImageOptions,
} from "@/lib/og";

export const alt = "Worldkit Soccer — A home for jerseys";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* Pick a hero jersey deterministically per day (UTC), mirroring the live
 * hero's `pickNationOfTheDay`. Keeps the social preview in sync with what a
 * user actually lands on. */
const HERO_NATIONS = [
  "brazil",
  "argentina",
  "germany",
  "france",
  "england",
  "spain",
  "portugal",
  "netherlands",
] as const;

let _jerseyCache: { day: number; url: string | null } | null = null;

async function heroJerseyDataUrl(): Promise<string | null> {
  const day = Math.floor(Date.now() / 86_400_000);
  if (_jerseyCache && _jerseyCache.day === day) return _jerseyCache.url;

  const slug = HERO_NATIONS[day % HERO_NATIONS.length];
  try {
    const file = path.join(
      process.cwd(),
      "public",
      "jerseys",
      "away-transparent",
      `${slug}.webp`,
    );
    const png = await sharp(file)
      .resize(440, 560, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    const url = `data:image/png;base64,${png.toString("base64")}`;
    _jerseyCache = { day, url };
    return url;
  } catch {
    _jerseyCache = { day, url: null };
    return null;
  }
}

export default async function OpengraphImage() {
  const [logo, jersey] = await Promise.all([logoDataUrl(), heroJerseyDataUrl()]);

  return new ImageResponse(
    (
      <OgFrame logo={logo}>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* LEFT — title + subtext, mirrors the live hero left column. */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            {/* Two-line H1 — stacked in a column wrapper because Satori's
                `display: flex` defaults children to row direction even for
                nested <div>s. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 88,
                lineHeight: 1.02,
                letterSpacing: -2,
                fontFamily: "EB Garamond, serif",
                color: OG_COLORS.fg,
              }}
            >
              <span>Worldkit,</span>
              <span>A home for jerseys.</span>
            </div>
            <OgMeta size={26}>
              2026 World Cup. 48 nations. Dispatched worldwide.
            </OgMeta>
          </div>

          {/* RIGHT — jersey on layered lime grid, the hero composition. */}
          {jersey ? (
            <div
              style={{
                position: "relative",
                width: 380,
                height: 460,
                display: "flex",
              }}
            >
              {/* Lime fill block behind the grid */}
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
              {/* Grid square — drawn as a CSS gradient so every cell renders.
                  16×16 of 20px cells. Satori supports backgroundImage with
                  linear-gradient + backgroundSize. */}
              <div
                style={{
                  position: "absolute",
                  left: 32,
                  top: 92,
                  width: 320,
                  height: 320,
                  backgroundColor: "#fff",
                  backgroundImage:
                    "linear-gradient(to right, rgba(163,230,53,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(163,230,53,0.55) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  border: `1px solid rgba(163,230,53,0.55)`,
                  display: "flex",
                }}
              />
              {/* Jersey — front of stack */}
              <img
                src={jersey}
                alt=""
                width={320}
                height={420}
                style={{
                  position: "absolute",
                  left: 32,
                  top: 0,
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

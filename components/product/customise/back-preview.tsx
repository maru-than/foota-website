"use client";

/**
 * @file Live back-of-shirt preview — SVG name + number or a photographed blank with overlaid text.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import Image from "next/image";
import { useId, useState } from "react";

import { teamColors } from "@/components/ui/jersey-placeholder";
import { cn } from "@/lib/utils";
import type { JerseyMeta } from "@/lib/shopify/types";
import { useCustomise } from "./customise-context";

/* ------------------------------------------------------------------ */
/*  Arc-typography fit                                                 */
/*                                                                     */
/*  The printed name follows a gentle rainbow arc above the number,    */
/*  mirroring real World Cup back-prints. Names are capped at 12       */
/*  characters by the form (CUSTOM_MAX_NAME_CHARS) but the SVG also    */
/*  rescales font-size + letter-spacing so even the longest input      */
/*  fits inside the chord width (~115 SVG units) without clipping the  */
/*  collar or the number below.                                        */
/* ------------------------------------------------------------------ */

/** Usable chord width along the arc in SVG units. Slightly narrower than
 *  the literal chord (~120u) to leave a 2-3u margin at each end. */
const NAME_ARC_USABLE_WIDTH = 115;

/** Rough glyph advance per em — uppercase sans/serif jersey fonts average
 *  about 0.62 of the font-size in width. Used to back out a font-size
 *  from a target chord width. */
const GLYPH_ADVANCE_RATIO = 0.62;

/** Solves font-size + letter-spacing so `n` glyphs sit inside the arc.
 *  - 1-6 chars: clamps to the upper bound (chunky, jersey-style).
 *  - 12 chars:  collapses to ~13.5/1.06 — still legible, no overflow.
 *  Returns SVG-unit values; caller stringifies as needed. */
function fitNameStyle(n: number): { fontSize: number; letterSpacing: number } {
  if (n <= 0) return { fontSize: 12, letterSpacing: 2 };
  const letterSpacing = Math.max(0.6, 2.5 - n * 0.12);
  const raw =
    (NAME_ARC_USABLE_WIDTH - n * letterSpacing) / (n * GLYPH_ADVANCE_RATIO);
  const fontSize = Math.min(14, Math.max(7, raw));
  return { fontSize, letterSpacing };
}

/* ------------------------------------------------------------------ */
/*  Back-of-shirt preview — second slide in the PDP gallery.            */
/*                                                                      */
/*  Two render paths:                                                   */
/*    1. A photographed "blank back" tile per kit type lives under      */
/*       /public/jerseys/back-blank/{home,away,third,goalkeeper}.webp   */
/*       and gets the typed name + number overlaid as an SVG. (Assets   */
/*       land in commit 7.)                                             */
/*    2. If the photo 404s or is missing, we fall back to an entirely   */
/*       SVG-drawn back silhouette derived from the front placeholder.  */
/*                                                                      */
/*  Either way the type, font and motion of the printed name/number    */
/*  come from the CustomiseProvider — what the buyer types is what     */
/*  they see, live.                                                     */
/* ------------------------------------------------------------------ */

function backImagePath(type: JerseyMeta["type"]): string {
  switch (type) {
    case "Away":
      return "/jerseys/back-blank/away.webp";
    case "Home":
    default:
      return "/jerseys/back-blank/home.webp";
  }
}

/** SVG back silhouette — used when no photo is available. */
function JerseyBackSvg({
  color1,
  color2,
  className,
}: {
  color1: string;
  color2: string;
  className?: string;
}) {
  // Rectangular collar, body, sleeves — visually distinct from the front.
  const clipId = `back-${(color1 + color2).replace(/[^a-z0-9]/gi, "")}`;
  const body =
    "M40 40 L70 30 L85 36 L115 36 L130 30 L160 40 L175 70 L155 80 L155 200 Q155 210 145 210 L55 210 Q45 210 45 200 L45 80 L25 70 Z";
  return (
    <svg viewBox="0 0 200 240" className={cn("block h-full w-full", className)} aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <path d={body} />
        </clipPath>
      </defs>
      <path d={body} fill={color1} stroke="rgba(0,0,0,.25)" strokeWidth="1" />
      {/* Collar bar — flat, no front V. */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="85" y="30" width="30" height="12" fill={color2} opacity="0.92" />
      </g>
      {/* Shoulder seams. */}
      <path d="M40 40 L25 70 L45 80" fill="rgba(0,0,0,.18)" />
      <path d="M160 40 L175 70 L155 80" fill="rgba(0,0,0,.18)" />
    </svg>
  );
}

export function BackPreview({ meta }: { meta: JerseyMeta }) {
  const { name, number, enabled, fontSpec } = useCustomise();
  const [photoFailed, setPhotoFailed] = useState(false);
  const colors = teamColors(meta.teamName, meta.type);
  /* Unique path id so multiple BackPreviews on one page (e.g. listing
     previews + PDP) never collide on the textPath href. */
  const reactId = useId();
  const arcId = `name-arc-${reactId.replace(/[^a-z0-9]/gi, "")}`;
  const { fontSize: nameFontSize, letterSpacing: nameLetterSpacing } =
    fitNameStyle(name.length);

  const showHint = !enabled || (!name && !number);
  const photoSrc = backImagePath(meta.type);

  return (
    <div className="relative h-full w-full">
      {!photoFailed ? (
        <Image
          src={photoSrc}
          alt={`${meta.teamName ?? "Jersey"} — back`}
          fill
          sizes="50vw"
          className="object-contain p-6"
          onError={() => setPhotoFailed(true)}
        />
      ) : (
        <JerseyBackSvg
          color1={colors.color1}
          color2={colors.color2}
          className="p-6"
        />
      )}

      {/* Name + number overlay — sits on top of either render path. */}
      <svg
        viewBox="0 0 200 240"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Arc path the name rides on — rainbow shape (middle high,
            edges low) mirroring real back-prints. Endpoints at x=42/158
            keep the name clear of the collar; control point at y=78
            sets the rise. */}
        <defs>
          <path
            id={arcId}
            d="M 42 100 Q 100 78 158 100"
            fill="none"
          />
        </defs>
        {/* Curved name across the upper back. fitNameStyle() guarantees
            the rendered width stays within NAME_ARC_USABLE_WIDTH even at
            the 12-char input cap. */}
        {name ? (
          <text
            fontFamily={fontSpec.family}
            fontWeight={fontSpec.weight}
            fontSize={nameFontSize}
            letterSpacing={nameLetterSpacing}
            fill={photoFailed ? colors.color2 : "rgba(0,0,0,0.85)"}
          >
            <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
              {name}
            </textPath>
          </text>
        ) : null}
        {/* Big centred number. */}
        {number ? (
          <text
            x="100"
            y="160"
            textAnchor="middle"
            fontFamily={fontSpec.family}
            fontWeight={900}
            fontSize="72"
            letterSpacing="-2"
            fill={photoFailed ? colors.color2 : "rgba(0,0,0,0.88)"}
          >
            {number}
          </text>
        ) : null}
      </svg>

      {showHint ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center">
          <p className="inline-block bg-background/70 px-3 py-1.5 text-[11px] uppercase text-foreground/80 backdrop-blur">
            Add your name on the back →
          </p>
        </div>
      ) : null}
    </div>
  );
}

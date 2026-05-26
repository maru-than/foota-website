"use client";

import Image from "next/image";
import { useState } from "react";

import { teamColors } from "@/components/ui/jersey-placeholder";
import { cn } from "@/lib/utils";
import type { JerseyMeta } from "@/lib/shopify/types";
import { useCustomise } from "./customise-context";

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
    case "Third":
      return "/jerseys/back-blank/third.webp";
    case "Goalkeeper":
      return "/jerseys/back-blank/goalkeeper.webp";
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
  const colors = teamColors(meta.teamName);

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
        {/* Name across the upper back. */}
        {name ? (
          <text
            x="100"
            y="92"
            textAnchor="middle"
            fontFamily={fontSpec.family}
            fontWeight={fontSpec.weight}
            fontSize="12"
            letterSpacing="2"
            fill={photoFailed ? colors.color2 : "rgba(0,0,0,0.85)"}
          >
            {name}
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
          <p className="inline-block bg-bg-0/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-fg-2 backdrop-blur">
            Add your name on the back →
          </p>
        </div>
      ) : null}
    </div>
  );
}

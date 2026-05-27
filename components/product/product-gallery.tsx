"use client";

/**
 * @file Touch-snap gallery on mobile, thumbnails on desktop — optional back-preview slide injected last.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";

import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { cn } from "@/lib/utils";
import type { Image as ProductImage, JerseyMeta } from "@/lib/shopify/types";

/**
 * Touch-native gallery on mobile — horizontal snap track. Thumbnails act as
 * a paginator and scroll-to-image control. Desktop keeps the single-image
 * + thumbnail-strip layout via the `md:` overrides.
 *
 * Optional `backSlot` — a ReactNode (e.g. the live back-of-shirt preview)
 * that joins the slide deck as the last tile and gets its own thumbnail.
 */
export function ProductGallery({
  images,
  title,
  meta,
  backSlot,
}: {
  images: ProductImage[];
  title: string;
  meta: JerseyMeta;
  backSlot?: ReactNode;
}) {
  const slideCount = images.length + (backSlot ? 1 : 0);
  const backIndex = backSlot ? images.length : -1;
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isProgrammatic = useRef(false);

  // Keep `active` in sync as the user swipes on mobile.
  useEffect(() => {
    if (slideCount <= 1) return;
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (isProgrammatic.current) return;
        // Pick the most-visible slide as the active one.
        let best: { index: number; ratio: number } | null = null;
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.index ?? -1);
          if (i < 0) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index: i, ratio: entry.intersectionRatio };
          }
        }
        if (best && best.ratio > 0.55) setActive(best.index);
      },
      { root: track, threshold: [0.55, 0.75, 1] },
    );
    for (const el of slideRefs.current) {
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [slideCount]);

  const scrollTo = useCallback((i: number) => {
    const target = slideRefs.current[i];
    if (!target) return;
    isProgrammatic.current = true;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(i);
    // Release the programmatic flag once the smooth scroll settles.
    window.setTimeout(() => {
      isProgrammatic.current = false;
    }, 500);
  }, []);

  if (images.length === 0 && !backSlot) {
    return (
      <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden border border-border">
        <JerseyPlaceholder
          label={meta.teamName ?? undefined}
          sublabel={meta.season ?? undefined}
          className="relative z-[2]"
        />
      </div>
    );
  }

  // Desktop: original single image + thumbnail strip.
  // Mobile: horizontal snap carousel + dots paginator.
  return (
    <div className="flex flex-col gap-3">
      {/* Mobile snap track */}
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:hidden"
      >
        {images.map((img, i) => (
          <div
            key={`${img.url}-${i}`}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-index={i}
            className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden border border-border bg-white"
          >
            <Image
              src={img.url}
              alt={img.altText || title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-contain p-6"
            />
          </div>
        ))}
        {backSlot ? (
          <div
            key="back-slot-mobile"
            ref={(el) => {
              slideRefs.current[backIndex] = el;
            }}
            data-index={backIndex}
            className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden border border-border bg-background"
          >
            {backSlot}
          </div>
        ) : null}
      </div>

      {/* Desktop active tile — either an image or the back slot. */}
      {active === backIndex && backSlot ? (
        <div className="relative hidden aspect-[4/5] w-full overflow-hidden border border-border bg-background md:block">
          {backSlot}
        </div>
      ) : (
        <div className="relative hidden aspect-[4/5] w-full overflow-hidden border border-border bg-white md:block">
          <Image
            src={(images[active] ?? images[0]).url}
            alt={(images[active] ?? images[0]).altText || title}
            fill
            priority
            sizes="50vw"
            className="object-contain p-6"
          />
        </div>
      )}

      {slideCount > 1 ? (
        <>
          {/* Mobile dots paginator — bigger tap targets than thumbnails on a phone. */}
          <div className="flex justify-center gap-2 md:hidden" aria-hidden>
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={
                  i === backIndex ? "View back preview" : `Go to image ${i + 1}`
                }
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "block size-1.5 rounded-full transition-colors",
                    i === active ? "bg-primary" : "bg-border",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Desktop thumbnail strip */}
          <div className="hidden grid-cols-5 gap-2 md:grid">
            {images.map((img, i) => (
              <button
                key={`${img.url}-${i}-thumb`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative aspect-[4/5] overflow-hidden border bg-white transition-colors",
                  i === active ? "border-primary" : "border-border hover:border-border",
                )}
              >
                <Image src={img.url} alt="" fill sizes="120px" className="object-contain p-1.5" />
              </button>
            ))}
            {backSlot ? (
              <button
                key="back-slot-thumb"
                type="button"
                onClick={() => setActive(backIndex)}
                aria-label="View back preview"
                className={cn(
                  "relative aspect-[4/5] overflow-hidden border bg-background transition-colors",
                  active === backIndex
                    ? "border-primary"
                    : "border-border hover:border-border",
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-semibold uppercase text-muted-foreground">
                    Back
                  </span>
                </div>
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

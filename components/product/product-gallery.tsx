"use client";

import { useState } from "react";
import Image from "next/image";

import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { cn } from "@/lib/utils";
import type { Image as ProductImage, JerseyMeta } from "@/lib/shopify/types";

export function ProductGallery({
  images,
  title,
  meta,
}: {
  images: ProductImage[];
  title: string;
  meta: JerseyMeta;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="jersey-frame grid-texture relative aspect-[4/5] w-full overflow-hidden border border-line-accent">
        <JerseyPlaceholder
          label={meta.teamName ?? undefined}
          sublabel={meta.season ?? undefined}
          className="relative z-[2]"
        />
      </div>
    );
  }

  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line-accent bg-white">
        <Image
          src={current.url}
          alt={current.altText || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6"
        />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative aspect-[4/5] overflow-hidden border bg-white transition-colors",
                i === active ? "border-accent" : "border-line-1 hover:border-line-accent",
              )}
            >
              <Image src={img.url} alt="" fill sizes="120px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

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
      <div className="aspect-[4/5] w-full overflow-hidden border border-line bg-paper">
        <JerseyPlaceholder
          label={meta.teamName ?? undefined}
          sublabel={meta.season ?? undefined}
        />
      </div>
    );
  }

  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-paper">
        <Image
          src={current.url}
          alt={current.altText || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative aspect-[4/5] overflow-hidden border transition-colors",
                i === active ? "border-ink" : "border-line hover:border-ink/50",
              )}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

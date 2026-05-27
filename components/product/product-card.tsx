/**
 * @file Product tile — front / back image swap on hover, size chips, badges, price, link to PDP.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Jersey, teamColors } from "@/components/ui/jersey-placeholder";
import { Price } from "@/components/ui/price";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { meta } = product;
  const primary = product.featuredImage;
  const secondary = product.images[1];
  const sizes =
    "(max-width: 640px) 45vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw";
  const kit = teamColors(meta.teamName ?? product.title, meta.type);
  const chips = product.variants.slice(0, 4);
  const extra = product.variants.length - chips.length;
  const caption = [meta.type, meta.season].filter(Boolean).join(" · ");
  const money = product.priceRange.minVariantPrice;

  return (
    <Link
      href={`/products/${product.handle}`}
      aria-label={product.title}
      className="group flex flex-col bg-muted transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div
        className={cn(
          "relative flex aspect-[4/5] items-center justify-center overflow-hidden",
          primary ? "bg-white" : "bg-muted p-5",
        )}
      >
        {primary ? (
          <>
            <Image
              src={primary.url}
              alt={primary.altText}
              fill
              sizes={sizes}
              priority={priority}
              className={cn(
                "object-contain p-3 transition-opacity duration-500",
                secondary && "group-hover:opacity-0",
              )}
            />
            {secondary ? (
              <Image
                src={secondary.url}
                alt={secondary.altText}
                fill
                sizes={sizes}
                className="object-contain p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            ) : null}
          </>
        ) : (
          <Jersey
            color1={kit.color1}
            color2={kit.color2}
            number={kit.number}
            className="relative z-[2] max-w-[68%]"
          />
        )}

        {meta.badge ? (
          <span className="absolute left-3 top-3 z-[3]">
            <Badge
              // Host marquee → lime fill; everything else → lime outline.
              variant={meta.badge === "Host" ? "default" : "outline"}
              className={
                meta.badge === "Host"
                  ? undefined
                  : "border-primary text-primary"
              }
            >
              {meta.badge}
            </Badge>
          </span>
        ) : null}
        {!product.availableForSale ? (
          <span className="absolute right-3 top-3 z-[3]">
            <Badge variant="outline">Sold out</Badge>
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border border-t-0 border-border p-5">
        <div className="flex flex-col gap-1.5">
          <span className="text-xl font-bold leading-none text-primary">
            {meta.teamName ?? product.title}
          </span>
          {caption ? <span className="text-xs text-muted-foreground">{caption}</span> : null}
        </div>
        <Price
          amount={money.amount}
          currencyCode={money.currencyCode}
          compareAt={product.compareAtPrice}
          className="text-sm font-bold text-foreground"
        />
      </div>
    </Link>
  );
}

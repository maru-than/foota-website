import Image from "next/image";
import Link from "next/link";

import { Badge, jerseyBadgeVariant } from "@/components/ui/badge";
import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
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
  const sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-paper">
        {primary ? (
          <>
            <Image
              src={primary.url}
              alt={primary.altText}
              fill
              sizes={sizes}
              priority={priority}
              className={cn(
                "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                secondary && "group-hover:opacity-0",
              )}
            />
            {secondary ? (
              <Image
                src={secondary.url}
                alt={secondary.altText}
                fill
                sizes={sizes}
                className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              />
            ) : null}
          </>
        ) : (
          <JerseyPlaceholder
            label={meta.teamName ?? undefined}
            sublabel={meta.season ?? undefined}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {meta.badge ? (
          <div className="absolute left-3 top-3">
            <Badge variant={jerseyBadgeVariant(meta.badge)}>{meta.badge}</Badge>
          </div>
        ) : null}
        {!product.availableForSale ? (
          <div className="absolute right-3 top-3">
            <Badge variant="outline">Sold out</Badge>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-col gap-1">
        {meta.teamName ? (
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
            {meta.teamName}
          </span>
        ) : null}
        <h3 className="text-pretty text-sm font-medium leading-snug text-ink transition-colors group-hover:text-grass">
          {product.title}
        </h3>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <Price
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            className="text-sm"
          />
          {meta.season ? (
            <span className="text-xs text-muted">{meta.season}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

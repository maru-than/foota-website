"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { Price } from "@/components/ui/price";
import { useCart } from "./cart-provider";
import type { CartLine } from "@/lib/shopify/types";

export function CartItem({
  line,
  onNavigate,
}: {
  line: CartLine;
  onNavigate?: () => void;
}) {
  const { updateItem, removeItem } = useCart();
  const { product } = line.merchandise;
  const image = product.featuredImage;
  const size =
    line.merchandise.selectedOptions.find(
      (o) => o.name.toLowerCase() === "size",
    )?.value ?? line.merchandise.title;

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/products/${product.handle}`}
        onClick={onNavigate}
        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden border border-line bg-paper"
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <JerseyPlaceholder label={product.teamName ?? undefined} />
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col">
            {product.teamName ? (
              <span className="text-[11px] uppercase tracking-[0.1em] text-muted">
                {product.teamName}
              </span>
            ) : null}
            <Link
              href={`/products/${product.handle}`}
              onClick={onNavigate}
              className="text-sm font-medium leading-snug text-ink transition-colors hover:text-grass"
            >
              {product.title}
            </Link>
            <span className="mt-0.5 text-xs text-muted">Size {size}</span>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label={`Remove ${product.title}`}
            className="h-fit text-muted transition-colors hover:text-burgundy"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-line">
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity - 1)}
              aria-label="Decrease quantity"
              className="flex size-8 items-center justify-center text-muted transition-colors hover:text-ink"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity + 1)}
              aria-label="Increase quantity"
              className="flex size-8 items-center justify-center text-muted transition-colors hover:text-ink"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <Price
            amount={line.cost.totalAmount.amount}
            currencyCode={line.cost.totalAmount.currencyCode}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}

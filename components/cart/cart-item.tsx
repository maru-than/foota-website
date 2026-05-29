"use client";

/**
 * @file Cart line entry — product image, size, customisation label, quantity controls, remove button.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { formatCustomLabel } from "@/lib/customisation";
import { cn, formatPrice, lineSubtotal } from "@/lib/utils";
import { useCart } from "./cart-provider";
import type { CartLine } from "@/lib/shopify/types";

export function CartItem({
  line,
  onNavigate,
}: {
  line: CartLine;
  onNavigate?: () => void;
}) {
  const { updateItem, removeItem, isPending } = useCart();
  const { product } = line.merchandise;
  const image = product.featuredImage;
  const size =
    line.merchandise.selectedOptions.find((o) => o.name.toLowerCase() === "size")
      ?.value ?? line.merchandise.title;
  const customLabel = formatCustomLabel(line.customisation);
  const subtotal = lineSubtotal(line);
  const currency = line.merchandise.price.currencyCode;

  return (
    <div className="relative flex gap-4 py-5">
      <Link
        href={`/products/${product.handle}`}
        onClick={onNavigate}
        className={cn(
          "relative h-[110px] w-24 shrink-0 overflow-hidden rounded-lg border border-border",
          image ? "bg-white" : "bg-muted",
        )}
      >
        {image ? (
          <Image src={image.url} alt={image.altText} fill sizes="96px" className="object-contain p-1.5" />
        ) : (
          <JerseyPlaceholder label={product.teamName ?? undefined} className="p-2" />
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <Link
            href={`/products/${product.handle}`}
            onClick={onNavigate}
            className="text-base font-medium leading-tight text-foreground transition-colors hover:text-primary"
          >
            {product.title}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label={`Remove ${product.title}`}
            className="-mr-2 -mt-2 flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-destructive"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>
        <span className="mt-1 text-xs text-muted-foreground">Size {size}</span>
        {customLabel ? (
          <span className="mt-0.5 text-xs text-foreground/80">
            {customLabel}
            <span className="ml-2 text-muted-foreground normal-case tracking-normal">
              · +{formatPrice(line.customisation?.priceDelta.amount ?? "0", currency)}
            </span>
          </span>
        ) : null}

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-md border border-input">
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity - 1)}
              disabled={isPending}
              aria-label="Decrease quantity"
              className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <Minus className="size-3.5" strokeWidth={1.5} />
            </button>
            <span className="w-9 text-center text-sm font-bold tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity + 1)}
              disabled={isPending}
              aria-label="Increase quantity"
              className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <Plus className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <span className={cn("text-sm tabular-nums text-foreground")}>
            {formatPrice(subtotal, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}

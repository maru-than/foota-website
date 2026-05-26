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
  const { updateItem, removeItem } = useCart();
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
          "relative h-[110px] w-24 shrink-0 overflow-hidden border border-line-1",
          image ? "bg-white" : "jersey-frame",
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
            className="text-base font-bold leading-tight tracking-[-0.03em] text-accent transition-colors hover:text-accent-hi"
          >
            {product.title}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label={`Remove ${product.title}`}
            className="-mr-2 -mt-2 flex h-9 w-9 shrink-0 items-center justify-center text-fg-3 transition-colors hover:text-danger"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>
        <span className="mt-1 text-xs text-fg-3">Size {size}</span>
        {customLabel ? (
          <span className="mt-0.5 text-xs uppercase text-fg-2">
            {customLabel}
            <span className="ml-2 text-fg-3 normal-case tracking-normal">
              · +{formatPrice(line.customisation?.priceDelta.amount ?? "0", currency)}
            </span>
          </span>
        ) : null}

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-line-2">
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity - 1)}
              aria-label="Decrease quantity"
              className="flex size-11 items-center justify-center text-fg-1 transition-colors hover:text-accent"
            >
              <Minus className="size-3.5" strokeWidth={1.5} />
            </button>
            <span className="w-9 text-center text-sm font-bold tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity + 1)}
              aria-label="Increase quantity"
              className="flex size-11 items-center justify-center text-fg-1 transition-colors hover:text-accent"
            >
              <Plus className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <span className={cn("text-sm font-bold tabular-nums text-accent")}>
            {formatPrice(subtotal, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}

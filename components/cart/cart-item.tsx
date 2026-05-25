"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { cn, formatPrice } from "@/lib/utils";
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
            className="-mt-1 h-fit text-fg-3 transition-colors hover:text-danger"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>
        <span className="mt-1 text-xs text-fg-3">Size {size}</span>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-line-2">
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity - 1)}
              aria-label="Decrease quantity"
              className="flex size-8 items-center justify-center text-fg-1 transition-colors hover:text-accent"
            >
              <Minus className="size-3.5" strokeWidth={1.5} />
            </button>
            <span className="w-8 text-center text-sm font-bold tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateItem(line.id, line.quantity + 1)}
              aria-label="Increase quantity"
              className="flex size-8 items-center justify-center text-fg-1 transition-colors hover:text-accent"
            >
              <Plus className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <span className={cn("text-sm font-bold tabular-nums text-accent")}>
            {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
          </span>
        </div>
      </div>
    </div>
  );
}

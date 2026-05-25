"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { cn, formatPrice } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { VariantSelector } from "./variant-selector";

function defaultOptions(product: Product): Record<string, string> {
  const base =
    product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  const options: Record<string, string> = {};
  base?.selectedOptions.forEach((o) => {
    options[o.name] = o.value;
  });
  return options;
}

function findVariant(
  product: Product,
  selected: Record<string, string>,
): ProductVariant | undefined {
  return product.variants.find((v) =>
    v.selectedOptions.every((o) => selected[o.name] === o.value),
  );
}

const TRUST = [
  { Icon: Truck, title: "Worldwide shipping", note: "Tracked · dispatched in 48h" },
  { Icon: ShieldCheck, title: "Inspected on arrival", note: "Stitching, crest & fonts" },
  { Icon: Sparkles, title: "New condition", note: "Photographed & condition-checked" },
];

export function ProductBuyBox({ product }: { product: Product }) {
  const { addItem, isPending } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    defaultOptions(product),
  );

  const variant = useMemo(() => findVariant(product, selected), [product, selected]);
  const available = variant?.availableForSale ?? false;
  const price = variant?.price ?? product.priceRange.minVariantPrice;

  function onChange(optionName: string, value: string) {
    setSelected((prev) => ({ ...prev, [optionName]: value }));
  }

  function add() {
    if (variant && available) addItem(product, variant);
  }

  return (
    <div className="space-y-6">
      <VariantSelector product={product} selected={selected} onChange={onChange} />

      <div className="flex items-center gap-2 text-sm">
        <span
          className={cn(
            "inline-block size-2 rounded-full",
            available ? "bg-accent" : "bg-danger",
          )}
        />
        <span className="text-fg-3">
          {available ? "In stock · ready to ship" : "Currently sold out"}
        </span>
      </div>

      <Button onClick={add} disabled={!available || isPending} className="w-full">
        {available
          ? `Add to bag — ${formatPrice(price.amount, price.currencyCode)}`
          : "Sold out"}
        {available ? <ArrowRight className="size-4" strokeWidth={1.5} /> : null}
      </Button>

      <div className="grid grid-cols-3 gap-3 border-t border-line-1 pt-5">
        {TRUST.map(({ Icon, title, note }) => (
          <div key={title} className="flex gap-2.5">
            <Icon className="size-[18px] shrink-0 text-accent" strokeWidth={1.5} />
            <div className="flex flex-col gap-0.5">
              <b className="text-xs font-bold tracking-[-0.02em] text-fg-1">{title}</b>
              <span className="text-[11px] leading-snug text-fg-3">{note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky add-to-bag bar — mobile only. */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line-accent bg-bg-1/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex min-w-0 flex-col">
          {product.meta.teamName ? (
            <span className="truncate text-xs text-fg-3">
              {product.meta.teamName}
              {selected.Size ? (
                <span className="text-fg-2"> · Size {selected.Size}</span>
              ) : null}
            </span>
          ) : null}
          <Price
            amount={price.amount}
            currencyCode={price.currencyCode}
            compareAt={product.compareAtPrice}
            className="text-sm font-bold text-accent"
          />
        </div>
        <Button onClick={add} disabled={!available || isPending} className="shrink-0">
          {available ? "Add to bag" : "Sold out"}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { cn } from "@/lib/utils";
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

export function ProductBuyBox({ product }: { product: Product }) {
  const { addItem, isPending } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    defaultOptions(product),
  );

  const variant = useMemo(
    () => findVariant(product, selected),
    [product, selected],
  );
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
            available ? "bg-grass" : "bg-burgundy",
          )}
        />
        <span className="text-muted">
          {available ? "In stock — ready to ship" : "Currently sold out"}
        </span>
      </div>

      <Button
        type="button"
        onClick={add}
        disabled={!available || isPending}
        size="lg"
        className="w-full uppercase tracking-[0.12em]"
      >
        <ShoppingBag className="size-4" />
        {available ? "Add to bag" : "Sold out"}
      </Button>

      {/* Sticky add-to-cart bar — mobile only. */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line bg-bone/95 px-5 py-3 backdrop-blur lg:hidden">
        <div className="flex min-w-0 flex-col">
          {product.meta.teamName ? (
            <span className="truncate text-xs text-muted">
              {product.meta.teamName}
            </span>
          ) : null}
          <Price
            amount={price.amount}
            currencyCode={price.currencyCode}
            className="text-sm font-medium"
          />
        </div>
        <Button
          type="button"
          onClick={add}
          disabled={!available || isPending}
          className="shrink-0 uppercase tracking-[0.12em]"
        >
          {available ? "Add to bag" : "Sold out"}
        </Button>
      </div>
    </div>
  );
}

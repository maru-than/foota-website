"use client";

/**
 * @file PDP buy box — variant selector, customise toggle / form / templates, in-stock status, pending state.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useMemo, useState } from "react";
import { ArrowRight, Clock, PackageCheck, XCircle } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { CustomiseForm } from "./customise/customise-form";
import { CustomiseTemplates } from "./customise/customise-templates";
import { CustomiseToggle } from "./customise/customise-toggle";
import { useCustomise } from "./customise/customise-context";
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
  const { enabled: customEnabled, priceDelta, customisation } = useCustomise();

  const variant = useMemo(() => findVariant(product, selected), [product, selected]);
  const available = variant?.availableForSale ?? false;
  const basePrice = variant?.price ?? product.priceRange.minVariantPrice;
  const effectiveAmount =
    Number.parseFloat(basePrice.amount) + (customEnabled ? priceDelta : 0);
  const price = {
    amount: effectiveAmount.toFixed(2),
    currencyCode: basePrice.currencyCode,
  };
  function onChange(optionName: string, value: string) {
    setSelected((prev) => ({ ...prev, [optionName]: value }));
  }

  function add() {
    if (variant && available) addItem(product, variant, 1, customisation);
  }

  return (
    <div className="space-y-6">
      <VariantSelector product={product} selected={selected} onChange={onChange} />

      <CustomiseToggle />
      <CustomiseForm />
      <CustomiseTemplates product={product} />

      <div className="flex items-center gap-2 text-sm">
        {available ? (
          customEnabled ? (
            <Clock className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
          ) : (
            <PackageCheck className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
          )
        ) : (
          <XCircle className="size-4 text-destructive" strokeWidth={1.5} aria-hidden />
        )}
        <span className="text-muted-foreground">
          {available
            ? customEnabled
              ? "Heat-press lead time · 5–7 days"
              : "In stock"
            : "Currently sold out"}
        </span>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-40 md:static md:inset-auto md:z-auto">
        <Button
          onClick={add}
          disabled={!available || isPending}
          size="lg"
          className="w-full rounded-full bg-lime-400 text-gray-950 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.25),inset_0_0_4px_0_rgba(255,255,255,1)] hover:bg-lime-500 disabled:bg-neutral-950 disabled:text-white disabled:opacity-100 disabled:shadow-[inset_0_0_4px_0_rgba(255,255,255,0.2),0_0_1px_0_rgba(0,0,0,0.25)] md:shadow-[inset_0_0_4px_0_rgba(255,255,255,1)]"
        >
          {available
            ? `Add to bag — ${formatPrice(price.amount, price.currencyCode)}`
            : "Sold out"}
          {available ? <ArrowRight className="size-4" strokeWidth={1.5} /> : null}
        </Button>
      </div>
    </div>
  );
}

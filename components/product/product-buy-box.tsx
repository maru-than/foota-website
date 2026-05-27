"use client";

/**
 * @file PDP buy box — variant selector, customise toggle / form / templates, trust badges, pending state.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Clock,
  Flame,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  XCircle,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { formatCustomLabel } from "@/lib/customisation";
import { cn, formatPrice } from "@/lib/utils";
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

const TRUST_BLANK = [
  { Icon: Truck, title: "Worldwide shipping", note: "Tracked · dispatched in 48h" },
  { Icon: ShieldCheck, title: "Inspected on arrival", note: "Stitching, crest & fonts" },
  { Icon: PackageCheck, title: "New condition", note: "Photographed & condition-checked" },
];

const TRUST_CUSTOM = [
  { Icon: Truck, title: "Worldwide shipping", note: "Tracked · dispatched in 5–7 days" },
  { Icon: ShieldCheck, title: "Inspected on arrival", note: "Stitching, crest & fonts" },
  { Icon: Flame, title: "Officially heat-pressed", note: "Authentic matchday lettering" },
];

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
  const customLabel = formatCustomLabel(customisation);
  const trust = customEnabled ? TRUST_CUSTOM : TRUST_BLANK;

  // Sticky bar visibility — two independent signals:
  //  • inlineVisible: true while the inline Add-to-bag is on screen (no point
  //    showing a second CTA).
  //  • footerVisible: true once the page footer enters the viewport (free the
  //    footer's copyright / locale switcher from permanent occlusion).
  // Bar shows only when both are false.
  const inlineButtonRef = useRef<HTMLDivElement>(null);
  const [inlineVisible, setInlineVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const el = inlineButtonRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInlineVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);
  const showSticky = !inlineVisible && !footerVisible;

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
            <Clock className="size-4 text-primary" strokeWidth={1.5} aria-hidden />
          ) : (
            <PackageCheck className="size-4 text-primary" strokeWidth={1.5} aria-hidden />
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

      <div ref={inlineButtonRef}>
        <Button onClick={add} disabled={!available || isPending} className="w-full">
          {available
            ? `Add to bag — ${formatPrice(price.amount, price.currencyCode)}`
            : "Sold out"}
          {available ? <ArrowRight className="size-4" strokeWidth={1.5} /> : null}
        </Button>
      </div>

      {/* Single column on phones — at 375px the 3-col version wraps every
          title to 3 lines. From sm: up the original row layout is fine. */}
      <div className="grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-3 sm:gap-3">
        {trust.map(({ Icon, title, note }) => (
          <div key={title} className="flex gap-2.5">
            <Icon className="size-[18px] shrink-0 text-primary" strokeWidth={1.5} />
            <div className="flex flex-col gap-0.5">
              <b className="text-xs font-bold text-foreground">{title}</b>
              <span className="text-[11px] leading-snug text-muted-foreground">{note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky add-to-bag bar — mobile only. Visible only while the inline
          CTA is scrolled past, so the footer is reachable at page bottom. */}
      <div
        aria-hidden={!showSticky}
        className={cn(
          // Apple's "slide & spring" curve — feels native vs. a linear ease.
          "fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none lg:hidden",
          showSticky
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="flex min-w-0 flex-col leading-tight">
          {selected.Size ? (
            <span className="flex items-center gap-1 truncate text-[11px] uppercase text-muted-foreground">
              <Tag className="size-3 shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="truncate">
                Size {selected.Size}
                {customLabel ? ` · ${customLabel}` : null}
              </span>
            </span>
          ) : null}
          <Price
            amount={price.amount}
            currencyCode={price.currencyCode}
            compareAt={product.compareAtPrice}
            className="text-sm font-bold text-primary"
          />
        </div>
        <Button
          size="lg"
          onClick={add}
          disabled={!available || isPending}
          className="shrink-0"
        >
          {available ? "Add to bag" : "Sold out"}
          {available ? <ShoppingBag className="size-4" strokeWidth={1.5} /> : null}
        </Button>
      </div>
    </div>
  );
}

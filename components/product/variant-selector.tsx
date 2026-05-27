"use client";

/**
 * @file Size / type / colour option buttons — grays out unavailable combos, size-guide modal trigger.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { Ruler } from "lucide-react";

import { SizeGuideModal } from "@/components/info/size-guide-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

function isValueAvailable(
  product: Product,
  selected: Record<string, string>,
  optionName: string,
  value: string,
): boolean {
  return product.variants.some((variant) => {
    if (!variant.availableForSale) return false;
    return variant.selectedOptions.every((o) =>
      o.name === optionName
        ? o.value === value
        : selected[o.name]
          ? selected[o.name] === o.value
          : true,
    );
  });
}

export function VariantSelector({
  product,
  selected,
  onChange,
}: {
  product: Product;
  selected: Record<string, string>;
  onChange: (optionName: string, value: string) => void;
}) {
  const hasChoices = product.options.some((o) => o.values.length > 1);
  if (!hasChoices) return null;

  return (
    <div className="space-y-5">
      {product.options.map((option) => (
        <div key={option.id}>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{option.name}</span>
            {option.name.toLowerCase() === "size" ? (
              <SizeGuideModal>
                <Button type="button" variant="link" size="sm">
                  <Ruler className="size-3.5" strokeWidth={1.5} aria-hidden />
                  Size guide
                </Button>
              </SizeGuideModal>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {option.values.map((value) => {
              const isSelected = selected[option.name] === value;
              const available = isValueAvailable(product, selected, option.name, value);
              return (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  disabled={!available}
                  aria-pressed={isSelected}
                  onClick={() => onChange(option.name, value)}
                  className={cn(
                    // Fixed width so "S" and "XXL" render at the same pixel
                    // width — uniform chip grid regardless of label length.
                    "w-12 px-0",
                    // Selected: white fill, 2px primary border (outline-style
                    // selection — see Figma node 2014:721).
                    isSelected &&
                      "border-2 border-primary bg-background text-foreground hover:bg-background hover:text-foreground",
                    !available && "line-through opacity-50",
                  )}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

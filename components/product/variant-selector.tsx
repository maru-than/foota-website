"use client";

import Link from "next/link";

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
            <span className="text-sm font-medium text-ink">
              {option.name}
              {selected[option.name] ? (
                <span className="ml-2 text-muted">{selected[option.name]}</span>
              ) : null}
            </span>
            {option.name.toLowerCase() === "size" ? (
              <Link
                href="/size-guide"
                className="text-xs text-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
              >
                Size guide
              </Link>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selected[option.name] === value;
              const available = isValueAvailable(
                product,
                selected,
                option.name,
                value,
              );
              return (
                <button
                  key={value}
                  type="button"
                  disabled={!available}
                  aria-pressed={isSelected}
                  onClick={() => onChange(option.name, value)}
                  className={cn(
                    "min-w-12 border px-3 py-2.5 text-sm transition-colors",
                    isSelected
                      ? "border-ink bg-ink text-bone"
                      : "border-line hover:border-ink",
                    !available &&
                      "cursor-not-allowed text-muted/40 line-through hover:border-line",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { SizeGuideModal } from "@/components/info/size-guide-modal";
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
            <span className="eyebrow text-fg-3">
              {option.name}
              {selected[option.name] ? (
                <span className="ml-2 text-fg-1">{selected[option.name]}</span>
              ) : null}
            </span>
            {option.name.toLowerCase() === "size" ? (
              <SizeGuideModal>
                <button
                  type="button"
                  className="text-xs font-semibold text-accent transition-colors hover:text-accent-hi focus:outline-none focus-visible:text-accent-hi"
                >
                  Size guide →
                </button>
              </SizeGuideModal>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {option.values.map((value) => {
              const isSelected = selected[option.name] === value;
              const available = isValueAvailable(product, selected, option.name, value);
              return (
                <button
                  key={value}
                  type="button"
                  disabled={!available}
                  aria-pressed={isSelected}
                  onClick={() => onChange(option.name, value)}
                  className={cn(
                    "flex size-12 items-center justify-center border text-sm font-bold tracking-[-0.03em] transition-colors duration-150 ease-foota",
                    isSelected
                      ? "border-accent bg-accent text-bg-1"
                      : "border-line-accent text-fg-1 hover:border-accent hover:bg-accent-12",
                    !available &&
                      "cursor-not-allowed border-line-1 text-fg-4 line-through hover:border-line-1 hover:bg-transparent",
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

/**
 * @file Formatted price display — optional strikethrough compare-at price, tabular nums.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { cn, formatPrice } from "@/lib/utils";

import type { Money } from "@/lib/shopify/types";

export function Price({
  amount,
  currencyCode = "USD",
  compareAt,
  className,
}: {
  amount: string | number;
  currencyCode?: string;
  /** Original "was" price; rendered as strikethrough when greater than amount. */
  compareAt?: Money | null;
  className?: string;
}) {
  const hasCompare =
    !!compareAt && Number(compareAt.amount) > Number(amount);

  if (!hasCompare) {
    return (
      <span className={cn("tabular-nums", className)}>
        {formatPrice(amount, currencyCode)}
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-2 tabular-nums">
      <span className="text-[0.82em] font-normal text-fg-3 line-through decoration-fg-3/60">
        {formatPrice(compareAt.amount, compareAt.currencyCode)}
      </span>
      <span className={className}>{formatPrice(amount, currencyCode)}</span>
    </span>
  );
}

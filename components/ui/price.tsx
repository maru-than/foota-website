import { cn, formatPrice } from "@/lib/utils";

export function Price({
  amount,
  currencyCode = "CHF",
  className,
}: {
  amount: string | number;
  currencyCode?: string;
  className?: string;
}) {
  return (
    <span className={cn("tabular-nums", className)}>
      {formatPrice(amount, currencyCode)}
    </span>
  );
}

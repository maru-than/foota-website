import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { JerseyBadge } from "@/lib/shopify/types";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] leading-none",
  {
    variants: {
      variant: {
        new: "bg-grass text-bone",
        rare: "bg-burgundy text-bone",
        retro: "bg-ink text-bone",
        outline: "border border-line bg-paper/80 text-muted",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

/** Map a jersey badge label to a Badge variant. */
export function jerseyBadgeVariant(
  badge: JerseyBadge,
): NonNullable<BadgeProps["variant"]> {
  switch (badge) {
    case "New":
      return "new";
    case "Rare Find":
      return "rare";
    case "Retro":
      return "retro";
    default:
      return "outline";
  }
}

export { badgeVariants };

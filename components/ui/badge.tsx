/**
 * @file shadcn badge with CVA variants — new / limited / sale / outline plus jerseyBadgeVariant helper.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { JerseyBadge } from "@/lib/shopify/types";

// Solid backings so badges stay legible overlaid on white product tiles.
const badgeVariants = cva(
  "inline-flex items-center rounded-none px-2 py-1.5 text-[10px] font-bold uppercase leading-none",
  {
    variants: {
      variant: {
        new: "bg-accent text-bg-1",
        limited: "border border-accent bg-bg-1 text-accent",
        sale: "bg-danger text-bg-1",
        outline: "border border-line-2 bg-bg-1 text-fg-2",
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
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/** Map a jersey badge label to a Badge variant. */
export function jerseyBadgeVariant(
  badge: JerseyBadge,
): NonNullable<BadgeProps["variant"]> {
  switch (badge) {
    case "Host":
      return "new"; // lime fill — marquee host nations
    case "New":
      return "limited"; // lime outline — new drops
    default:
      return "outline";
  }
}

export { badgeVariants };

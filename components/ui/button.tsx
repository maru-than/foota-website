/**
 * @file shadcn Button — default/outline/secondary/ghost/destructive/link variants, six sizes.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// foota: bumped base from shadcn defaults to match brand language —
// taller, bolder, tighter tracking, sharp (--radius: 0). Variant + size
// names left identical to stock shadcn so the API stays portable.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 border border-transparent text-sm font-bold tracking-[-0.03em] whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-lime-300 active:bg-lime-500",
        outline:
          "border-border bg-background text-foreground hover:border-lime-400 hover:bg-lime-400/12",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "h-auto px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6",
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-14 px-8",
        icon: "size-11",
        "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

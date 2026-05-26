import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-none font-bold tracking-[-0.03em] transition-[background-color,border-color,color,transform] duration-150 ease-worldkit active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-bg-1 hover:bg-accent-hi active:bg-accent-lo disabled:bg-bg-3 disabled:text-fg-4",
        ghost:
          "border border-line-accent text-fg-1 hover:border-accent hover:bg-accent-12 disabled:opacity-50",
        secondary:
          "border border-line-1 bg-bg-3 text-fg-1 hover:bg-bg-4 disabled:opacity-50",
        danger: "bg-danger text-bg-1 hover:opacity-90 disabled:opacity-50",
        link: "h-auto px-0 text-accent underline-offset-4 hover:text-accent-hi hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        default: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

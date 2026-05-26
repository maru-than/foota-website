import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // text-base on mobile prevents iOS Safari from auto-zooming the
          // viewport on input focus; restores the design's 14px from sm: up.
          "flex h-12 w-full rounded-none border border-line-2 bg-bg-2 px-4 text-base tracking-[-0.03em] text-fg-1 transition-colors duration-150 ease-worldkit placeholder:text-fg-4 focus-visible:border-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

/**
 * @file Line divider — horizontal (default) or vertical, no semantic role.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { cn } from "@/lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-line-1",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}

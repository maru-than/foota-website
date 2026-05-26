/**
 * @file Max-width wrapper — 1440px center with responsive px padding.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

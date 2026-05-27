"use client";

/**
 * @file Slide-in mobile drawer nav — logo, primary links, search / bag quick-actions, locale selector.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Search as SearchIcon } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { BagIcon } from "@/components/ui/icons/bag";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/navigation";

/**
 * Mobile launcher — primary nav + quick actions (search, bag) + locale.
 * Active link uses the same lime underline as the desktop header so the user
 * can read where they are inside the drawer.
 */
export function MobileMenu({
  open,
  onOpenChange,
  links,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: NavLink[];
}) {
  const { totalQuantity, openCart, openSearch } = useCart();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/shop" ? pathname === "/shop" : pathname.startsWith(href);

  const close = () => onOpenChange(false);
  const handle = (cb: () => void) => () => {
    close();
    // Defer so the sheet's close animation can start before the next overlay
    // mounts — Radix queues focus-trap handoff cleanly when they don't race.
    requestAnimationFrame(cb);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-2 py-2">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative border-b border-border px-4 py-4 text-lg font-bold uppercase tracking-[-0.02em] transition-colors duration-150 ease-worldkit",
                  active ? "text-lime-400" : "text-foreground hover:text-lime-400",
                )}
              >
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-y-2 left-0 w-0.5 bg-lime-400"
                  />
                ) : null}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick actions — match desktop header capability so the menu is a
            real launcher, not just a link list. */}
        <div className="mt-2 grid grid-cols-2 gap-2 px-2">
          <button
            type="button"
            onClick={handle(openSearch)}
            className="flex items-center gap-2.5 border border-lime-400/20 px-4 py-3 text-sm font-semibold uppercase text-foreground transition-colors hover:border-lime-400 hover:bg-lime-400/12"
          >
            <SearchIcon className="size-4" strokeWidth={1.5} />
            Search
          </button>
          <button
            type="button"
            onClick={handle(openCart)}
            className="flex items-center justify-between gap-2.5 border border-lime-400/20 px-4 py-3 text-sm font-semibold uppercase text-foreground transition-colors hover:border-lime-400 hover:bg-lime-400/12"
          >
            <span className="inline-flex items-center gap-2.5">
              <BagIcon className="size-4" strokeWidth={1.5} />
              Bag
            </span>
            <b className="tabular-nums text-lime-400">{totalQuantity}</b>
          </button>
        </div>

        <div className="mt-auto border-t border-lime-400/20">
          <div className="flex items-center gap-2 px-6 py-4 text-xs uppercase text-foreground/80">
            <Globe className="size-3.5" strokeWidth={1.5} />
            EN · USD
          </div>
          <div className="border-t border-border px-6 py-6">
            <Image
              src="/logo.png"
              alt="Worldkit Soccer"
              width={200}
              height={200}
              className="h-16 w-auto"
            />
            <p className="mt-3 text-sm text-foreground/80">A home for jerseys.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

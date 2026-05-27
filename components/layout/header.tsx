"use client";

/**
 * @file Sticky top nav — logo, desktop menu with active state, mobile-menu trigger, search / cart icons.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { BagIcon } from "@/components/ui/icons/bag";
import { SearchOverlay } from "@/components/search/search-overlay";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const { totalQuantity, openCart, isSearchOpen, setSearchOpen, openSearch } =
    useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/shop" ? pathname === "/shop" : pathname.startsWith(href);

  return (
    <header className="sticky top-[calc(env(safe-area-inset-top)+1.75rem)] z-40 border-b border-border bg-background">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="-ml-2 lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </Button>

        <Link
          href="/"
          aria-label="Worldkit Soccer — home"
          className="relative z-10 flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Worldkit Soccer"
            width={224}
            height={224}
            priority
            className="h-10 w-auto transition-transform duration-200 ease-out lg:h-28 lg:translate-y-5 lg:drop-shadow-[0_18px_22px_rgba(0,0,0,0.22)] lg:hover:-translate-y-[calc(1.25rem-2px)] lg:hover:drop-shadow-[0_22px_28px_rgba(0,0,0,0.28)]"
          />
        </Link>

        <nav className="ml-6 hidden flex-1 items-center gap-7 lg:flex">
          {MAIN_NAV.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-xs font-semibold uppercase transition-colors duration-150 ease-out",
                  active ? "text-primary" : "text-foreground/80 hover:text-foreground",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-primary" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={openSearch}
            aria-label="Search"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={openCart}
            aria-label={`Open bag, ${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`}
            className="relative"
          >
            <BagIcon className="size-5" strokeWidth={1.5} />
            {totalQuantity > 0 ? (
              <span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground tabular-nums"
              >
                {totalQuantity}
              </span>
            ) : null}
          </Button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} links={MAIN_NAV} />
      <SearchOverlay open={isSearchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

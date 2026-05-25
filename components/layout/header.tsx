"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { SearchOverlay } from "@/components/search/search-overlay";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/shop" ? pathname === "/shop" : pathname.startsWith(href);

  return (
    <header className="sticky top-7 z-40 border-b border-line-accent bg-bg-1">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="-ml-2 flex size-10 items-center justify-center text-fg-1 transition-colors hover:bg-bg-3 lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </button>

        <Link
          href="/"
          aria-label="Foota Jerseys — home"
          className="font-display text-2xl font-normal leading-none tracking-normal text-accent lg:text-[32px]"
        >
          Foota
        </Link>

        <nav className="ml-6 hidden flex-1 items-center gap-7 lg:flex">
          {MAIN_NAV.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-150 ease-foota",
                  active ? "text-accent" : "text-fg-2 hover:text-fg-1",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex size-10 items-center justify-center text-fg-1 transition-colors hover:bg-bg-3"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open bag, ${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`}
            className="ml-1 inline-flex items-center gap-2.5 border border-line-accent px-3 py-2.5 text-[13px] font-bold tracking-[-0.03em] text-fg-1 transition-colors duration-150 ease-foota hover:border-accent hover:bg-accent-12 sm:px-4"
          >
            <ShoppingBag className="size-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Bag</span>
            <b className="tabular-nums text-accent">{totalQuantity}</b>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} links={MAIN_NAV} />
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

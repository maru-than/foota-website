"use client";

/**
 * @file Site nav — floating centered pill on desktop, full-width sticky on mobile. Logo overflows downward on desktop.
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
    <header
      className={cn(
        // Mobile: full-width sticky, opaque background, bottom border.
        "sticky top-0 z-40 border-b border-border bg-background",
        // Desktop: detach from edges, center as a backdrop-blur pill with
        // visible padding above the page. Drop the bottom border (the pill
        // floats over content, doesn't anchor a horizontal rule).
        "lg:fixed lg:inset-x-0 lg:top-6 lg:mx-auto lg:w-fit lg:max-w-[calc(100vw-3rem)] lg:rounded-full lg:border lg:bg-background/70 lg:backdrop-blur-md lg:shadow-lg lg:shadow-black/20",
      )}
    >
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:h-14 lg:gap-6 lg:px-5">
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
            className="h-10 w-auto lg:h-28 lg:translate-y-5 lg:drop-shadow-[0_18px_22px_rgba(0,0,0,0.22)]"
          />
        </Link>

        <nav className="ml-6 hidden items-center gap-7 lg:flex">
          {MAIN_NAV.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-xs font-medium uppercase transition-colors duration-150 ease-out",
                  active ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-foreground" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Desktop separator + breathing room between the link cluster and
            the icon cluster. Mobile hides the divider since the icons sit
            edge-aligned anyway. */}
        <span
          aria-hidden
          className="ml-auto hidden h-5 w-px bg-border lg:ml-8 lg:block"
        />

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
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
            className="relative w-auto gap-1 px-2"
          >
            <BagIcon className="size-5" strokeWidth={1.5} />
            {totalQuantity > 0 ? (
              <span
                aria-hidden
                className="text-xs tabular-nums text-muted-foreground"
              >
                ({totalQuantity})
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

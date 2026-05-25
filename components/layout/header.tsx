"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { SearchOverlay } from "@/components/search/search-overlay";
import { Container } from "@/components/ui/container";
import { MAIN_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-bone/85 backdrop-blur transition-colors",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <div className="flex items-center gap-1 lg:flex-1">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="-ml-2 p-2 text-ink transition-colors hover:text-grass lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <nav className="hidden items-center gap-7 lg:flex">
            {MAIN_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.1em] text-ink/75 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          aria-label="Foota Jerseys — home"
          className="flex shrink-0 items-baseline"
        >
          <span className="font-display text-xl leading-none tracking-tight sm:text-2xl">
            Foota
          </span>
          <span className="ml-1.5 hidden text-[10px] uppercase tracking-[0.25em] text-muted sm:inline">
            Jerseys
          </span>
        </Link>

        <div className="flex items-center justify-end gap-0.5 lg:flex-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="p-2 text-ink transition-colors hover:text-grass"
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open bag, ${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`}
            className="relative p-2 text-ink transition-colors hover:text-grass"
          >
            <ShoppingBag className="size-5" />
            {totalQuantity > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-medium leading-none text-bone">
                {totalQuantity}
              </span>
            ) : null}
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} links={MAIN_NAV} />
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

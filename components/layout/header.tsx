"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
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
    <header className="sticky top-[calc(env(safe-area-inset-top)+1.75rem)] z-40 border-b border-line-accent bg-bg-1">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="-ml-2 flex size-11 items-center justify-center text-fg-1 transition-colors hover:bg-bg-3 lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </button>

        <Link
          href="/"
          aria-label="Worldkit Soccer — home"
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Worldkit Soccer"
            width={160}
            height={160}
            priority
            className="h-10 w-auto lg:h-12"
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
                  "relative py-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-150 ease-worldkit",
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
            onClick={openSearch}
            aria-label="Search"
            className="flex size-11 items-center justify-center text-fg-1 transition-colors hover:bg-bg-3"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open bag, ${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`}
            className="relative flex size-11 items-center justify-center text-fg-1 transition-colors hover:text-accent"
          >
            <BagIcon className="size-6" strokeWidth={1.5} />
            {totalQuantity > 0 ? (
              /* key re-mounts the badge on every quantity change → CSS-only
                 bounce confirms the add succeeded. */
              <span
                key={totalQuantity}
                aria-hidden
                className="absolute -right-0.5 -top-0.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-bg-1 tabular-nums motion-safe:animate-[bagPop_280ms_ease-out]"
                style={{ height: 18 }}
              >
                {totalQuantity}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} links={MAIN_NAV} />
      <SearchOverlay open={isSearchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

"use client";

/**
 * @file Slide-out shopping bag — line-item management, empty-state recommendations, and the checkout flow.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BagIcon } from "@/components/ui/icons/bag";
import { Price } from "@/components/ui/price";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";
import { CartItem } from "./cart-item";
import { CheckoutButton } from "./checkout-button";
import { useCart } from "./cart-provider";

export function CartDrawer({
  /** Best-sellers shown when the bag is empty — turns the empty state into
   *  a discovery surface instead of a dead end. */
  recommendations = [],
}: {
  recommendations?: Product[];
}) {
  const { cart, isOpen, setOpen, closeCart, totalQuantity } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      {/* aria-describedby={undefined} silences Radix's "Missing Description"
          warning — the bag has no narrative to describe beyond its title. */}
      <SheetContent side="right" className="p-0" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>
            Your bag{" "}
            {totalQuantity > 0 ? (
              <span className="tabular-nums text-muted-foreground">({totalQuantity})</span>
            ) : null}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6">
            <div className="flex flex-col items-center gap-4 pt-10 text-center">
              <BagIcon className="size-9 text-muted-foreground/60" strokeWidth={1.25} />
              <p className="text-2xl font-bold">
                Your locker is empty.
              </p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Add a jersey to get started — all 48 nations are in.
              </p>
              <Button asChild onClick={closeCart} className="mt-2">
                <Link href="/shop">Find a jersey</Link>
              </Button>
            </div>

            {recommendations.length > 0 ? (
              <div className="mt-10 border-t border-border pt-6">
                <p className="eyebrow text-muted-foreground">Most wanted</p>
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {recommendations.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/products/${p.handle}`}
                        onClick={closeCart}
                        className="group flex flex-col gap-2"
                      >
                        <div
                          className={cn(
                            "relative aspect-[4/5] overflow-hidden border border-border transition-colors group-hover:border-border",
                            p.featuredImage ? "bg-white" : "bg-muted",
                          )}
                        >
                          {p.featuredImage ? (
                            <Image
                              src={p.featuredImage.url}
                              alt={p.featuredImage.altText}
                              fill
                              sizes="(max-width: 640px) 45vw, 200px"
                              className="object-contain p-2"
                            />
                          ) : null}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold leading-tight text-primary">
                            {p.meta.teamName ?? p.title}
                          </span>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {formatPrice(
                              p.priceRange.minVariantPrice.amount,
                              p.priceRange.minVariantPrice.currencyCode,
                            )}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-line-1 overflow-y-auto px-6">
              {lines.map((line) => (
                <CartItem key={line.id} line={line} onNavigate={closeCart} />
              ))}
            </div>
            <SheetFooter className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                {cart ? (
                  <Price
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                    className="text-base font-bold text-foreground"
                  />
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              {cart ? <CheckoutButton cart={cart} /> : null}
              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-xs uppercase text-muted-foreground transition-colors hover:text-primary"
              >
                Continue shopping
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

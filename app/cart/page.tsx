"use client";

/**
 * @file Cart page — line items, quantities, subtotal/order summary and the checkout CTA.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Link from "next/link";

import { CartItem } from "@/components/cart/cart-item";
import { CheckoutButton } from "@/components/cart/checkout-button";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Price } from "@/components/ui/price";

export default function CartPage() {
  const { cart } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <Container className="py-20 lg:py-32">
      <h1 className="font-display text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">
        Your bag
      </h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-display text-3xl text-foreground">Your locker is empty.</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Add a jersey to get started — all 48 nations are in.
          </p>
          <Button asChild className="mt-2">
            <Link href="/shop">Find a jersey</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-line-1 border-y border-border">
            {lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <div className="border border-border bg-card p-6">
              <h2 className="text-xs font-medium uppercase text-muted-foreground">
                Order summary
              </h2>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                {cart ? (
                  <Price
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                    className="text-base text-foreground"
                  />
                ) : null}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-5">{cart ? <CheckoutButton cart={cart} /> : null}</div>
              <Button asChild variant="link" className="mt-3 w-full">
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}

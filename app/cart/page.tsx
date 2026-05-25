"use client";

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
    <Container className="py-12 lg:py-16">
      <h1 className="text-4xl leading-tight sm:text-5xl">Your bag</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-display text-3xl">Your locker is empty.</p>
          <p className="max-w-md text-sm text-muted">
            No jerseys in the bag yet — the archive is waiting.
          </p>
          <Button asChild className="mt-2 uppercase tracking-[0.12em]">
            <Link href="/shop">Find a Jersey</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-line border-y border-line">
            {lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="border border-line bg-paper p-6">
              <h2 className="font-display text-xl">Order summary</h2>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-muted">Subtotal</span>
                {cart ? (
                  <Price
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                    className="text-base font-medium"
                  />
                ) : null}
              </div>
              <p className="mt-2 text-xs text-muted">
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

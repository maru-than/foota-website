"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartItem } from "./cart-item";
import { CheckoutButton } from "./checkout-button";
import { useCart } from "./cart-provider";

export function CartDrawer() {
  const { cart, isOpen, setOpen, closeCart, totalQuantity } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="p-0">
        <SheetHeader>
          <SheetTitle>
            Your bag{" "}
            {totalQuantity > 0 ? (
              <span className="text-muted">({totalQuantity})</span>
            ) : null}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-9 text-line" strokeWidth={1.25} />
            <p className="font-display text-2xl">Your locker is empty.</p>
            <p className="max-w-xs text-sm text-muted">
              No jerseys in the bag yet — the archive is waiting.
            </p>
            <Button
              asChild
              onClick={closeCart}
              className="mt-2 uppercase tracking-[0.12em]"
            >
              <Link href="/shop">Find a Jersey</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((line) => (
                <CartItem key={line.id} line={line} onNavigate={closeCart} />
              ))}
            </div>
            <SheetFooter className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                {cart ? (
                  <Price
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                    className="text-base font-medium"
                  />
                ) : null}
              </div>
              <p className="text-xs text-muted">
                Shipping and taxes calculated at checkout.
              </p>
              {cart ? <CheckoutButton cart={cart} /> : null}
              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
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

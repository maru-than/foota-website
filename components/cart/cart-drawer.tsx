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
              <span className="tabular-nums text-fg-3">({totalQuantity})</span>
            ) : null}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-9 text-fg-4" strokeWidth={1.25} />
            <p className="text-2xl font-bold tracking-[-0.03em]">Your locker is empty.</p>
            <p className="max-w-xs text-sm text-fg-3">
              Add a jersey to get started — the archive is waiting.
            </p>
            <Button asChild onClick={closeCart} className="mt-2">
              <Link href="/shop">Find a jersey</Link>
            </Button>
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
                <span className="text-sm text-fg-3">Subtotal</span>
                {cart ? (
                  <Price
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                    className="text-base font-bold text-fg-1"
                  />
                ) : null}
              </div>
              <p className="text-xs text-fg-3">
                Shipping and taxes calculated at checkout.
              </p>
              {cart ? <CheckoutButton cart={cart} /> : null}
              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-xs uppercase tracking-[0.12em] text-fg-3 transition-colors hover:text-accent"
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

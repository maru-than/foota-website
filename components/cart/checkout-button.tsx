"use client";

import { Button } from "@/components/ui/button";
import type { Cart } from "@/lib/shopify/types";

export function CheckoutButton({ cart }: { cart: Cart }) {
  const canCheckout = Boolean(cart.checkoutUrl);

  if (!canCheckout) {
    return (
      <div className="space-y-2">
        <Button disabled className="w-full uppercase tracking-[0.12em]">
          Proceed to checkout
        </Button>
        <p className="text-center text-xs text-muted">
          Connect a Shopify store to enable secure checkout.
        </p>
      </div>
    );
  }

  return (
    <Button asChild className="w-full uppercase tracking-[0.12em]">
      {/* Shopify-hosted checkout — never a custom checkout. */}
      <a href={cart.checkoutUrl}>Proceed to checkout</a>
    </Button>
  );
}

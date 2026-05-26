"use client";

/**
 * @file Checkout CTA — routes to Shopify checkout or shows a disabled state when the store isn't connected.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Cart } from "@/lib/shopify/types";

export function CheckoutButton({ cart }: { cart: Cart }) {
  const canCheckout = Boolean(cart.checkoutUrl);

  if (!canCheckout) {
    return (
      <div className="space-y-2">
        <Button disabled className="w-full">
          Checkout
        </Button>
        <p className="text-center text-xs text-fg-3">
          Connect a Shopify store to enable secure checkout.
        </p>
      </div>
    );
  }

  return (
    <Button asChild className="w-full">
      {/* Shopify-hosted checkout — never a custom checkout. */}
      <a href={cart.checkoutUrl}>
        Checkout <ArrowRight className="size-4" strokeWidth={1.5} />
      </a>
    </Button>
  );
}

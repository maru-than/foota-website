"use server";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartLine,
} from "@/lib/shopify/cart";
import type { Cart } from "@/lib/shopify/types";

/**
 * Server actions for cart mutations. Each returns the fresh, normalized cart
 * so the client provider can reconcile optimistic state. Cookie writes (cart
 * id persistence) happen inside the cart data layer, which is legal here
 * because these run as Server Actions.
 */

export async function addItemAction(
  merchandiseId: string,
  quantity = 1,
): Promise<Cart> {
  return addToCart(merchandiseId, quantity);
}

export async function updateItemAction(
  lineId: string,
  quantity: number,
): Promise<Cart> {
  return updateCartLine(lineId, quantity);
}

export async function removeItemAction(lineId: string): Promise<Cart> {
  return removeFromCart(lineId);
}

export async function getCartAction(): Promise<Cart | undefined> {
  return getCart();
}

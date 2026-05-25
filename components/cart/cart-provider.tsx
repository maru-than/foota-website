"use client";

import {
  createContext,
  useCallback,
  useContext,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import {
  addItemAction,
  removeItemAction,
  updateItemAction,
} from "@/app/actions/cart";
import type { Cart, CartLine, Product, ProductVariant } from "@/lib/shopify/types";

interface CartContextValue {
  cart: Cart | undefined;
  totalQuantity: number;
  isPending: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

type OptimisticAction =
  | { type: "add"; line: CartLine }
  | { type: "update"; lineId: string; quantity: number }
  | { type: "remove"; lineId: string };

function emptyCart(): Cart {
  const zero = { amount: "0.00", currencyCode: "CHF" };
  return {
    id: "",
    checkoutUrl: "",
    totalQuantity: 0,
    cost: { subtotalAmount: zero, totalAmount: zero, totalTaxAmount: null },
    lines: [],
  };
}

function recompute(cart: Cart): Cart {
  let quantity = 0;
  let subtotal = 0;
  let currency = cart.cost.subtotalAmount.currencyCode || "CHF";
  for (const line of cart.lines) {
    quantity += line.quantity;
    subtotal += Number.parseFloat(line.merchandise.price.amount) * line.quantity;
    currency = line.merchandise.price.currencyCode;
  }
  const money = { amount: subtotal.toFixed(2), currencyCode: currency };
  return {
    ...cart,
    totalQuantity: quantity,
    cost: { ...cart.cost, subtotalAmount: money, totalAmount: money },
  };
}

function makeOptimisticLine(
  product: Product,
  variant: ProductVariant,
  quantity: number,
): CartLine {
  const unit = Number.parseFloat(variant.price.amount);
  return {
    id: `optimistic-${variant.id}`,
    quantity,
    cost: {
      totalAmount: {
        amount: (unit * quantity).toFixed(2),
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      price: variant.price,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
        teamName: product.meta.teamName,
      },
    },
  };
}

function cartReducer(state: Cart | undefined, action: OptimisticAction): Cart {
  const base = state ?? emptyCart();
  switch (action.type) {
    case "add": {
      const lines = [...base.lines];
      const idx = lines.findIndex(
        (l) => l.merchandise.id === action.line.merchandise.id,
      );
      if (idx >= 0) {
        lines[idx] = {
          ...lines[idx],
          quantity: lines[idx].quantity + action.line.quantity,
        };
      } else {
        lines.push(action.line);
      }
      return recompute({ ...base, lines });
    }
    case "update": {
      const lines = base.lines
        .map((l) => (l.id === action.lineId ? { ...l, quantity: action.quantity } : l))
        .filter((l) => l.quantity > 0);
      return recompute({ ...base, lines });
    }
    case "remove": {
      const lines = base.lines.filter((l) => l.id !== action.lineId);
      return recompute({ ...base, lines });
    }
    default:
      return base;
  }
}

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | undefined;
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | undefined>(initialCart);
  const [optimisticCart, applyOptimistic] = useOptimistic(cart, cartReducer);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      setIsOpen(true);
      startTransition(async () => {
        applyOptimistic({
          type: "add",
          line: makeOptimisticLine(product, variant, quantity),
        });
        try {
          const updated = await addItemAction(variant.id, quantity);
          setCart(updated);
        } catch {
          // Optimistic state reverts automatically when the transition ends.
        }
      });
    },
    [applyOptimistic],
  );

  const updateItem = useCallback(
    (lineId: string, quantity: number) => {
      startTransition(async () => {
        applyOptimistic({ type: "update", lineId, quantity });
        try {
          const updated = await updateItemAction(lineId, quantity);
          setCart(updated);
        } catch {
          /* revert on transition end */
        }
      });
    },
    [applyOptimistic],
  );

  const removeItem = useCallback(
    (lineId: string) => {
      startTransition(async () => {
        applyOptimistic({ type: "remove", lineId });
        try {
          const updated = await removeItemAction(lineId);
          setCart(updated);
        } catch {
          /* revert on transition end */
        }
      });
    },
    [applyOptimistic],
  );

  const value: CartContextValue = {
    cart: optimisticCart,
    totalQuantity: optimisticCart?.totalQuantity ?? 0,
    isPending,
    isOpen,
    openCart,
    closeCart,
    setOpen: setIsOpen,
    addItem,
    updateItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

"use client";

/**
 * @file Customise state — name & number store, font lookup, price delta, gallery sync.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import {
  CUSTOM_PRICE_DELTA,
  customisationDelta,
  fontFor,
  hasCustomContent,
  sanitiseName,
  sanitiseNumber,
  type Customisation,
  type FontSpec,
} from "@/lib/customisation";
import type { Product } from "@/lib/shopify/types";

interface CustomiseState {
  enabled: boolean;
  name: string;
  number: string;
  /** True when this product supports name + number printing. */
  available: boolean;
  fontSpec: FontSpec;
  /** USD-numeric add-on, exposed for inline price math. */
  priceDelta: number;
  /** Per-confederation currency-typed Money object for the cart line. */
  customisation: Customisation | undefined;
  setEnabled: (next: boolean) => void;
  setName: (next: string) => void;
  setNumber: (next: string) => void;
  /** Apply a "template" pick (name + number) and enable customs. */
  applyTemplate: (name: string, number: string) => void;
  clear: () => void;
}

const CustomiseContext = createContext<CustomiseState | null>(null);

/**
 * Holds the buyer's name/number choices alongside the PDP. Lives outside the
 * buy box and gallery so both can subscribe — buy box writes, gallery reads
 * (live back-of-shirt preview). The provider also gates itself off products
 * that opt out (`meta.customisable === false`), so child components can read
 * `available` and quietly hide their UI.
 */
export function CustomiseProvider({
  product,
  currencyCode,
  children,
}: {
  product: Product;
  currencyCode?: string;
  children: React.ReactNode;
}) {
  const available = product.meta.customisable !== false;
  const fontSpec = useMemo(
    () => fontFor(product.meta.confederation),
    [product.meta.confederation],
  );

  // Allow deep links (?customise=open) from marketing surfaces to drop the
  // buyer straight into the personalisation flow. Read once at mount.
  const searchParams = useSearchParams();
  const [enabled, setEnabledRaw] = useState(
    () => available && searchParams?.get("customise") === "open",
  );
  const [name, setNameRaw] = useState("");
  const [number, setNumberRaw] = useState("");

  const setEnabled = useCallback(
    (next: boolean) => {
      if (!available) return;
      setEnabledRaw(next);
    },
    [available],
  );

  const setName = useCallback((next: string) => {
    setNameRaw(sanitiseName(next));
  }, []);

  const setNumber = useCallback((next: string) => {
    setNumberRaw(sanitiseNumber(next));
  }, []);

  const applyTemplate = useCallback(
    (rawName: string, rawNumber: string) => {
      if (!available) return;
      setEnabledRaw(true);
      setNameRaw(sanitiseName(rawName));
      setNumberRaw(sanitiseNumber(rawNumber));
    },
    [available],
  );

  const clear = useCallback(() => {
    setEnabledRaw(false);
    setNameRaw("");
    setNumberRaw("");
  }, []);

  const currency = currencyCode ?? product.priceRange.minVariantPrice.currencyCode;

  const customisation = useMemo<Customisation | undefined>(() => {
    if (!enabled) return undefined;
    const base: Customisation = {
      name: name || undefined,
      number: number || undefined,
      priceDelta: customisationDelta(currency),
    };
    return hasCustomContent(base) ? base : undefined;
  }, [enabled, name, number, currency]);

  const value: CustomiseState = {
    enabled,
    name,
    number,
    available,
    fontSpec,
    priceDelta: enabled ? CUSTOM_PRICE_DELTA : 0,
    customisation,
    setEnabled,
    setName,
    setNumber,
    applyTemplate,
    clear,
  };

  return (
    <CustomiseContext.Provider value={value}>{children}</CustomiseContext.Provider>
  );
}

export function useCustomise(): CustomiseState {
  const ctx = useContext(CustomiseContext);
  if (!ctx) {
    throw new Error("useCustomise must be used within a CustomiseProvider");
  }
  return ctx;
}

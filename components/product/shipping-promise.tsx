/**
 * @file Server component — reads geo cookie, shows country-specific shipping ETA and free-over threshold.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { cookies } from "next/headers";
import { Clock, Gift, MapPin, Truck } from "lucide-react";

import { COOKIE } from "@/lib/i18n/config";
import { getShippingPromise } from "@/lib/i18n/shipping";

/* Server component — reads the geo cookie set by proxy.ts and renders a
   per-country shipping line on the PDP. Falls back to the "Rest of world"
   zone when the cookie is missing (e.g. first paint before the proxy has
   responded, or local dev without geo headers). */
export async function ShippingPromise() {
  const cookieStore = await cookies();
  const country = cookieStore.get(COOKIE.country)?.value;
  const { countryLabel, etaDays, freeOverFormatted } = getShippingPromise(country);
  const [lo, hi] = etaDays;
  const eta = lo === hi ? `${lo} day${lo === 1 ? "" : "s"}` : `${lo}–${hi} days`;

  return (
    <div className="flex items-start gap-2.5 border border-border bg-card p-3 text-xs leading-snug text-foreground/80">
      <Truck className="size-4 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <MapPin className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
        <span className="font-bold text-foreground">{countryLabel}</span>
        <span aria-hidden className="text-muted-foreground">·</span>
        <Clock className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
        <span>tracked delivery in {eta}</span>
        <span aria-hidden className="text-muted-foreground">·</span>
        <Gift className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
        <span>free over {freeOverFormatted}</span>
      </p>
    </div>
  );
}

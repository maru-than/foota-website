import { cookies } from "next/headers";
import { Truck } from "lucide-react";

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
    <div className="flex items-start gap-2.5 border border-line-1 bg-bg-2 p-3 text-xs leading-snug text-fg-2">
      <Truck className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
      <p>
        <span className="font-bold text-fg-1">{countryLabel}</span> · tracked
        delivery in {eta} · free over {freeOverFormatted}
      </p>
    </div>
  );
}

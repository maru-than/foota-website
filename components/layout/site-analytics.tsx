"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useSyncExternalStore } from "react";

import { onConsentChange, readConsent } from "@/lib/cookie-consent";

/**
 * Vercel Analytics + Speed Insights, gated on the cookie banner.
 *
 * Vercel's offerings are cookieless and don't collect PII, so they're
 * generally exempt from the strict consent regimes — but we honour the
 * user's "Reject optional" choice anyway. Behaviour:
 *
 *   accepted  → load Analytics + Speed Insights in production
 *   null      → no choice yet; analytics held back until the banner is
 *               answered. Avoids events from the very first page paint
 *               getting attributed before the visitor opted in.
 *   rejected  → never load
 *
 * useSyncExternalStore subscribes to the consent store cleanly — the
 * server snapshot is always null, so SSR renders nothing, and the client
 * hydrates to the stored value without an effect dance.
 *
 * Speed Insights touches useSearchParams under the hood, so we mount
 * under <Suspense> as required since Next 16.
 */
function SiteAnalyticsInner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  // Touch route signals so any future custom-event logic can re-fire on
  // route change without extra effect plumbing. Cheap reads.
  usePathname();
  useSearchParams();

  if (consent !== "accepted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

function subscribeToConsent(notify: () => void): () => void {
  return onConsentChange(() => notify());
}

function getConsentSnapshot(): "accepted" | "rejected" | null {
  return readConsent();
}

function getConsentServerSnapshot(): "accepted" | "rejected" | null {
  return null;
}

export function SiteAnalytics() {
  return (
    <Suspense fallback={null}>
      <SiteAnalyticsInner />
    </Suspense>
  );
}

/* Lightweight client-side cookie consent. No SaaS dependency.
 * Stored in localStorage so it survives reloads but doesn't leak across
 * browsers — typical for a v1 banner. Swap for Cookiebot / Iubenda when
 * compliance scope grows (multi-region rules, audit logs, granular IDs). */

export type CookieConsent = "accepted" | "rejected";

const KEY = "worldkit-cookie-consent";
const EVENT = "worldkit:cookie-consent-changed";

export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: CookieConsent): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, value);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
  } catch {
    /* private mode / quota — silently ignore, banner will re-show next visit */
  }
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: null }));
  } catch {
    /* noop */
  }
}

/** Subscribe to consent changes — fires when accept/reject/reset happens. */
export function onConsentChange(
  handler: (value: CookieConsent | null) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<CookieConsent | null>).detail ?? null;
    handler(detail);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

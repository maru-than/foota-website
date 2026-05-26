"use client";

/**
 * @file "Change preferences" button plus current consent-status label — lets users reset the banner.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  clearConsent,
  onConsentChange,
  readConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

/** Lets visitors re-open the consent banner from /cookies. */
export function CookieSettingsButton() {
  const [current, setCurrent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setCurrent(readConsent());
    return onConsentChange((value) => setCurrent(value));
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" size="sm" onClick={() => clearConsent()}>
        Change my preferences
      </Button>
      <span className="text-xs text-fg-3">
        {current === "accepted"
          ? "Current: all cookies accepted."
          : current === "rejected"
            ? "Current: optional cookies declined."
            : "No preference set — the banner will appear."}
      </span>
    </div>
  );
}

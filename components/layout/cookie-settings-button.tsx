"use client";

/**
 * @file "Change preferences" button plus current consent-status label — lets users reset the banner.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  clearConsent,
  readConsent,
  subscribeToConsent,
} from "@/lib/cookie-consent";

/** Lets visitors re-open the consent banner from /cookies. */
export function CookieSettingsButton() {
  const current = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    () => null,
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" size="sm" onClick={() => clearConsent()}>
        Change my preferences
      </Button>
      <span className="text-xs text-muted-foreground">
        {current === "accepted"
          ? "Current: all cookies accepted."
          : current === "rejected"
            ? "Current: optional cookies declined."
            : "No preference set — the banner will appear."}
      </span>
    </div>
  );
}

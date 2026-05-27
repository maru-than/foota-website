"use client";

/**
 * @file Dismissible consent banner — accept / reject buttons, reads & writes localStorage, hydration-safe.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  readConsent,
  subscribeToConsent,
  writeConsent,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  // useSyncExternalStore handles the SSR / client mismatch cleanly — server
  // renders the `null` snapshot, client subscribes to localStorage events.
  // Banner shows when no decision has been made yet.
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    () => null,
  );

  if (consent !== null) return null;

  const decide = (value: "accepted" | "rejected") => {
    writeConsent(value);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-5xl rounded-xl border border-border bg-background/95 shadow-lg shadow-black/20 backdrop-blur lg:inset-x-6 lg:bottom-6"
    >
      <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:gap-6 lg:px-6 lg:py-5">
        <div className="flex-1 text-sm leading-relaxed text-foreground/80">
          <p>
            We use strictly necessary cookies to run the store, and — with
            your permission — analytics cookies to understand how the site is
            used. Read our{" "}
            <Link href="/cookies" className="underline hover:text-primary">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => decide("rejected")}
          >
            Reject optional
          </Button>
          <Button size="sm" onClick={() => decide("accepted")}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}

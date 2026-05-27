"use client";

/**
 * @file Email-input form with arrow-submit — client-side success state, no backend wired in MVP.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Newsletter capture. No backend by design — client-side success state.
 * Wire to Shopify / an ESP in production.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={cn("flex items-center gap-2 text-sm text-primary", className)}>
        <Check className="size-4" strokeWidth={1.5} />
        You&apos;re on the list. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex border border-border", className)}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@inbox.com"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-4 text-base text-foreground outline-none placeholder:text-muted-foreground/60 sm:text-sm"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex min-h-11 shrink-0 items-center justify-center bg-primary px-4 text-background transition-colors duration-150 ease-out hover:bg-primary/90"
      >
        <ArrowRight className="size-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}

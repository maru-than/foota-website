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
      <p className={cn("flex items-center gap-2 text-sm text-lime-400", className)}>
        <Check className="size-4" strokeWidth={1.5} />
        You&apos;re on the list. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex border border-lime-400/20", className)}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@inbox.com"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-4 text-base tracking-[-0.03em] text-foreground outline-none placeholder:text-muted-foreground/60 sm:text-sm"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex min-h-11 shrink-0 items-center justify-center bg-lime-400 px-4 text-background transition-colors duration-150 ease-worldkit hover:bg-lime-300"
      >
        <ArrowRight className="size-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}

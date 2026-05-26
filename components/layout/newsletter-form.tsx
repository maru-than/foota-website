"use client";

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
      <p className={cn("flex items-center gap-2 text-sm text-accent", className)}>
        <Check className="size-4" strokeWidth={1.5} />
        You&apos;re on the list. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex border border-line-accent", className)}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@inbox.com"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-4 text-base tracking-[-0.03em] text-fg-1 outline-none placeholder:text-fg-4 sm:text-sm"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex min-h-11 shrink-0 items-center justify-center bg-accent px-4 text-bg-1 transition-colors duration-150 ease-worldkit hover:bg-accent-hi"
      >
        <ArrowRight className="size-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}

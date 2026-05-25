"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Newsletter capture. No backend by design — shows a client-side success
 * state. Wire to Shopify / an ESP (Klaviyo, Mailchimp) in production.
 */
export function NewsletterForm({
  className,
  inputClassName,
}: {
  className?: string;
  inputClassName?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="flex items-center gap-2 text-sm text-grass">
        <Check className="size-4" />
        You&apos;re in the dressing room. Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex gap-2", className)}>
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className={inputClassName}
      />
      <Button type="submit" size="icon" aria-label="Subscribe" className="shrink-0">
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

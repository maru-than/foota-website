"use client";

/**
 * @file Contact form — name / email / subject / message inputs with a client-side success state.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-border bg-card p-10 text-center">
        <Check className="mx-auto size-7 text-primary" strokeWidth={1.5} />
        <p className="mt-4 text-2xl font-bold">Message sent.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out — we&apos;ll reply within 1–2 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-foreground/80">Name</span>
          <Input required name="name" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-foreground/80">Email</span>
          <Input required type="email" name="email" autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-foreground/80">Subject</span>
        <Input name="subject" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-foreground/80">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="flex w-full rounded-none border border-input bg-card px-4 py-3 text-base text-foreground transition-colors duration-150 ease-out placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:outline-none sm:text-sm"
        />
      </label>
      <Button type="submit">Send message</Button>
    </form>
  );
}

"use client";

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
      <div className="border border-line bg-paper p-10 text-center">
        <Check className="mx-auto size-7 text-grass" />
        <p className="mt-4 font-display text-2xl">Message sent.</p>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out — we&apos;ll reply within 1–2 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm">Name</span>
          <Input required name="name" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm">Email</span>
          <Input required type="email" name="email" autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm">Subject</span>
        <Input name="subject" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="flex w-full border border-line bg-paper px-4 py-3 text-sm text-ink transition-colors placeholder:text-muted/70 focus-visible:border-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        />
      </label>
      <Button type="submit" className="uppercase tracking-[0.12em]">
        Send message
      </Button>
    </form>
  );
}

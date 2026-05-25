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
      <div className="border border-line-accent bg-bg-2 p-10 text-center">
        <Check className="mx-auto size-7 text-accent" strokeWidth={1.5} />
        <p className="mt-4 text-2xl font-bold tracking-[-0.03em]">Message sent.</p>
        <p className="mt-2 text-sm text-fg-3">
          Thanks for reaching out — we&apos;ll reply within 1–2 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-fg-2">Name</span>
          <Input required name="name" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-fg-2">Email</span>
          <Input required type="email" name="email" autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-fg-2">Subject</span>
        <Input name="subject" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-fg-2">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="flex w-full rounded-none border border-line-2 bg-bg-2 px-4 py-3 text-sm tracking-[-0.03em] text-fg-1 transition-colors duration-150 ease-foota placeholder:text-fg-4 focus-visible:border-accent focus-visible:outline-none"
        />
      </label>
      <Button type="submit">Send message</Button>
    </form>
  );
}

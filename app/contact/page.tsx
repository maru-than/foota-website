/**
 * @file Contact page — form plus business details (email, hours, returns info).
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Worldkit Soccer team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        description="Questions about a shirt, an order or authenticity? We're happy to help."
        image="/pages/contact.png"
      />
      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <ContactForm />
          </div>
          <aside className="space-y-8 text-sm text-muted-foreground">
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-foreground">Email</h2>
              <p className="mt-2">hello@worldkitsoccer.com</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-foreground">Support hours</h2>
              <p className="mt-2">Monday – Friday, 9:00 – 17:00 CET</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-foreground">Returns</h2>
              <p className="mt-2">
                See shipping &amp; returns for our full policy before getting in
                touch about a return.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

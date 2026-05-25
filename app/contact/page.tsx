import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Foota Jerseys team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        description="Questions about a shirt, an order or authenticity? We're happy to help."
      />
      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <ContactForm />
          </div>
          <aside className="space-y-8 text-sm text-muted">
            <div>
              <h2 className="eyebrow text-ink">Email</h2>
              <p className="mt-2">hello@footajerseys.com</p>
            </div>
            <div>
              <h2 className="eyebrow text-ink">Support hours</h2>
              <p className="mt-2">Monday – Friday, 9:00 – 17:00 CET</p>
            </div>
            <div>
              <h2 className="eyebrow text-ink">Returns</h2>
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

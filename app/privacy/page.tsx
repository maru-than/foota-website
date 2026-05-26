import type { Metadata } from "next";
import Link from "next/link";

import { LegalDoc, LegalSection } from "@/components/info/legal-content";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Worldkit Soccer collects, uses and protects your personal data when you shop with us.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "May 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect your data."
      />
      <Container className="py-12 lg:py-16">
        <LegalDoc updated={UPDATED}>
          <LegalSection title="Who we are">
            <p>
              Worldkit Soccer (“we”, “us”) operates this store. If you contact
              us about your data, write to{" "}
              <a className="underline hover:text-accent" href="mailto:privacy@worldkit.example">
                privacy@worldkit.example
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="What we collect">
            <ul className="list-disc space-y-1 pl-5">
              <li>Order details — name, shipping address, items, totals.</li>
              <li>Contact details — email and (optional) phone.</li>
              <li>Payment metadata — last 4 digits, brand. Full card data goes directly to our payment processor; we never see or store it.</li>
              <li>Account credentials, if you create an account.</li>
              <li>Device and browsing data — IP, browser, pages viewed, referrer, cookies.</li>
              <li>Marketing preferences and any messages you send us.</li>
            </ul>
          </LegalSection>

          <LegalSection title="Why we use it">
            <ul className="list-disc space-y-1 pl-5">
              <li>To process and ship your order, and handle returns.</li>
              <li>To prevent fraud and secure the store.</li>
              <li>To send transactional email (order confirmation, dispatch, delivery).</li>
              <li>To send marketing email — only if you opt in. You can unsubscribe at any time.</li>
              <li>To improve the store via aggregate analytics.</li>
              <li>To comply with tax, customs and accounting law.</li>
            </ul>
          </LegalSection>

          <LegalSection title="Who we share it with">
            <p>
              We share only what each partner needs to do their job:
              payment processors (Stripe, PayPal, Klarna), shipping carriers,
              warehouse and fulfilment, email delivery (Klaviyo), analytics
              (GA4), and tax/accounting providers. We do not sell personal data.
            </p>
          </LegalSection>

          <LegalSection title="International transfers">
            <p>
              Our partners may process your data outside your country. Where
              required, transfers rely on Standard Contractual Clauses or an
              equivalent safeguard.
            </p>
          </LegalSection>

          <LegalSection title="How long we keep it">
            <p>
              Order records are kept as long as required by tax law (typically
              7–10 years). Marketing data is kept until you unsubscribe.
              Analytics cookies expire within 13 months.
            </p>
          </LegalSection>

          <LegalSection title="Your rights">
            <p>
              Depending on where you live, you can request access, correction,
              deletion, portability, or object to certain processing. To
              exercise these, email{" "}
              <a className="underline hover:text-accent" href="mailto:privacy@worldkit.example">
                privacy@worldkit.example
              </a>{" "}
              from the address on your order. We respond within 30 days.
            </p>
          </LegalSection>

          <LegalSection title="Cookies">
            <p>
              We use strictly necessary cookies to run the store (cart, login,
              fraud checks), and — with your consent — analytics cookies to
              understand how the site is used. Read more in our{" "}
              <Link href="/cookies" className="underline hover:text-accent">
                Cookie Policy
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection title="Changes to this policy">
            <p>
              We may update this policy as the business evolves. The date at
              the top reflects the most recent change. Material changes will be
              highlighted on the site.
            </p>
          </LegalSection>
        </LegalDoc>
      </Container>
    </>
  );
}

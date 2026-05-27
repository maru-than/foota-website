/**
 * @file Terms of service — order agreement, pricing, payment processing, shipping policy, dispute terms.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-26
 */

import type { Metadata } from "next";
import Link from "next/link";

import { LegalDoc, LegalSection } from "@/components/info/legal-content";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Worldkit Soccer and any purchase you make from us.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "May 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that govern your use of the store."
      />
      <Container className="py-12 lg:py-16">
        <LegalDoc updated={UPDATED}>
          <LegalSection title="Agreement">
            <p>
              By browsing or buying from Worldkit Soccer you agree to these
              terms. If you don’t agree, please don’t use the site.
            </p>
          </LegalSection>

          <LegalSection title="Orders & acceptance">
            <p>
              Placing an order is an offer to buy. The contract forms when we
              dispatch the item — not when you click pay. We may decline an
              order (limited stock, suspected fraud, shipping restrictions) and
              will refund any payment taken.
            </p>
          </LegalSection>

          <LegalSection title="Pricing & payment">
            <p>
              Prices are in USD unless stated. We may correct pricing errors
              before an order ships and offer you the choice to confirm or
              cancel. Payment is processed by our payment partners; we never
              see your full card details.
            </p>
          </LegalSection>

          <LegalSection title="Shipping">
            <p>
              We dispatch worldwide within 48 hours of payment, tracking
              included. Delivery windows vary by destination — see{" "}
              <Link href="/shipping-returns" className="underline hover:text-primary">
                Shipping & Returns
              </Link>
              . Risk transfers to you on delivery.
            </p>
          </LegalSection>

          <LegalSection title="Returns & refunds">
            <p>
              Unworn, unwashed jerseys can be returned within 30 days of
              delivery. Personalised items (player name / number) are
              non-returnable. Refunds are issued to the original payment method
              within 10 business days of us receiving the return.
            </p>
          </LegalSection>

          <LegalSection title="Authenticity">
            <p>
              We sell only what we inspect. If you receive an item that doesn’t
              match its listing, contact us within 7 days and we’ll make it
              right. See{" "}
              <Link href="/authenticity" className="underline hover:text-primary">
                Authenticity
              </Link>{" "}
              for the inspection process.
            </p>
          </LegalSection>

          <LegalSection title="Acceptable use">
            <p>
              Don’t scrape, resell access to, or otherwise abuse the site. We
              may suspend accounts and cancel orders that breach these terms.
            </p>
          </LegalSection>

          <LegalSection title="Intellectual property">
            <p>
              All site content — text, photography, layout — is owned by
              Worldkit Soccer or its licensors. Team marks belong to their
              respective associations. Don’t reuse our content without written
              permission.
            </p>
          </LegalSection>

          <LegalSection title="Liability">
            <p>
              To the extent allowed by law, our liability for any claim
              relating to an order is limited to the amount you paid for that
              order. Nothing here limits liability that cannot be limited by
              law (e.g. death or personal injury caused by negligence).
            </p>
          </LegalSection>

          <LegalSection title="Governing law">
            <p>
              These terms are governed by the laws of your billing country
              unless a mandatory consumer law in your country says otherwise.
              Disputes go first through our support team and then through the
              courts of your residence.
            </p>
          </LegalSection>

          <LegalSection title="Contact">
            <p>
              Questions about these terms? Email{" "}
              <a className="underline hover:text-primary" href="mailto:hello@worldkit.example">
                hello@worldkit.example
              </a>
              .
            </p>
          </LegalSection>
        </LegalDoc>
      </Container>
    </>
  );
}

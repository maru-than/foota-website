import type { Metadata } from "next";

import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { LegalDoc, LegalSection } from "@/components/info/legal-content";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Worldkit Soccer uses cookies and similar technologies, and how to change your preferences.",
  alternates: { canonical: "/cookies" },
};

const UPDATED = "May 2026";

const CATEGORIES = [
  {
    name: "Strictly necessary",
    optional: false,
    purpose:
      "Run the store — cart contents, login session, fraud and abuse checks. The site can’t function without these.",
  },
  {
    name: "Analytics",
    optional: true,
    purpose:
      "Aggregated, anonymised stats about which pages are visited and how the site performs. Helps us improve the store.",
  },
  {
    name: "Marketing",
    optional: true,
    purpose:
      "Measure the performance of ads we run and reach people who’ve visited the store before. Set by ad partners (Meta, TikTok, Google) only with your consent.",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Cookie Policy"
        description="What cookies we set, why, and how to change your mind."
      />
      <Container className="py-12 lg:py-16">
        <LegalDoc updated={UPDATED}>
          <LegalSection title="What cookies are">
            <p>
              Cookies are small text files stored by your browser. We use them
              to keep your cart, recognise you on return visits, and — only
              with your consent — measure how the site is used.
            </p>
          </LegalSection>

          <LegalSection title="Categories we use">
            <div className="grid gap-3 sm:grid-cols-3">
              {CATEGORIES.map((c) => (
                <div
                  key={c.name}
                  className="border border-line-accent bg-bg-2 p-4"
                >
                  <h3 className="eyebrow text-accent">{c.name}</h3>
                  <p className="mt-2 text-sm">{c.purpose}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.1em] text-fg-3">
                    {c.optional ? "Optional" : "Always on"}
                  </p>
                </div>
              ))}
            </div>
          </LegalSection>

          <LegalSection title="Manage your preferences">
            <p>
              You consented (or declined) when you first visited. You can
              change your mind any time — your choice is stored locally on
              your device.
            </p>
            <CookieSettingsButton />
          </LegalSection>

          <LegalSection title="Browser controls">
            <p>
              Most browsers let you block or delete cookies from their privacy
              settings. Blocking strictly-necessary cookies will break parts of
              the store (cart, checkout, login).
            </p>
          </LegalSection>
        </LegalDoc>
      </Container>
    </>
  );
}

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { FOOTER_NAV } from "@/lib/navigation";
import { NewsletterForm } from "./newsletter-form";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "TikTok", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" className="font-display text-2xl tracking-tight">
              Foota Jerseys
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A curated home for authentic, retro and iconic football shirts —
              from clubs and nations around the world.
            </p>

            <p className="eyebrow mt-8 text-grass">Newsletter</p>
            <p className="mt-2 text-sm text-muted">
              New drops, rare finds and jersey stories.
            </p>
            <NewsletterForm className="mt-3 max-w-xs" inputClassName="bg-bone" />

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_NAV.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="eyebrow text-ink">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>© {year} Foota Jerseys. A home for jerseys.</p>
          <p>Secure checkout powered by Shopify.</p>
        </Container>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Globe } from "lucide-react";

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
    <footer className="border-t border-line-accent bg-bg-1">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.5fr_2fr] lg:gap-16">
        <div className="max-w-sm">
          <Link
            href="/"
            className="display block text-5xl text-accent sm:text-6xl"
          >
            Foota
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-fg-2">
            A home for jerseys. Official 2026 FIFA World Cup home shirts — every
            nation, dispatched worldwide.
          </p>

          <div className="mt-8">
            <span className="eyebrow text-fg-3">Get the drop</span>
            <NewsletterForm className="mt-3 max-w-xs" />
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs uppercase tracking-[0.12em] text-fg-3 transition-colors hover:text-accent"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow text-fg-3">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-2 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="border-t border-line-1">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-[11px] uppercase tracking-[0.12em] text-fg-3 sm:flex-row">
          <span>© {year} Foota Jerseys</span>
          <span className="hidden sm:block">A home for jerseys · Dispatched worldwide</span>
          <span className="inline-flex items-center gap-2 text-fg-1">
            <Globe className="size-3.5" strokeWidth={1.5} /> EN · CHF
          </span>
        </Container>
      </div>
    </footer>
  );
}

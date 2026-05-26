/**
 * @file Site footer — logo, brand statement, social links, multi-column nav, year auto-update.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

import { Container } from "@/components/ui/container";
import { FOOTER_NAV } from "@/lib/navigation";

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
          <Link href="/" aria-label="Worldkit Soccer — home" className="inline-block">
            <Image
              src="/logo.png"
              alt="Worldkit Soccer"
              width={240}
              height={240}
              className="h-20 w-auto sm:h-24"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-fg-2">
            A home for jerseys. 2026 international home shirts — every nation,
            dispatched worldwide.
          </p>

          {/* py-2.5 on each anchor grows the touch row to ≥44 px without
              widening the visual gap. -my-2.5 absorbs the leading edge so the
              cluster sits where it used to. */}
          <div className="mt-7 -my-2.5 flex flex-wrap gap-x-5">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="block py-3.5 text-xs uppercase tracking-[0.12em] text-fg-3 transition-colors hover:text-accent"
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
              {/* Per-link py-2.5 makes each row ≥44 px tappable; the prior
                  space-y-2.5 is no longer needed because the padding provides
                  the same visual rhythm. */}
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3 text-sm text-fg-2 transition-colors hover:text-accent"
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
          <span>© {year} Worldkit Soccer</span>
          <span className="hidden sm:block">A home for jerseys · Dispatched worldwide</span>
          <span className="inline-flex items-center gap-2 text-fg-1">
            <Globe className="size-3.5" strokeWidth={1.5} /> EN · USD
          </span>
        </Container>
      </div>
    </footer>
  );
}

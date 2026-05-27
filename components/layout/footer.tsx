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
    <footer className="border-t border-border bg-background">
      <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:py-28">
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
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">
            A home for jerseys. 2026 World Cup home & away kits — every nation,
            dispatched worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{column.title}</h3>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3 text-sm text-foreground/80 transition-colors hover:text-foreground"
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

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-[11px] uppercase tracking-wide text-muted-foreground sm:flex-row">
          <span>© {year} Worldkit Soccer</span>
          <div className="flex flex-wrap items-center gap-x-5">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 text-foreground">
            <Globe className="size-3.5" strokeWidth={1.5} /> EN · USD
          </span>
        </Container>
      </div>
    </footer>
  );
}

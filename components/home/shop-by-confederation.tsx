/**
 * @file Six-confederation cell grid linking to regional filters, with abbreviation and full name.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MOCK_CONFEDERATIONS } from "@/lib/mock-data";

export function ShopByConfederation() {
  return (
    <section className="border-t border-border py-16 lg:py-20">
      <Container>
        <div>
          <SectionHeading
            eyebrow="By confederation"
            title="Shop by region"
            description="Six confederations, 48 nations, one summer."
            action={{ label: "All nations", href: "/shop" }}
          />
        </div>
        <div className="mt-10">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {MOCK_CONFEDERATIONS.map((c) => (
              <li key={c.handle}>
                <Link
                  href={`/collections/${c.handle}`}
                  /* min-h keeps the 2-col mobile rows even when one label
                     wraps to 2 lines ("N. & C. America") and others don't. */
                  className="group flex min-h-[96px] flex-col items-center justify-center gap-2 border border-border bg-card p-5 text-center transition-[transform,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-muted"
                >
                  <span
                    aria-hidden
                    className="text-base font-bold text-primary"
                  >
                    {c.abbr}
                  </span>
                  <span className="text-sm font-semibold leading-tight text-foreground">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

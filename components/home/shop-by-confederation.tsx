import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MOCK_CONFEDERATIONS } from "@/lib/mock-data";

export function ShopByConfederation() {
  return (
    <section className="border-t border-line-1 py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="By confederation"
            title="Shop by region"
            description="Six confederations, 48 nations, one World Cup."
            action={{ label: "All nations", href: "/shop" }}
          />
        </Reveal>
        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {MOCK_CONFEDERATIONS.map((c) => (
              <li key={c.handle}>
                <Link
                  href={`/collections/${c.handle}`}
                  className="group flex flex-col items-center gap-2 border border-line-accent bg-bg-2 p-5 text-center transition-[transform,background-color] duration-300 ease-foota hover:-translate-y-1 hover:bg-bg-3"
                >
                  <span
                    aria-hidden
                    className="text-base font-bold tracking-[0.02em] text-accent"
                  >
                    {c.abbr}
                  </span>
                  <span className="text-sm font-semibold leading-tight text-fg-1">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

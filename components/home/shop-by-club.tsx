import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export function ShopByClub({ clubs }: { clubs: string[] }) {
  if (clubs.length === 0) return null;

  return (
    <section className="border-t border-line py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="By club"
            title="Shop by club"
            description="From San Siro to the Emirates — find the badge you grew up with."
            action={{ label: "All clubs", href: "/collections/club-jerseys" }}
          />
        </Reveal>
        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
              <li key={club}>
                <Link
                  href={`/shop?club=${encodeURIComponent(club)}`}
                  className="group flex items-center gap-4 border border-line bg-paper p-4 transition-colors hover:border-ink"
                >
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-bone font-display text-sm text-grass transition-colors group-hover:border-grass"
                  >
                    {initials(club)}
                  </span>
                  <span className="text-sm font-medium leading-snug text-ink">
                    {club}
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

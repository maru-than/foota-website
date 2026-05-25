import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function EditorialBanner() {
  return (
    <section className="bg-pine text-bone">
      <Container className="grid gap-8 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <Reveal>
          <span className="eyebrow text-bone/60">The Foota view</span>
          <h2 className="mt-4 text-balance text-4xl leading-[1.02] sm:text-5xl">
            More than a shirt.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4 text-pretty leading-relaxed text-bone/80">
            <p>
              A jersey is a memory you can wear. The night your club lifted the
              cup, the summer a nation believed, the player whose name you wore
              before you understood why.
            </p>
            <p>
              Every shirt in the archive carries a season, a city and a story —
              chosen for the moments they belonged to, not just the badge on the
              chest.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

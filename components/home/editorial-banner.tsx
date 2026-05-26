import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function EditorialBanner() {
  return (
    <section className="border-y border-line-accent bg-bg-2">
      <Container className="grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
        <Reveal>
          <span className="eyebrow text-accent">The Worldkit view</span>
          <h2 className="display mt-4 text-4xl leading-[1.02] sm:text-5xl">
            More than a shirt<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4 text-pretty leading-relaxed text-fg-2">
            <p>
              A jersey is a summer you can wear. The nation you back for a month,
              the shirt you pull on for every kickoff, the badge you defend in
              the group of death.
            </p>
            <p>
              Forty-eight nations. Sixteen cities. One tournament across the USA,
              Canada and Mexico — and a shirt for every side of it.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

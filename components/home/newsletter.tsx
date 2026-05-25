import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Reveal } from "@/components/ui/reveal";

export function Newsletter() {
  return (
    <section className="border-t border-line bg-paper py-20 lg:py-24">
      <Container>
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="eyebrow text-grass">Newsletter</span>
          <h2 className="mt-4 text-balance text-4xl leading-tight sm:text-5xl">
            Join the dressing room
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Get first access to new drops, rare finds and jersey stories.
          </p>
          <NewsletterForm className="mt-7 w-full max-w-md" inputClassName="bg-bone" />
        </Reveal>
      </Container>
    </section>
  );
}

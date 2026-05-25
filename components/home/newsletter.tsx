import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Reveal } from "@/components/ui/reveal";

export function Newsletter() {
  return (
    <section className="border-t border-line-accent bg-bg-2 py-16 lg:py-20">
      <Container>
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="eyebrow text-accent">Newsletter</span>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
            Join the dressing room
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-fg-2">
            First access to new drops, restocks and World Cup 2026 stories.
          </p>
          <NewsletterForm className="mt-7 w-full max-w-md" />
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * @file Newsletter CTA section — eyebrow, headline, description and the inline email form.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Reveal } from "@/components/ui/reveal";

export function Newsletter() {
  return (
    <section className="border-t border-lime-400/20 bg-card py-16 lg:py-20">
      <Container>
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="eyebrow text-lime-400">Newsletter</span>
          <h2 className="display mt-4 text-4xl leading-tight sm:text-5xl">
            Join the dressing room
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-foreground/80">
            First access to new drops, restocks and summer 2026 stories.
          </p>
          <NewsletterForm className="mt-7 w-full max-w-md" />
        </Reveal>
      </Container>
    </section>
  );
}

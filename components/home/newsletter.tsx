/**
 * @file Newsletter CTA section — eyebrow, headline, description and the inline email form.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function Newsletter() {
  return (
    <section className="border-t border-border bg-card py-24 lg:py-40">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="text-xs text-muted-foreground">
            Newsletter
          </span>
          <h2 className="font-display mt-4 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Join the dressing room
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-foreground/80">
            First access to new drops, restocks and summer 2026 stories.
          </p>
          <NewsletterForm className="mt-7 w-full max-w-md" />
        </div>
      </Container>
    </section>
  );
}

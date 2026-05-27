/**
 * @file Editorial hero strip — brand narrative about jerseys as cultural artifacts with a customise CTA.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";

export function EditorialBanner() {
  return (
    <section className="border-y border-border bg-card">
      <Container className="grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
        <div>
          <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            The Worldkit view
          </span>
          <h2 className="font-display mt-4 text-4xl leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
            More than a shirt<span className="text-primary">.</span>
          </h2>
        </div>
        <div>
          <div className="space-y-4 text-pretty leading-relaxed text-foreground/80">
            <p>
              A jersey is a summer you can wear. The nation you back for a month,
              the shirt you pull on for every kickoff, the badge you defend in
              the group of death — and the name on the back is yours.
            </p>
            <p>
              Forty-eight nations. Sixteen cities. One tournament across the USA,
              Canada and Mexico — and a shirt for every side of it.
            </p>
            <Link
              href="/customise"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80"
            >
              Create your own
              <ArrowRight
                className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

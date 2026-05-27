/**
 * @file Full-width hero section — optional bg photo, gradient legibility scrim, eyebrow / title / description.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import Image from "next/image";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  image,
  imagePosition = "center",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Optional cinematic background photo. Rendered behind a dark gradient for legibility. */
  image?: string;
  /** Tailwind object-position value for the bg photo, e.g. "center", "center 70%". */
  imagePosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-lime-400/20",
        image ? "bg-background" : "bg-card",
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          {/* Legibility scrim — darker at the bottom where copy sits. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-0/90 via-bg-0/60 to-bg-0/20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-0/80 to-transparent"
          />
        </>
      ) : null}
      <Container
        className={cn(
          "relative py-16 lg:py-24",
          align === "center" && "text-center",
        )}
      >
        {eyebrow ? <span className="eyebrow text-lime-400">{eyebrow}</span> : null}
        <h1 className="display mt-3 text-balance text-4xl leading-[1.02] sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-2xl text-pretty leading-relaxed text-foreground/80",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

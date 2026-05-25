"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrapper. Adds the `.reveal` class (defined in globals.css)
 * and toggles `data-revealed` once the element enters the viewport.
 * CSS-only animation — no JS animation library.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Path A: element already in view on mount? Reveal synchronously. Covers
       BFCache restore, hash-link landings, viewport resizes mid-load, and the
       WebKit case where IntersectionObserver skips an initial intersection it
       considers "stable". The intentional cascading render is the whole point. */
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setRevealed(true);
      return;
    }

    /* Path B: no IntersectionObserver (very old browser) — just show it. */
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reveal fallback
      setRevealed(true);
      return;
    }

    /* Path C: below-fold, watch for entry via IntersectionObserver. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    /* Watchdog — if the observer never fires (background tab throttling, browser
       quirk), force-reveal after 3s so content never stays invisible. */
    const watchdog = window.setTimeout(() => setRevealed(true), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(watchdog);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-revealed={revealed}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

"use client";

/**
 * @file Root error boundary — fallback UI on server/client errors with a reset button.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-24 text-center">
      <span className="text-xs text-destructive">Something went wrong</span>
      <h1 className="font-display text-4xl sm:text-5xl">
        A momentary stoppage.
      </h1>
      <p className="max-w-md text-pretty text-muted-foreground">
        We hit an unexpected error loading this page. Try again.
      </p>
      <Button onClick={() => reset()} className="mt-2">
        Try again
      </Button>
    </Container>
  );
}

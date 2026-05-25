import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-24 text-center">
      <span className="eyebrow text-grass">404</span>
      <h1 className="text-4xl sm:text-5xl">Off the pitch.</h1>
      <p className="max-w-md text-pretty text-muted">
        We couldn&apos;t find that page. The jersey you&apos;re after might be
        elsewhere in the archive.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Shop jerseys</Link>
        </Button>
      </div>
    </Container>
  );
}

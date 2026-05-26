import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import type { SearchParamsRecord } from "@/lib/filters";
import { searchProducts } from "@/lib/shopify/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Worldkit Soccer archive by club, nation, season or shirt name.",
  alternates: { canonical: "/search" },
};

const SUGGESTIONS = ["Brazil", "Argentina", "Morocco", "Japan", "USA"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : (sp.q ?? "")).trim();
  const results = q ? await searchProducts(q) : [];

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search the archive"}
        description={
          q
            ? `${results.length} ${results.length === 1 ? "jersey" : "jerseys"} found.`
            : "Find jerseys by club, nation, season or shirt name."
        }
      >
        <form action="/search" className="mt-6 flex max-w-md gap-2">
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search jerseys…"
            aria-label="Search jerseys"
          />
          <Button type="submit" className="shrink-0">
            Search
          </Button>
        </form>
      </PageHeader>

      <Container className="py-12 lg:py-16">
        {!q ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-fg-3">Try:</span>
            {SUGGESTIONS.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="border border-line-accent bg-bg-2 px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
              >
                {term}
              </Link>
            ))}
          </div>
        ) : results.length > 0 ? (
          <ProductGrid products={results} priorityCount={4} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-2xl font-bold tracking-[-0.03em]">
              No jerseys match “{q}”.
            </p>
            <p className="max-w-md text-sm text-fg-3">
              Try a club, a nation or a season — or browse the full archive.
            </p>
            <Button asChild variant="secondary">
              <Link href="/shop">Browse all jerseys</Link>
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}

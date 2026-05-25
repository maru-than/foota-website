"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { Price } from "@/components/ui/price";
import { searchAction } from "@/app/actions/search";
import type { Product } from "@/lib/shopify/types";

export function SearchOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(next: boolean) {
    if (!next) {
      setQuery("");
      setResults([]);
    }
    onOpenChange(next);
  }

  useEffect(() => {
    const term = query.trim();
    const timer = setTimeout(
      () => {
        if (term.length < 2) {
          setResults([]);
          return;
        }
        startTransition(async () => {
          setResults(await searchAction(term));
        });
      },
      term.length < 2 ? 0 : 250,
    );
    return () => clearTimeout(timer);
  }, [query]);

  function goToResults(e: React.FormEvent | React.MouseEvent) {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    handleOpenChange(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  const showEmpty =
    query.trim().length >= 2 && results.length === 0 && !isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="top-[12vh] max-w-2xl translate-y-0 p-0"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        hideClose
      >
        <DialogTitle className="sr-only">Search jerseys</DialogTitle>
        <DialogDescription className="sr-only">
          Search the archive by club, nation, season or shirt name.
        </DialogDescription>

        <form
          onSubmit={goToResults}
          className="flex items-center gap-3 border-b border-line px-5"
        >
          <SearchIcon className="size-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clubs, nations, seasons…"
            className="h-14 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted/70"
          />
        </form>

        <div className="max-h-[52vh] overflow-y-auto">
          {showEmpty ? (
            <p className="px-5 py-8 text-center text-sm text-muted">
              No jerseys match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : null}

          {results.length > 0 ? (
            <>
              <ul className="divide-y divide-line">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.handle}`}
                      onClick={() => handleOpenChange(false)}
                      className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-ink/[0.03]"
                    >
                      <div className="relative aspect-[4/5] w-11 shrink-0 overflow-hidden border border-line bg-paper">
                        {p.featuredImage ? (
                          <Image
                            src={p.featuredImage.url}
                            alt={p.featuredImage.altText}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <JerseyPlaceholder />
                        )}
                      </div>
                      <div className="flex-1">
                        {p.meta.teamName ? (
                          <span className="text-[11px] uppercase tracking-[0.1em] text-muted">
                            {p.meta.teamName}
                          </span>
                        ) : null}
                        <p className="text-sm text-ink">{p.title}</p>
                      </div>
                      <Price
                        amount={p.priceRange.minVariantPrice.amount}
                        currencyCode={p.priceRange.minVariantPrice.currencyCode}
                        className="text-sm text-muted"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToResults}
                className="block w-full border-t border-line px-5 py-3 text-left text-xs uppercase tracking-[0.12em] text-grass transition-colors hover:bg-ink/[0.03]"
              >
                View all results
              </button>
            </>
          ) : null}

          {query.trim().length < 2 ? (
            <p className="px-5 py-8 text-center text-sm text-muted">
              Try a club, a nation or a season — &ldquo;Milan&rdquo;,
              &ldquo;Brazil&rdquo;, &ldquo;1998&rdquo;.
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

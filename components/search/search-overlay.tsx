"use client";

/**
 * @file Search modal — full-screen on mobile, centered card on desktop; debounced server action, suggestion chips, product rows.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { JerseyPlaceholder } from "@/components/ui/jersey-placeholder";
import { cn, formatPrice } from "@/lib/utils";
import { searchAction } from "@/app/actions/search";
import type { Product } from "@/lib/shopify/types";

/** Empty-state quick picks — tap to populate the query. */
const SUGGESTIONS = ["Brazil", "Argentina", "Morocco", "England"];

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

  function pick(term: string) {
    setQuery(term);
    inputRef.current?.focus();
  }

  const showEmpty = query.trim().length >= 2 && results.length === 0 && !isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="flex flex-col gap-0 overflow-hidden p-0 inset-0 top-0 left-0 h-dvh w-screen max-h-none max-w-none translate-x-0 translate-y-0 rounded-none sm:inset-auto sm:top-[12vh] sm:left-1/2 sm:h-auto sm:max-h-[76vh] sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:translate-y-0 sm:rounded-xl"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Search jerseys</DialogTitle>
        <DialogDescription className="sr-only">
          Search World Cup 2026 jerseys by nation.
        </DialogDescription>

        <form
          onSubmit={goToResults}
          className="flex shrink-0 items-center gap-3 border-b border-border pl-5 pr-2 pt-[env(safe-area-inset-top)] sm:pt-0"
        >
          <SearchIcon className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search nations…"
            className="h-16 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/60 sm:h-14"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:text-primary"
          >
            Cancel
          </button>
        </form>

        <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          {showEmpty ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No jerseys match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : null}

          {results.length > 0 ? (
            <>
              <ul className="divide-y divide-line-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.handle}`}
                      onClick={() => handleOpenChange(false)}
                      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted"
                    >
                      <div
                        className={cn(
                          "relative aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-md",
                          p.featuredImage ? "bg-white" : "bg-muted",
                        )}
                      >
                        {p.featuredImage ? (
                          <Image
                            src={p.featuredImage.url}
                            alt={p.featuredImage.altText}
                            fill
                            sizes="56px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <JerseyPlaceholder label={p.meta.teamName ?? undefined} className="p-1.5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        {p.meta.teamName ? (
                          <span className="text-xs text-primary">
                            {p.meta.teamName}
                          </span>
                        ) : null}
                        <p className="truncate text-base text-foreground">{p.title}</p>
                      </div>
                      <span className="shrink-0 text-sm tabular-nums text-foreground">
                        {formatPrice(
                          p.priceRange.minVariantPrice.amount,
                          p.priceRange.minVariantPrice.currencyCode,
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToResults}
                className="block w-full border-t border-border px-5 py-4 text-left text-sm text-primary transition-colors hover:bg-muted"
              >
                View all results
              </button>
            </>
          ) : null}

          {query.trim().length < 2 ? (
            <div className="px-5 py-8">
              <p className="text-xs text-muted-foreground">Popular nations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => pick(s)}
                    className="rounded-full border border-border px-3.5 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

#!/usr/bin/env bash
# Sweep class-level foota decoration that no longer has CSS backing,
# replacing each with stock shadcn semantics or Tailwind primitives.
#
# Run once on every .tsx in app/ + components/. Idempotent.

set -euo pipefail

while IFS= read -r f; do
  perl -i -pe '
    # Lime color decoration → shadcn semantics
    s|text-lime-400|text-primary|g;
    s|text-lime-300|text-primary|g;
    s|text-lime-500|text-primary|g;
    s|hover:text-lime-300|hover:text-primary/80|g;
    s|hover:text-lime-400|hover:text-primary|g;
    s|focus-visible:text-lime-300|focus-visible:text-primary/80|g;
    s|focus-visible:text-lime-400|focus-visible:text-primary|g;

    s|border-lime-400/20|border-border|g;
    s|border-lime-400/12|border-border|g;
    s|border-lime-400/40|border-border|g;
    s|hover:border-lime-400|hover:border-primary|g;
    s|hover:border-lime-300|hover:border-primary|g;
    s|focus-visible:border-lime-400|focus-visible:border-primary|g;
    s|focus-visible:border-lime-300|focus-visible:border-primary|g;
    s|border-lime-400|border-primary|g;

    s|bg-lime-400/12|bg-accent|g;
    s|bg-lime-400/20|bg-accent|g;
    s|bg-lime-400/40|bg-muted|g;
    s|hover:bg-lime-400/12|hover:bg-accent|g;
    s|hover:bg-lime-400/20|hover:bg-accent|g;
    s|hover:bg-lime-300|hover:bg-primary/90|g;
    s|hover:bg-lime-400|hover:bg-primary|g;
    s|active:bg-lime-500|active:bg-primary/80|g;
    s|bg-lime-300|bg-primary|g;
    s|bg-lime-400|bg-primary|g;
    s|bg-lime-500|bg-primary/80|g;

    s|ring-lime-400|ring-primary|g;
    s|ring-lime-300|ring-primary|g;

    # Custom motion → stock transitions
    s|ease-worldkit|ease-out|g;

    # Drop project utilities that no longer have CSS — only within class strings
    s|"jersey-frame "|"bg-muted "|g;
    s|"jersey-frame"|"bg-muted"|g;
    s| jersey-frame "|" |g;
    s| jersey-frame"|"|g;
    s| jersey-frame | |g;

    s|"grid-texture "|""|g;
    s|"grid-texture"|""|g;
    s| grid-texture "|" |g;
    s| grid-texture"|"|g;
    s| grid-texture | |g;

    s|"hero-grid-texture "|""|g;
    s|"hero-grid-texture"|""|g;
    s| hero-grid-texture "|" |g;
    s| hero-grid-texture"|"|g;
    s| hero-grid-texture | |g;

    s|"animate-ticker "|""|g;
    s|"animate-ticker"|""|g;
    s| animate-ticker | |g;
    s| animate-ticker"|"|g;

    s|"animate-pulse-dot "|""|g;
    s|"animate-pulse-dot"|""|g;
    s| animate-pulse-dot | |g;
    s| animate-pulse-dot"|"|g;

    # Eyebrow utility — replace with stock Tailwind classes
    s|"eyebrow "|"text-xs font-semibold tracking-wider uppercase text-muted-foreground "|g;
    s|"eyebrow"|"text-xs font-semibold tracking-wider uppercase text-muted-foreground"|g;
    s| eyebrow "|" "|g;
    s| eyebrow"|"|g;
    # NOTE: ` eyebrow ` (bare-spaces) intentionally NOT in this sweep —
    # the literal can appear as a JS identifier too (e.g. const eyebrow =).
    # Class-string occurrences are covered by the quoted patterns above.

    # Display utility (Gambarino is gone) → drop, stock h-tag styling applies
    s|"display "|""|g;
    s|"display"|""|g;
    s| display "|" "|g;
    s| display"|"|g;
    # Same care as for eyebrow — ` display ` bare-spaces would hit
    # `display: "flex"` (CSS-in-JS) and similar.

    # font-display utility (no longer defined) → font-sans (default)
    s|\bfont-display\b|font-sans|g;

    # Drop tight tracking customizations
    s| tracking-\[-0\.03em\]||g;
    s|tracking-\[-0\.03em\] ||g;
    s| tracking-\[-0\.05em\]||g;
    s|tracking-\[-0\.05em\] ||g;
    s| tracking-\[-0\.02em\]||g;
    s|tracking-\[-0\.02em\] ||g;
  ' "$f"
done < <(find app components -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "*/node_modules/*")

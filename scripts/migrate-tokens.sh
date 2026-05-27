#!/usr/bin/env bash
# Reusable foota → shadcn token migration for class names in .tsx files.
# Run with one or more files: ./scripts/migrate-tokens.sh path1 path2 …
#
# Token map (order-sensitive — accent-hi/lo/12/20/40 + line-accent before
# bare accent/line-1/etc.):
#
#   bg-accent-hi      → bg-lime-300
#   bg-accent-lo      → bg-lime-500
#   bg-accent-12/20/40→ bg-lime-400/12 etc.
#   text-accent-hi    → text-lime-300
#   border-line-accent→ border-lime-400/20
#   bg/text/border/ring-accent → *-lime-400
#   bg-bg-{0,1}       → bg-background
#   bg-bg-2           → bg-card
#   bg-bg-{3,4}       → bg-muted
#   text-bg-{0,1}     → text-background  (inverse)
#   text-fg-1         → text-foreground
#   text-fg-2         → text-foreground/80
#   text-fg-3         → text-muted-foreground
#   text-fg-4         → text-muted-foreground/60
#   border-line-1     → border-border
#   border-line-2     → border-input
#   border-line-3     → border-border
#   bg/text-danger    → bg/text-destructive

set -euo pipefail

for f in "$@"; do
  sed -i '' \
    -e 's/bg-accent-hi/bg-lime-300/g' \
    -e 's/bg-accent-lo/bg-lime-500/g' \
    -e 's|bg-accent-12|bg-lime-400/12|g' \
    -e 's|bg-accent-20|bg-lime-400/20|g' \
    -e 's|bg-accent-40|bg-lime-400/40|g' \
    -e 's/text-accent-hi/text-lime-300/g' \
    -e 's/text-accent-lo/text-lime-500/g' \
    -e 's|border-line-accent|border-lime-400/20|g' \
    -e 's/bg-accent\([^-a-zA-Z0-9]\)/bg-lime-400\1/g' \
    -e 's/bg-accent$/bg-lime-400/g' \
    -e 's/text-accent\([^-a-zA-Z0-9]\)/text-lime-400\1/g' \
    -e 's/text-accent$/text-lime-400/g' \
    -e 's/border-accent\([^-a-zA-Z0-9]\)/border-lime-400\1/g' \
    -e 's/border-accent$/border-lime-400/g' \
    -e 's/ring-accent\([^-a-zA-Z0-9]\)/ring-lime-400\1/g' \
    -e 's/ring-accent$/ring-lime-400/g' \
    -e 's/bg-bg-0/bg-background/g' \
    -e 's/bg-bg-1/bg-background/g' \
    -e 's/bg-bg-2/bg-card/g' \
    -e 's/bg-bg-3/bg-muted/g' \
    -e 's/bg-bg-4/bg-muted/g' \
    -e 's/text-bg-0/text-background/g' \
    -e 's/text-bg-1/text-background/g' \
    -e 's/text-fg-1/text-foreground/g' \
    -e 's|text-fg-2|text-foreground/80|g' \
    -e 's/text-fg-3/text-muted-foreground/g' \
    -e 's|text-fg-4|text-muted-foreground/60|g' \
    -e 's/border-line-1/border-border/g' \
    -e 's/border-line-2/border-input/g' \
    -e 's/border-line-3/border-border/g' \
    -e 's/bg-danger/bg-destructive/g' \
    -e 's/text-danger/text-destructive/g' \
    "$f"
done

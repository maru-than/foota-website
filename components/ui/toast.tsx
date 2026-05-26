"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

export interface ToastSpec {
  id: number;
  title: string;
  /** Optional action — renders as a right-aligned button inside the toast. */
  action?: { label: string; onClick: () => void };
  /** Auto-dismiss after this many ms. Default 3000. */
  durationMs?: number;
}

/**
 * Minimal toast, no external dep. Renders a fixed-position card at the bottom
 * of the screen on mobile / top-right on desktop with a spring slide-in via
 * `tw-animate-css`. The `key={toast.id}` re-mount triggers the entry animation
 * for every new toast.
 */
export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastSpec | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(onDismiss, toast.durationMs ?? 3000);
    return () => window.clearTimeout(id);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:animate-none sm:inset-x-auto sm:right-6 sm:top-6 sm:bottom-auto sm:justify-end sm:slide-in-from-right-4 sm:slide-in-from-bottom-0"
    >
      <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 border border-line-accent bg-bg-2 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <Check className="size-4 shrink-0 text-accent" strokeWidth={2} />
        <p className="min-w-0 flex-1 truncate text-sm tracking-[-0.02em] text-fg-1">
          {toast.title}
        </p>
        {toast.action ? (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              onDismiss();
            }}
            className="shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-accent transition-colors hover:text-accent-hi"
          >
            {toast.action.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}

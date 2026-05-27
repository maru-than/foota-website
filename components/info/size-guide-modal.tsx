"use client";

/**
 * @file Modal wrapper around the size-guide body — measurements and how-to-measure guidance.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SizeGuideContent } from "./size-guide-content";

export function SizeGuideModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85dvh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Size guide</DialogTitle>
          <DialogDescription>
            Use these measurements as a guide before picking your size.
          </DialogDescription>
        </DialogHeader>
        <SizeGuideContent />
      </DialogContent>
    </Dialog>
  );
}

"use client";

/**
 * @file Modal wrapper around the authenticity body — QC promise and stitching / crest / font verification.
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
import { AuthenticityContent } from "./authenticity-content";

export function AuthenticityModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85dvh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quality check</DialogTitle>
          <DialogDescription>
            Every 2026 shirt is inspected before it ships.
          </DialogDescription>
        </DialogHeader>
        <AuthenticityContent />
      </DialogContent>
    </Dialog>
  );
}

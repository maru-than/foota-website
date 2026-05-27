"use client";

/**
 * @file Modal wrapper around the shipping & returns body — delivery windows, return eligibility, logistics.
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
import { ShippingReturnsContent } from "./shipping-returns-content";

export function ShippingReturnsModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85dvh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shipping &amp; returns</DialogTitle>
          <DialogDescription>
            Getting your jersey, and what to do if it isn&apos;t quite right.
          </DialogDescription>
        </DialogHeader>
        <ShippingReturnsContent />
      </DialogContent>
    </Dialog>
  );
}

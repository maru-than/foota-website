"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { NavLink } from "@/lib/navigation";

export function MobileMenu({
  open,
  onOpenChange,
  links,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: NavLink[];
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className="border-b border-line/60 py-4 font-display text-xl transition-colors hover:text-grass"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-line px-6 py-6">
          <p className="eyebrow text-grass">Foota Jerseys</p>
          <p className="mt-2 font-display text-lg">A home for jerseys.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

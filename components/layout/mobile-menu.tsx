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
        <nav className="flex flex-col px-2 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className="border-b border-line-1 px-4 py-4 text-lg font-bold uppercase tracking-[-0.02em] text-fg-1 transition-colors duration-150 ease-foota hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-line-accent px-6 py-6">
          <p className="display text-2xl text-accent">Foota</p>
          <p className="mt-2 text-sm text-fg-2">A home for jerseys.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

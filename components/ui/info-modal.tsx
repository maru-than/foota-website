"use client";

/**
 * Responsive info modal. Bottom sheet on mobile, centered dialog on md+.
 * Built on @radix-ui/react-dialog with tw-animate-css. Token-aligned with
 * dialog.tsx and sheet.tsx but tuned for reference content (size guide,
 * shipping & returns, authenticity) — sticky header, scrollable body, no
 * forced max-width on mobile.
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const InfoModal = DialogPrimitive.Root;
const InfoModalTrigger = DialogPrimitive.Trigger;
const InfoModalClose = DialogPrimitive.Close;
const InfoModalPortal = DialogPrimitive.Portal;

const InfoModalOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-[4px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
InfoModalOverlay.displayName = "InfoModalOverlay";

const InfoModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <InfoModalPortal>
    <InfoModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // base
        "fixed z-50 flex flex-col bg-bg-1 border-line-accent ease-foota",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        // mobile: bottom sheet
        "inset-x-0 bottom-0 max-h-[88dvh] border-t",
        "max-md:data-[state=open]:slide-in-from-bottom max-md:data-[state=closed]:slide-out-to-bottom",
        // desktop: centered
        "md:inset-auto md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
        "md:w-full md:max-w-2xl md:max-h-[85dvh] md:border",
        "md:data-[state=open]:fade-in-0 md:data-[state=closed]:fade-out-0",
        "md:data-[state=open]:zoom-in-95 md:data-[state=closed]:zoom-out-95",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center text-fg-2 transition-colors hover:bg-bg-3 hover:text-fg-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <X className="size-5" strokeWidth={1.5} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </InfoModalPortal>
));
InfoModalContent.displayName = "InfoModalContent";

function InfoModalHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sticky top-0 z-[1] flex flex-col gap-1 border-b border-line-accent bg-bg-1 px-6 py-5 pr-14",
        className,
      )}
      {...props}
    />
  );
}

const InfoModalTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("eyebrow text-accent", className)}
    {...props}
  />
));
InfoModalTitle.displayName = "InfoModalTitle";

const InfoModalHeadline = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-balance text-2xl font-bold tracking-[-0.03em] text-fg-1 sm:text-3xl",
      className,
    )}
    {...props}
  />
));
InfoModalHeadline.displayName = "InfoModalHeadline";

const InfoModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mt-1 text-pretty text-sm leading-relaxed text-fg-3", className)}
    {...props}
  />
));
InfoModalDescription.displayName = "InfoModalDescription";

function InfoModalBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-6 py-6", className)}
      {...props}
    />
  );
}

export {
  InfoModal,
  InfoModalTrigger,
  InfoModalClose,
  InfoModalContent,
  InfoModalHeader,
  InfoModalTitle,
  InfoModalHeadline,
  InfoModalDescription,
  InfoModalBody,
};

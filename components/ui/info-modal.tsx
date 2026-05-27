"use client";

/**
 * @file Responsive info modal. Bottom sheet on mobile, centered dialog on md+. Built on…
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
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
        "fixed z-50 flex flex-col bg-background border-lime-400/20 ease-worldkit",
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
      <DialogPrimitive.Close className="absolute right-2.5 top-[max(0.625rem,calc(env(safe-area-inset-top)+0.25rem))] z-10 flex size-11 items-center justify-center text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 md:top-2.5">
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
        // pt grows with the iOS notch in the bottom-sheet variant; harmless on
        // the centered desktop dialog where the inset is 0.
        "sticky top-0 z-[1] flex flex-col gap-1 border-b border-lime-400/20 bg-background px-6 pb-5 pr-14 pt-[max(1.25rem,calc(env(safe-area-inset-top)+0.5rem))] md:pt-5",
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
    className={cn("eyebrow text-lime-400", className)}
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
      "text-balance text-2xl font-bold tracking-[-0.03em] text-foreground sm:text-3xl",
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
    className={cn("mt-1 text-pretty text-sm leading-relaxed text-muted-foreground", className)}
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
      className={cn(
        // pb clears the iOS home indicator when the modal opens as a bottom
        // sheet; centered desktop dialog gets the standard 1.5rem.
        "flex-1 overflow-y-auto px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-6",
        className,
      )}
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

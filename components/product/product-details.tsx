"use client";

import * as React from "react";

import { AuthenticityModal } from "@/components/info/authenticity-modal";
import { ShippingReturnsModal } from "@/components/info/shipping-returns-modal";
import { SizeGuideModal } from "@/components/info/size-guide-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/shopify/types";

/**
 * Inline trigger styled to match the prior <Link className="text-accent underline">
 * usage. Forwards ref/props so Radix Slot (asChild on the modal trigger) can wire
 * up its onClick, data-state, aria-* etc. onto the underlying <button>.
 */
const InlineTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function InlineTrigger({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={
        "text-accent underline underline-offset-2 transition-colors hover:text-accent-hi focus:outline-none focus-visible:text-accent-hi" +
        (className ? ` ${className}` : "")
      }
      {...props}
    />
  );
});

export function ProductDetails({ product }: { product: Product }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={["description"]}
      className="border-t border-line-1"
    >
      <AccordionItem value="description">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <div
            className="[&_a]:text-accent [&_a]:underline [&_p]:mb-3 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml || `<p>${product.description}</p>`,
            }}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="authenticity">
        <AccordionTrigger>Condition &amp; Quality Check</AccordionTrigger>
        <AccordionContent>
          <p>
            Every shirt is inspected and graded before it joins the archive.
            Each piece is checked against reference photos for stitching, badge
            alignment, fonts and finish. Inspected before dispatch.{" "}
            <AuthenticityModal>
              <InlineTrigger>See our full quality promise</InlineTrigger>
            </AuthenticityModal>
            .
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="size">
        <AccordionTrigger>Size Guide</AccordionTrigger>
        <AccordionContent>
          <p>
            Retro shirts often fit smaller than modern kits. Open the{" "}
            <SizeGuideModal>
              <InlineTrigger>full size guide</InlineTrigger>
            </SizeGuideModal>{" "}
            for measurements before picking your size.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping &amp; Returns</AccordionTrigger>
        <AccordionContent>
          <p>
            Worldwide shipping with tracking, dispatched in 48h. Returns within
            30 days on unworn shirts with tags. See{" "}
            <ShippingReturnsModal>
              <InlineTrigger>shipping &amp; returns</InlineTrigger>
            </ShippingReturnsModal>{" "}
            for details.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

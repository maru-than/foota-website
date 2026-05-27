"use client";

/**
 * @file PDP accordion — description, customise info, size guide, shipping and authenticity modals.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

import * as React from "react";
import {
  AlertTriangle,
  FileText,
  PencilLine,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { AuthenticityModal } from "@/components/info/authenticity-modal";
import { ShippingReturnsModal } from "@/components/info/shipping-returns-modal";
import { SizeGuideModal } from "@/components/info/size-guide-modal";
import { FontSpecimen } from "@/components/product/customise/font-specimen";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CUSTOM_MAX_NAME_CHARS, CUSTOM_PRICE_DELTA } from "@/lib/customisation";
import type { Product } from "@/lib/shopify/types";

/**
 * Inline trigger styled to match the prior <Link className="text-lime-400 underline">
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
        "text-lime-400 underline underline-offset-2 transition-colors hover:text-lime-300 focus:outline-none focus-visible:text-lime-300" +
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
      className="border-t border-border"
    >
      <AccordionItem value="description">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
            Description
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div
            className="[&_a]:text-lime-400 [&_a]:underline [&_p]:mb-3 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml || `<p>${product.description}</p>`,
            }}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="authenticity">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
            Condition &amp; Quality Check
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Every shirt is inspected before it ships.
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
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Ruler className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
            Size Guide
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <p>
            2026 jerseys are cut to modern fit. Open the{" "}
            <SizeGuideModal>
              <InlineTrigger>full size guide</InlineTrigger>
            </SizeGuideModal>{" "}
            for measurements before picking your size.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Truck className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
            Shipping &amp; Returns
          </span>
        </AccordionTrigger>
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

      {product.meta.customisable !== false ? (
        <AccordionItem value="customisation">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <PencilLine className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
              Name &amp; number printing
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-3">
              Add any name (up to {CUSTOM_MAX_NAME_CHARS} characters) and a
              number from 0–99 to the back. Heat-pressed with the official{" "}
              {product.meta.confederation ?? "confederation"} letter set.
              Add-on price: ${CUSTOM_PRICE_DELTA.toFixed(0)}.
            </p>
            <div className="mb-4 flex items-start gap-2 border border-danger/40 bg-destructive/5 p-3">
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-destructive"
                strokeWidth={1.5}
                aria-hidden
              />
              <p>
                Customised shirts ship in 5–7 days and are{" "}
                <b className="text-foreground">non-returnable</b> — please
                double-check spelling before adding to the bag.
              </p>
            </div>
            <FontSpecimen
              confederation={product.meta.confederation}
              className="border-t border-border pt-4"
            />
          </AccordionContent>
        </AccordionItem>
      ) : null}
    </Accordion>
  );
}

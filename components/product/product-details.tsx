"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/shopify/types";

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
        <AccordionTrigger>Condition &amp; Authenticity</AccordionTrigger>
        <AccordionContent>
          <p>
            Every shirt is inspected and graded before it joins the archive.
            Retro and rare shirts are checked against original references for
            badges, fonts and manufacturing details. Officially licensed where
            applicable.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="size">
        <AccordionTrigger>Size Guide</AccordionTrigger>
        <AccordionContent>
          <p>
            Retro shirts often fit smaller than modern kits. See the{" "}
            <Link href="/size-guide" className="text-accent underline">
              full size guide
            </Link>{" "}
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
            <Link href="/shipping-returns" className="text-accent underline">
              shipping &amp; returns
            </Link>{" "}
            for details.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

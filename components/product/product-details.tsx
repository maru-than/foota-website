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
      className="border-t border-line"
    >
      <AccordionItem value="description">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <div
            className="[&_a]:text-grass [&_a]:underline [&_p]:mb-3 [&_p:last-child]:mb-0"
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
            Every shirt is inspected and graded by our team before it joins the
            archive. Retro and rare shirts are checked against original
            references for badges, fonts and manufacturing details. Where a
            shirt is officially licensed, it is sourced as such.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="size">
        <AccordionTrigger>Size Guide</AccordionTrigger>
        <AccordionContent>
          <p>
            Football shirts vary by era and manufacturer — retro shirts often
            fit smaller than modern kits. See our{" "}
            <Link href="/size-guide" className="text-grass underline">
              full size guide
            </Link>{" "}
            for measurements before choosing your size.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping &amp; Returns</AccordionTrigger>
        <AccordionContent>
          <p>
            Worldwide shipping with tracking on every order. Returns accepted
            within 30 days on unworn shirts with tags. See{" "}
            <Link href="/shipping-returns" className="text-grass underline">
              shipping &amp; returns
            </Link>{" "}
            for full details.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

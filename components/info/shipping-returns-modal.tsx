"use client";

import {
  InfoModal,
  InfoModalBody,
  InfoModalContent,
  InfoModalDescription,
  InfoModalHeader,
  InfoModalHeadline,
  InfoModalTitle,
  InfoModalTrigger,
} from "@/components/ui/info-modal";
import { ShippingReturnsContent } from "./shipping-returns-content";

export function ShippingReturnsModal({ children }: { children: React.ReactNode }) {
  return (
    <InfoModal>
      <InfoModalTrigger asChild>{children}</InfoModalTrigger>
      <InfoModalContent aria-describedby={undefined}>
        <InfoModalHeader>
          <InfoModalTitle>Help</InfoModalTitle>
          <InfoModalHeadline>Shipping &amp; returns</InfoModalHeadline>
          <InfoModalDescription>
            Getting your jersey, and what to do if it isn&apos;t quite right.
          </InfoModalDescription>
        </InfoModalHeader>
        <InfoModalBody>
          <ShippingReturnsContent />
        </InfoModalBody>
      </InfoModalContent>
    </InfoModal>
  );
}

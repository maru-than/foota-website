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
import { SizeGuideContent } from "./size-guide-content";

export function SizeGuideModal({ children }: { children: React.ReactNode }) {
  return (
    <InfoModal>
      <InfoModalTrigger asChild>{children}</InfoModalTrigger>
      <InfoModalContent aria-describedby={undefined}>
        <InfoModalHeader>
          <InfoModalTitle>Help</InfoModalTitle>
          <InfoModalHeadline>Size guide</InfoModalHeadline>
          <InfoModalDescription>
            Shirts vary by era and manufacturer — use these measurements as a
            guide before picking your size.
          </InfoModalDescription>
        </InfoModalHeader>
        <InfoModalBody>
          <SizeGuideContent />
        </InfoModalBody>
      </InfoModalContent>
    </InfoModal>
  );
}

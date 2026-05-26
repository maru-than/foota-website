"use client";

/**
 * @file Modal wrapper around the size-guide body — era / manufacturer variations and how-to-measure guidance.
 * @author Maruthan
 * @copyright 2026 Maruthan
 * @license MIT
 * @since 2026-05-25
 */

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

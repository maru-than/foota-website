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
import { AuthenticityContent } from "./authenticity-content";

export function AuthenticityModal({ children }: { children: React.ReactNode }) {
  return (
    <InfoModal>
      <InfoModalTrigger asChild>{children}</InfoModalTrigger>
      <InfoModalContent aria-describedby={undefined}>
        <InfoModalHeader>
          <InfoModalTitle>Our promise</InfoModalTitle>
          <InfoModalHeadline>Quality check</InfoModalHeadline>
          <InfoModalDescription>
            Every 2026 shirt is inspected before it ships.
          </InfoModalDescription>
        </InfoModalHeader>
        <InfoModalBody>
          <AuthenticityContent />
        </InfoModalBody>
      </InfoModalContent>
    </InfoModal>
  );
}

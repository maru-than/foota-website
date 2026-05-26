import { ImageResponse } from "next/og";

import {
  OG_COLORS,
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgFrame,
  OgTitle,
  logoDataUrl,
  ogImageOptions,
} from "@/lib/og";

export const alt = "Worldkit Soccer — A home for jerseys";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  const logo = await logoDataUrl();
  return new ImageResponse(
    (
      <OgFrame logo={logo}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <OgTitle size={132}>
            A home for jerseys
            <span style={{ color: OG_COLORS.accent }}>.</span>
          </OgTitle>
        </div>
      </OgFrame>
    ),
    ogImageOptions(),
  );
}

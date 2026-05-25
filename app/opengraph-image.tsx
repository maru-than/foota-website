import { ImageResponse } from "next/og";

export const alt = "Foota Jerseys — A home for jerseys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F5F2EA",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#4F6F52",
            fontFamily: "sans-serif",
          }}
        >
          Authentic · Retro · Iconic
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, color: "#121212", lineHeight: 1 }}>
            A home for jerseys.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#6b6a63",
              fontFamily: "sans-serif",
            }}
          >
            Authentic, retro and iconic football shirts.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 40, color: "#12372A" }}>Foota Jerseys</div>
          <div
            style={{
              display: "flex",
              height: 14,
              width: 160,
              backgroundColor: "#6B1E2B",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}

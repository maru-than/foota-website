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
          backgroundColor: "#111111",
          padding: "80px",
          fontFamily: "Geist, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C1FF56",
          }}
        >
          FIFA World Cup 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            A home for jerseys<span style={{ color: "#C1FF56" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.72)" }}>
            Official home jerseys · all 48 nations.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 40, color: "#C1FF56", textTransform: "uppercase", letterSpacing: 2 }}>
            Foota Jerseys
          </div>
          <div style={{ display: "flex", height: 14, width: 160, backgroundColor: "#C1FF56" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}

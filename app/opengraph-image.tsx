import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0b0f22 0%, #141a3a 55%, #0b0f22 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "linear-gradient(135deg, #6d6aff 0%, #9757f2 100%)",
              color: "white",
              fontSize: 26,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            OJ
          </div>
          <div style={{ display: "flex", fontSize: 26, opacity: 0.75 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            Turning ambiguity into confident delivery.
          </div>
          <div style={{ display: "flex", fontSize: 28, opacity: 0.7 }}>{siteConfig.title}</div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Business Analysis", "Agile Delivery", "UAT & Stakeholders", "Lagos -> UK Remote"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.25)",
                fontSize: 20,
                opacity: 0.85,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}

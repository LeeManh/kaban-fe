import { ImageResponse } from "next/og";

export const alt = "Kanvas — Organize your work, together";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            borderRadius: 22,
            background: "rgba(255,255,255,0.16)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="18" rx="1.5" />
            <rect x="14" y="3" width="7" height="11" rx="1.5" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            color: "white",
            letterSpacing: -2,
          }}
        >
          Kanvas
        </div>
      </div>
      <div
        style={{ display: "flex", marginTop: 28, fontSize: 32, color: "rgba(255,255,255,0.85)" }}
      >
        Organize your work, together
      </div>
    </div>,
    { ...size },
  );
}

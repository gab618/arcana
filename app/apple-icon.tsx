import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #181528 0%, #0b0a12 100%)",
          borderRadius: 38,
          border: "3px solid rgba(212, 175, 55, 0.5)",
        }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 3 L18.2 11.5 L25.7 11.5 L19.6 16 L21.8 23.5 L16 19.2 L10.2 23.5 L12.4 16 L6.3 11.5 L13.8 11.5 Z"
            fill="#d4af37"
          />
          <circle cx="16" cy="15" r="2.5" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

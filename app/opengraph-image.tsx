import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #120e24 0%, #08060f 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Borda dourada decorativa */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "2px solid rgba(212, 175, 55, 0.4)",
            borderRadius: "24px",
            display: "flex",
          }}
        />

        {/* Ícone estelar central */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "88px",
            height: "88px",
            borderRadius: "20px",
            background: "rgba(212, 175, 55, 0.12)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            marginBottom: "24px",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 3 L18.2 11.5 L25.7 11.5 L19.6 16 L21.8 23.5 L16 19.2 L10.2 23.5 L12.4 16 L6.3 11.5 L13.8 11.5 Z"
              fill="#d4af37"
            />
            <circle cx="16" cy="15" r="2.5" fill="#ffffff" opacity="0.9" />
          </svg>
        </div>

        {/* Título da marca */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {SITE_NAME}
        </div>

        {/* Descrição */}
        <div
          style={{
            fontSize: "26px",
            color: "#d4af37",
            textAlign: "center",
            maxWidth: "850px",
            lineHeight: 1.4,
            marginBottom: "32px",
            display: "flex",
          }}
        >
          {SITE_DESCRIPTION}
        </div>

        {/* Destaques das ferramentas */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "18px",
            color: "#d1d5db",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.06)",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
            }}
          >
            ✨ Carta do Dia
          </div>
          <div
            style={{
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.06)",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
            }}
          >
            🔮 Tiragem de 3 Cartas
          </div>
          <div
            style={{
              padding: "8px 20px",
              background: "rgba(255, 255, 255, 0.06)",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
            }}
          >
            🃏 Todos os 78 Arcanos
          </div>
        </div>

        {/* Domínio oficial no rodapé */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            fontSize: "16px",
            letterSpacing: "0.05em",
            color: "rgba(212, 175, 55, 0.75)",
            textTransform: "uppercase",
            fontWeight: 600,
            display: "flex",
          }}
        >
          tirartarot.com.br
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

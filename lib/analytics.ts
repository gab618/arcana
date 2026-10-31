import { sendGAEvent } from "@next/third-parties/google";

/**
 * Registra um evento personalizado de conversão/interação no Google Analytics 4 (GA4).
 * Seguro para execução: verifica suporte no navegador e só envia se NEXT_PUBLIC_GA_ID estiver definido.
 */
export function trackTarotEvent(
  action: string,
  category: "carta_do_dia" | "tiragem_3_cartas" | "arcano_pessoal" | "arcano_anual" | "mapa_astral" | "compartilhamento",
  label?: string,
) {
  try {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_ID) {
      sendGAEvent("event", action, {
        event_category: category,
        event_label: label,
      });
    }
  } catch {
    // Falha silenciosa para não travar a experiência do usuário
  }
}

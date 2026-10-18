import type { MinorArcanum, TarotSuit } from "./types";

const PLACEHOLDER_SUMMARY = "Conteúdo em breve.";

export type SuitMeta = {
  id: TarotSuit;
  name: string;
  element: string;
  theme: string;
};

export const SUITS_META: Record<TarotSuit, SuitMeta> = {
  copas: {
    id: "copas",
    name: "Copas",
    element: "Água",
    theme: "Emoções, sentimentos, amor e intuição",
  },
  ouros: {
    id: "ouros",
    name: "Ouros",
    element: "Terra",
    theme: "Materialidade, finanças, trabalho e realizações práticas",
  },
  espadas: {
    id: "espadas",
    name: "Espadas",
    element: "Ar",
    theme: "Mente, verdade, discernimento, ideias e desafios",
  },
  paus: {
    id: "paus",
    name: "Paus",
    element: "Fogo",
    theme: "Ação, criatividade, paixão, impulso e iniciativa",
  },
};

const RANKS = [
  { num: 1, rankSlug: "as", rankName: "Ás" },
  { num: 2, rankSlug: "dois", rankName: "Dois" },
  { num: 3, rankSlug: "tres", rankName: "Três" },
  { num: 4, rankSlug: "quatro", rankName: "Quatro" },
  { num: 5, rankSlug: "cinco", rankName: "Cinco" },
  { num: 6, rankSlug: "seis", rankName: "Seis" },
  { num: 7, rankSlug: "sete", rankName: "Sete" },
  { num: 8, rankSlug: "oito", rankName: "Oito" },
  { num: 9, rankSlug: "nove", rankName: "Nove" },
  { num: 10, rankSlug: "dez", rankName: "Dez" },
  { num: 11, rankSlug: "valete", rankName: "Valete" },
  { num: 12, rankSlug: "cavaleiro", rankName: "Cavaleiro" },
  { num: 13, rankSlug: "rainha", rankName: "Rainha" },
  { num: 14, rankSlug: "rei", rankName: "Rei" },
] as const;

export const MINOR_ARCANA: readonly MinorArcanum[] = (
  ["copas", "ouros", "espadas", "paus"] as const
).flatMap((suit) => {
  const suitMeta = SUITS_META[suit];
  return RANKS.map((r) => {
    const slug = `${r.rankSlug}-de-${suit}`;
    const name = `${r.rankName} de ${suitMeta.name}`;
    return {
      type: "minor",
      number: r.num,
      suit,
      suitName: suitMeta.name,
      rankName: r.rankName,
      slug,
      name,
      summary: PLACEHOLDER_SUMMARY,
      image: `/arcanos/${slug}.webp`,
      imageAlt: `Carta ${name} do tarot`,
    };
  });
});

export function getMinorArcanumBySlug(slug: string): MinorArcanum | undefined {
  return MINOR_ARCANA.find((a) => a.slug === slug);
}

import { MAJOR_ARCANA } from "./major-arcana";
import { MINOR_ARCANA } from "./minor-arcana";
import type { TarotCard } from "./types";

/** Todas as 78 cartas do Tarot (22 Maiores + 56 Menores) */
export const ALL_TAROT_CARDS: readonly TarotCard[] = [
  ...MAJOR_ARCANA,
  ...MINOR_ARCANA,
];

export function getCardBySlug(slug: string): TarotCard | undefined {
  return ALL_TAROT_CARDS.find((card) => card.slug === slug);
}

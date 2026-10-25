import { MAJOR_CONTENT } from "./content";
import type { MajorArcanum } from "./types";

/** Todas as cartas têm a mesma proporção, então o tamanho é fixo (evita layout shift). */
export const CARD_IMAGE_SIZE = { width: 600, height: 1050 } as const;

const PLACEHOLDER_SUMMARY = "Conteúdo em breve.";

// [número, slug, nome] — numeração em que o Louco é o 22.
const CARDS: ReadonlyArray<readonly [number, string, string]> = [
  [1, "o-mago", "O Mago"],
  [2, "a-sacerdotisa", "A Sacerdotisa"],
  [3, "a-imperatriz", "A Imperatriz"],
  [4, "o-imperador", "O Imperador"],
  [5, "o-hierofante", "O Hierofante"],
  [6, "os-enamorados", "Os Enamorados"],
  [7, "o-carro", "O Carro"],
  [8, "a-justica", "A Justiça"],
  [9, "o-eremita", "O Eremita"],
  [10, "a-roda-da-fortuna", "A Roda da Fortuna"],
  [11, "a-forca", "A Força"],
  [12, "o-enforcado", "O Enforcado"],
  [13, "a-morte", "A Morte"],
  [14, "a-temperanca", "A Temperança"],
  [15, "o-diabo", "O Diabo"],
  [16, "a-torre", "A Torre"],
  [17, "a-estrela", "A Estrela"],
  [18, "a-lua", "A Lua"],
  [19, "o-sol", "O Sol"],
  [20, "o-julgamento", "O Julgamento"],
  [21, "o-mundo", "O Mundo"],
  [22, "o-louco", "O Louco"],
];

export const MAJOR_ARCANA: readonly MajorArcanum[] = CARDS.map(
  ([number, slug, name]) => {
    const content = MAJOR_CONTENT[slug];
    return {
      type: "major",
      number,
      slug,
      name,
      summary: content?.summary ?? PLACEHOLDER_SUMMARY,
      content,
      image: `/arcanos/${slug}.webp`,
      imageAlt: `Carta ${name} do tarot (arcano ${number})`,
    };
  },
);

export function getArcanumByNumber(n: number): MajorArcanum {
  const found = MAJOR_ARCANA.find((a) => a.number === n);
  if (!found) throw new Error(`Arcano inválido: ${n}`);
  return found;
}

export function getArcanumBySlug(slug: string): MajorArcanum | undefined {
  return MAJOR_ARCANA.find((a) => a.slug === slug);
}

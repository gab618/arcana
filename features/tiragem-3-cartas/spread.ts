const TOTAL_MAJOR_ARCANA = 22;

export type SpreadPosition = {
  index: 0 | 1 | 2;
  label: string;
  prompt: string;
};

export type SpreadModelId = "tempo" | "acao";

export type SpreadModel = {
  id: SpreadModelId;
  title: string;
  description: string;
  positions: readonly [SpreadPosition, SpreadPosition, SpreadPosition];
};

export const SPREAD_MODELS: Record<SpreadModelId, SpreadModel> = {
  tempo: {
    id: "tempo",
    title: "Passado · Presente · Futuro",
    description:
      "Compreenda as raízes da questão, o momento atual e para onde as energias apontam.",
    positions: [
      {
        index: 0,
        label: "Passado",
        prompt: "O que trouxe você até aqui e as influências de origem.",
      },
      {
        index: 1,
        label: "Presente",
        prompt: "A energia central que atua no seu momento atual.",
      },
      {
        index: 2,
        label: "Futuro",
        prompt: "A tendência e o desdobramento se o caminho atual for mantido.",
      },
    ],
  },
  acao: {
    id: "acao",
    title: "Situação · Desafio · Conselho",
    description:
      "Ideal para tomada de decisão: clareia o cenário, o obstáculo e a melhor atitude.",
    positions: [
      {
        index: 0,
        label: "Situação",
        prompt: "O tema central ou contexto real da sua questão.",
      },
      {
        index: 1,
        label: "Desafio",
        prompt: "O bloqueio, aprendizado ou ponto de atenção a superar.",
      },
      {
        index: 2,
        label: "Conselho",
        prompt: "A postura ou direção recomendada pelos Arcanos.",
      },
    ],
  },
};

/** Cria um baralho de 1 a 22 e embaralha usando Fisher-Yates. */
export function createShuffledDeck(
  random: () => number = Math.random,
): number[] {
  const deck = Array.from({ length: TOTAL_MAJOR_ARCANA }, (_, i) => i + 1);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/**
 * Corta o baralho em `cutIndex` (entre 1 e length - 1) e inverte as duas metades.
 */
export function cutDeck(
  deck: readonly number[],
  cutIndex?: number,
  random: () => number = Math.random,
): number[] {
  if (deck.length <= 1) return [...deck];
  const min = Math.max(1, Math.floor(deck.length * 0.25));
  const max = Math.min(deck.length - 1, Math.ceil(deck.length * 0.75));
  const idx =
    cutIndex !== undefined
      ? Math.min(Math.max(1, cutIndex), deck.length - 1)
      : min + Math.floor(random() * (max - min + 1));

  return [...deck.slice(idx), ...deck.slice(0, idx)];
}

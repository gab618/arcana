import { describe, expect, it } from "vitest";
import { SPREAD_MODELS, createShuffledDeck, cutDeck } from "./spread";

describe("createShuffledDeck", () => {
  it("contém exatamente os 22 arcanos maiores (1 a 22) sem repetição", () => {
    const deck = createShuffledDeck();
    expect(deck).toHaveLength(22);
    expect([...deck].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 22 }, (_, i) => i + 1),
    );
  });

  it("produz uma permutação determinística quando random é injetado", () => {
    const deckA = createShuffledDeck(() => 0.3);
    const deckB = createShuffledDeck(() => 0.3);
    expect(deckA).toEqual(deckB);
  });
});

describe("cutDeck", () => {
  it("divide o maço no ponto de corte e inverte as duas metades", () => {
    const deck = [1, 2, 3, 4, 5, 6];
    expect(cutDeck(deck, 2)).toEqual([3, 4, 5, 6, 1, 2]);
  });

  it("preserva todas as 22 cartas após um corte", () => {
    const original = createShuffledDeck();
    const afterCut = cutDeck(original);
    expect(afterCut).toHaveLength(22);
    expect([...afterCut].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 22 }, (_, i) => i + 1),
    );
  });
});

describe("SPREAD_MODELS", () => {
  it("define 3 posições para cada modelo de tiragem", () => {
    expect(SPREAD_MODELS.tempo.positions).toHaveLength(3);
    expect(SPREAD_MODELS.acao.positions).toHaveLength(3);
  });
});

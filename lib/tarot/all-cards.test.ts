import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_TAROT_CARDS, getCardBySlug } from "./all-cards";
import { MAJOR_ARCANA } from "./major-arcana";
import { MINOR_ARCANA } from "./minor-arcana";

describe("Catálogo Completo do Tarot (78 cartas)", () => {
  it("contém exatamente 78 cartas (22 maiores + 56 menores)", () => {
    expect(MAJOR_ARCANA).toHaveLength(22);
    expect(MINOR_ARCANA).toHaveLength(56);
    expect(ALL_TAROT_CARDS).toHaveLength(78);
  });

  it("não possui nenhum slug duplicado entre todas as 78 cartas", () => {
    const slugs = ALL_TAROT_CARDS.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(78);
  });

  it("cada um dos 4 naipes contém exatamente 14 cartas (do Ás ao Rei)", () => {
    const suits = ["copas", "ouros", "espadas", "paus"] as const;
    for (const suit of suits) {
      const cards = MINOR_ARCANA.filter((c) => c.suit === suit);
      expect(cards).toHaveLength(14);
      expect(cards.map((c) => c.number)).toEqual(
        Array.from({ length: 14 }, (_, i) => i + 1),
      );
    }
  });

  it("cada carta do baralho possui sua imagem WebP correspondente em public/arcanos/", () => {
    const publicDir = path.join(process.cwd(), "public");
    for (const card of ALL_TAROT_CARDS) {
      const imagePath = path.join(publicDir, card.image);
      expect(fs.existsSync(imagePath)).toBe(true);
    }
  });

  it("getCardBySlug localiza tanto arcanos maiores quanto menores", () => {
    expect(getCardBySlug("o-mago")?.name).toBe("O Mago");
    expect(getCardBySlug("as-de-copas")?.name).toBe("Ás de Copas");
    expect(getCardBySlug("rei-de-espadas")?.name).toBe("Rei de Espadas");
    expect(getCardBySlug("carta-inexistente")).toBeUndefined();
  });
});

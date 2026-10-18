import { describe, expect, it } from "vitest";
import {
  calculateAnnualArcanum,
  getLatestBirthdayYear,
  reduceToArcanum,
} from "./calculate";

describe("Cálculo do Arcano Anual", () => {
  it("calcula corretamente o exemplo da Ana (03/01/1990 com último aniversário em 2020 -> 9 O Eremita)", () => {
    const result = calculateAnnualArcanum(3, 1, 1990, 2020);

    expect(result.birthSum).toBe(1994); // 03 + 01 + 1990
    expect(result.total).toBe(4014); // 1994 + 2020
    expect(result.digitsSum).toBe(9); // 4 + 0 + 1 + 4
    expect(result.final).toBe(9); // Arcano 9 (O Eremita)
  });

  it("reduz para 1–22 caso a soma dos dígitos ultrapasse 22", () => {
    // Exemplo: se total for tal que sumDigits passe de 22
    expect(reduceToArcanum(28)).toBe(10);
    expect(reduceToArcanum(23)).toBe(5);
    expect(reduceToArcanum(22)).toBe(22);
    expect(reduceToArcanum(19)).toBe(19);
  });

  describe("getLatestBirthdayYear (ciclo de aniversário)", () => {
    it("retorna o ano corrente se a pessoa já fez aniversário na data de referência", () => {
      // Data de referência: 18 de Outubro de 2026
      const refDate = new Date(2026, 9, 18); // mês 9 é outubro (0-indexed)

      // Nascida em 03 de Janeiro: já fez aniversário em 2026
      expect(getLatestBirthdayYear(3, 1, refDate)).toBe(2026);

      // Nascida em 18 de Outubro (hoje): último aniversário é 2026
      expect(getLatestBirthdayYear(18, 10, refDate)).toBe(2026);
    });

    it("retorna o ano anterior se a pessoa ainda NÃO fez aniversário na data de referência", () => {
      // Data de referência: 18 de Outubro de 2026
      const refDate = new Date(2026, 9, 18);

      // Nascida em 25 de Dezembro: ainda não fez aniversário em 2026, o último foi em 2025
      expect(getLatestBirthdayYear(25, 12, refDate)).toBe(2025);

      // Nascida em 19 de Outubro (amanhã): último aniversário foi em 2025
      expect(getLatestBirthdayYear(19, 10, refDate)).toBe(2025);
    });
  });

  it("o arcano final sempre fica no intervalo 1 a 22 para várias combinações de datas", () => {
    for (let year = 1940; year <= 2025; year += 15) {
      for (let month = 1; month <= 12; month += 3) {
        for (const day of [1, 15, 28]) {
          const res = calculateAnnualArcanum(day, month, year, 2026);
          expect(res.final).toBeGreaterThanOrEqual(1);
          expect(res.final).toBeLessThanOrEqual(22);
        }
      }
    }
  });
});

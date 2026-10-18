import { describe, expect, it } from "vitest";
import {
  dateValue,
  nameValue,
  normalizeName,
  personalArcanum,
  reduceToArcanum,
} from "./calculate";

describe("reduceToArcanum", () => {
  it("mantém valores de 1 a 22", () => {
    expect(reduceToArcanum(1)).toBe(1);
    expect(reduceToArcanum(19)).toBe(19);
    expect(reduceToArcanum(22)).toBe(22);
  });

  it("reduz valores acima de 22 somando os algarismos", () => {
    expect(reduceToArcanum(23)).toBe(5);
    expect(reduceToArcanum(28)).toBe(10);
    expect(reduceToArcanum(99)).toBe(18);
  });
});

describe("dateValue", () => {
  it("15/03/1990 → 28 → 10", () => {
    expect(dateValue(15, 3, 1990)).toBe(10);
  });
});

describe("nameValue", () => {
  it("usa a tabela pitagórica (Ana = 1+5+1 = 7)", () => {
    expect(nameValue("Ana")).toBe(7);
  });

  it("S–Z valem 1–8 (S=1, Z=8)", () => {
    expect(nameValue("S")).toBe(1);
    expect(nameValue("Z")).toBe(8);
  });

  it("ignora acentos, espaços e símbolos", () => {
    expect(normalizeName("José da Conceição")).toBe("JOSEDACONCEICAO");
    expect(nameValue("José")).toBe(nameValue("Jose"));
    expect(nameValue("Ana Maria")).toBe(nameValue("AnaMaria"));
    expect(nameValue("Ana-Maria")).toBe(nameValue("Ana Maria"));
  });

  it("Ana Maria: 7 + 24 = 31 → 4", () => {
    expect(nameValue("Ana Maria")).toBe(4);
  });
});

describe("personalArcanum", () => {
  it("soma data e nome e reduz (Ana, 15/03/1990: 10 + 7 = 17)", () => {
    expect(personalArcanum("Ana", 1990, 3, 15)).toEqual({
      date: 10,
      name: 7,
      final: 17,
    });
  });

  it("o resultado final sempre fica entre 1 e 22", () => {
    for (let year = 1900; year <= 2030; year += 7) {
      for (let month = 1; month <= 12; month++) {
        for (const day of [1, 9, 17, 28, 31]) {
          const { final } = personalArcanum("Maria das Dores", year, month, day);
          expect(final).toBeGreaterThanOrEqual(1);
          expect(final).toBeLessThanOrEqual(22);
        }
      }
    }
  });
});

import { describe, expect, it } from "vitest";
import {
  drawArcanumNumber,
  parseStoredDraw,
  serializeDraw,
  todayKey,
} from "./draw";

describe("todayKey", () => {
  it("formata a data local como YYYY-MM-DD com zero à esquerda", () => {
    expect(todayKey(new Date(2026, 0, 3))).toBe("2026-01-03");
    expect(todayKey(new Date(2026, 9, 18))).toBe("2026-10-18");
  });
});

describe("drawArcanumNumber", () => {
  it("cobre os extremos 1 e 22", () => {
    expect(drawArcanumNumber(() => 0)).toBe(1);
    expect(drawArcanumNumber(() => 0.999999)).toBe(22);
  });

  it("sempre devolve um inteiro entre 1 e 22", () => {
    for (let i = 0; i < 1000; i++) {
      const n = drawArcanumNumber();
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(22);
    }
  });
});

describe("parseStoredDraw", () => {
  const today = "2026-10-18";

  it("devolve o arcano salvo hoje", () => {
    expect(parseStoredDraw(serializeDraw(today, 9), today)).toBe(9);
  });

  it("ignora a carta de outro dia (novo sorteio no dia seguinte)", () => {
    expect(parseStoredDraw(serializeDraw("2026-10-17", 9), today)).toBeNull();
  });

  it("ignora valores vazios, quebrados ou inválidos", () => {
    expect(parseStoredDraw(null, today)).toBeNull();
    expect(parseStoredDraw("", today)).toBeNull();
    expect(parseStoredDraw("{nao e json", today)).toBeNull();
    expect(parseStoredDraw("null", today)).toBeNull();
    expect(parseStoredDraw(serializeDraw(today, 0), today)).toBeNull();
    expect(parseStoredDraw(serializeDraw(today, 23), today)).toBeNull();
    expect(parseStoredDraw(serializeDraw(today, 1.5), today)).toBeNull();
    expect(parseStoredDraw(`{"date":"${today}","number":"9"}`, today)).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import {
  ascendantAndMidheaven,
  calculateAspects,
  computeNatalChart,
  isValidTimeZone,
  toPosition,
  wholeSignHouse,
  zonedTimeToUtc,
  type PlanetPosition,
} from "./calculate";

describe("toPosition", () => {
  it("separa signo, grau e minutos", () => {
    const p = toPosition(354.5);
    expect(p.signIndex).toBe(11); // Peixes
    expect(p.degree).toBe(24);
    expect(p.minutes).toBe(30);
  });

  it("normaliza valores negativos e acima de 360", () => {
    expect(toPosition(-10).longitude).toBeCloseTo(350);
    expect(toPosition(370).longitude).toBeCloseTo(10);
  });
});

describe("zonedTimeToUtc", () => {
  it("respeita o horário de verão brasileiro (jan/2000 = UTC-2)", () => {
    expect(
      zonedTimeToUtc("2000-01-01", "12:00", "America/Sao_Paulo").toISOString(),
    ).toBe("2000-01-01T14:00:00.000Z");
  });

  it("usa UTC-3 fora do horário de verão", () => {
    expect(
      zonedTimeToUtc("2024-07-01", "12:00", "America/Sao_Paulo").toISOString(),
    ).toBe("2024-07-01T15:00:00.000Z");
  });

  it("valida fusos IANA", () => {
    expect(isValidTimeZone("America/Sao_Paulo")).toBe(true);
    expect(isValidTimeZone("Marte/Olympus")).toBe(false);
  });
});

describe("ascendantAndMidheaven", () => {
  it("RAMC 0° no equador: MC em Áries 0° e Ascendente em Câncer 0°", () => {
    const { ascendant, midheaven } = ascendantAndMidheaven(0, 0, 23.44);
    expect(midheaven).toBeCloseTo(0, 5);
    expect(ascendant).toBeCloseTo(90, 5);
  });

  it("RAMC 90°: MC em Câncer 0°", () => {
    expect(ascendantAndMidheaven(90, -20, 23.44).midheaven).toBeCloseTo(90, 5);
  });
});

describe("wholeSignHouse", () => {
  it("a casa 1 é o signo do Ascendente", () => {
    expect(wholeSignHouse(95, 100)).toBe(1);
    expect(wholeSignHouse(125, 100)).toBe(2);
    expect(wholeSignHouse(80, 100)).toBe(12);
  });
});

describe("calculateAspects", () => {
  const mk = (key: PlanetPosition["key"], longitude: number): PlanetPosition => ({
    ...toPosition(longitude),
    key,
    retrograde: false,
  });

  it("detecta trígono e oposição, respeitando o orbe", () => {
    const aspects = calculateAspects([mk("sun", 10), mk("moon", 130), mk("mars", 192)]);
    expect(aspects.find((a) => a.a === "sun" && a.b === "moon")?.type).toBe("trígono");
    expect(aspects.find((a) => a.a === "sun" && a.b === "mars")?.type).toBe("oposição");
  });

  it("ignora ângulos fora do orbe", () => {
    expect(calculateAspects([mk("sun", 0), mk("moon", 45)])).toHaveLength(0);
  });
});

describe("computeNatalChart", () => {
  it("modo simples: Sol de 15/03/1990 em Peixes e sem ascendente", () => {
    const chart = computeNatalChart({ date: "1990-03-15" });
    expect(chart.mode).toBe("simple");
    expect(chart.ascendant).toBeUndefined();
    expect(chart.planets).toHaveLength(10);
    expect(chart.planets[0].signIndex).toBe(11);
    expect(chart.moonApproximate).toBe(true);
  });

  it("modo completo: inclui ascendente, meio do céu e casas", () => {
    const chart = computeNatalChart({
      date: "1990-03-15",
      time: "08:30",
      location: { latitude: -19.92, longitude: -43.94, timezone: "America/Sao_Paulo" },
    });
    expect(chart.mode).toBe("full");
    expect(chart.ascendant).toBeDefined();
    expect(chart.midheaven).toBeDefined();
    expect(chart.planets.every((p) => p.house && p.house >= 1 && p.house <= 12)).toBe(true);
    expect(chart.moonApproximate).toBe(false);
  });

  it("Sol nasce junto ao Ascendente: ao amanhecer o Sol fica na casa 1 ou 12", () => {
    const chart = computeNatalChart({
      date: "1990-03-15",
      time: "06:15",
      location: { latitude: -19.92, longitude: -43.94, timezone: "America/Sao_Paulo" },
    });
    expect([12, 1]).toContain(chart.planets[0].house);
  });
});

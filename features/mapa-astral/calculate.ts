import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoVector,
  SiderealTime,
  SunPosition,
} from "astronomy-engine";
import { ASPECTS, PLANETS, SIGNS, type AspectType, type PlanetKey } from "./zodiac";

export type Location = {
  latitude: number;
  longitude: number;
  /** Fuso IANA, ex.: "America/Sao_Paulo". */
  timezone: string;
};

export type ChartInput = {
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM (opcional no modo sem coordenadas) */
  time?: string;
  /** Presente apenas no modo "com coordenadas". */
  location?: Location;
};

export type Position = {
  /** Longitude eclíptica 0–360. */
  longitude: number;
  signIndex: number;
  /** Grau dentro do signo (0–29). */
  degree: number;
  minutes: number;
};

export type PlanetPosition = Position & {
  key: PlanetKey;
  retrograde: boolean;
  /** Casa (1–12) — só no modo com coordenadas. */
  house?: number;
};

export type Aspect = {
  a: PlanetKey;
  b: PlanetKey;
  type: AspectType;
  /** Diferença entre o ângulo exato e o real, em graus. */
  orb: number;
};

export type NatalChart = {
  mode: "simple" | "full";
  utc: Date;
  planets: PlanetPosition[];
  aspects: Aspect[];
  ascendant?: Position;
  midheaven?: Position;
  /** Sem hora informada a Lua pode variar até ~6°. */
  moonApproximate: boolean;
};

const BRASILIA_OFFSET_MINUTES = -180;

export function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function toPosition(longitude: number): Position {
  const lon = normalizeAngle(longitude);
  const inSign = lon % 30;
  const degree = Math.floor(inSign);
  const minutes = Math.floor((inSign - degree) * 60);
  return { longitude: lon, signIndex: Math.floor(lon / 30), degree, minutes };
}

function tzOffsetMinutes(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(utcMs));
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
}

/** Converte data/hora "de parede" em um fuso IANA para o instante UTC (respeita horário de verão histórico). */
export function zonedTimeToUtc(
  date: string,
  time: string,
  timeZone: string,
): Date {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const wallAsUtc = Date.UTC(y, mo - 1, d, h, mi);
  let utc = wallAsUtc - tzOffsetMinutes(wallAsUtc, timeZone) * 60000;
  // segunda passada: o deslocamento pode mudar perto da transição de horário de verão
  utc = wallAsUtc - tzOffsetMinutes(utc, timeZone) * 60000;
  return new Date(utc);
}

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

function eclipticLongitude(key: PlanetKey, date: Date): number {
  switch (key) {
    case "sun":
      return SunPosition(date).elon;
    case "moon":
      return EclipticGeoMoon(date).lon;
    default: {
      const body = {
        mercury: Body.Mercury,
        venus: Body.Venus,
        mars: Body.Mars,
        jupiter: Body.Jupiter,
        saturn: Body.Saturn,
        uranus: Body.Uranus,
        neptune: Body.Neptune,
        pluto: Body.Pluto,
      }[key];
      return Ecliptic(GeoVector(body, date, true)).elon;
    }
  }
}

function isRetrograde(key: PlanetKey, date: Date): boolean {
  if (key === "sun" || key === "moon") return false;
  const next = new Date(date.getTime() + 24 * 3600 * 1000);
  const delta = normalizeAngle(
    eclipticLongitude(key, next) - eclipticLongitude(key, date) + 180,
  ) - 180;
  return delta < 0;
}

/** Obliquidade média da eclíptica (graus) para a data. */
export function meanObliquity(date: Date): number {
  const t = (date.getTime() / 86400000 + 2440587.5 - 2451545.0) / 36525;
  return 23.4392911 - 0.0130042 * t;
}

/** Ascendente e Meio do Céu a partir do RAMC, latitude e obliquidade (todos em graus). */
export function ascendantAndMidheaven(
  ramcDeg: number,
  latitudeDeg: number,
  obliquityDeg: number,
): { ascendant: number; midheaven: number } {
  const rad = Math.PI / 180;
  const ramc = ramcDeg * rad;
  const eps = obliquityDeg * rad;
  const lat = latitudeDeg * rad;
  const mc = Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps));
  const asc = Math.atan2(
    Math.cos(ramc),
    -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat) * Math.sin(eps)),
  );
  return {
    ascendant: normalizeAngle(asc / rad),
    midheaven: normalizeAngle(mc / rad),
  };
}

/** Casas por signo inteiro: a casa 1 é o signo do Ascendente. */
export function wholeSignHouse(longitude: number, ascendantLongitude: number): number {
  const ascSign = Math.floor(normalizeAngle(ascendantLongitude) / 30);
  const sign = Math.floor(normalizeAngle(longitude) / 30);
  return ((sign - ascSign + 12) % 12) + 1;
}

export function calculateAspects(planets: readonly PlanetPosition[]): Aspect[] {
  const found: Aspect[] = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const diff = Math.abs(planets[i].longitude - planets[j].longitude);
      const angle = diff > 180 ? 360 - diff : diff;
      for (const aspect of ASPECTS) {
        const orb = Math.abs(angle - aspect.angle);
        if (orb <= aspect.orb) {
          found.push({ a: planets[i].key, b: planets[j].key, type: aspect.type, orb });
          break;
        }
      }
    }
  }
  return found.sort((x, y) => x.orb - y.orb);
}

export function computeNatalChart(input: ChartInput): NatalChart {
  const { location } = input;
  const time = input.time || "12:00";
  const moonApproximate = !input.time;

  const utc = location
    ? zonedTimeToUtc(input.date, time, location.timezone)
    : zonedTimeToUtc(input.date, time, "America/Sao_Paulo");

  const ascendantLon = location
    ? ascendantAndMidheaven(
        normalizeAngle(SiderealTime(utc) * 15 + location.longitude),
        location.latitude,
        meanObliquity(utc),
      )
    : undefined;

  const planets: PlanetPosition[] = PLANETS.map((p) => {
    const position = toPosition(eclipticLongitude(p.key, utc));
    return {
      ...position,
      key: p.key,
      retrograde: isRetrograde(p.key, utc),
      house: ascendantLon
        ? wholeSignHouse(position.longitude, ascendantLon.ascendant)
        : undefined,
    };
  });

  return {
    mode: location ? "full" : "simple",
    utc,
    planets,
    aspects: calculateAspects(planets),
    ascendant: ascendantLon ? toPosition(ascendantLon.ascendant) : undefined,
    midheaven: ascendantLon ? toPosition(ascendantLon.midheaven) : undefined,
    moonApproximate,
  };
}

export function signOf(position: Position) {
  return SIGNS[position.signIndex];
}

export { BRASILIA_OFFSET_MINUTES };

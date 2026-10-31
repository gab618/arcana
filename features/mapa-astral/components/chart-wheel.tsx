import { PLANETS, SIGNS } from "../zodiac";
import { signOf, type NatalChart } from "../calculate";

const SIZE = 400;
const C = SIZE / 2;
const R_OUT = 190;
const R_SIGN = 160;
const R_PLANET = 128;
const R_IN = 100;

const ELEMENT_COLOR = {
  Fogo: "#f97316",
  Terra: "#84cc16",
  Ar: "#38bdf8",
  Água: "#818cf8",
} as const;

/** Converte longitude eclíptica em ponto no círculo (Ascendente à esquerda, sentido anti-horário). */
function point(longitude: number, radius: number, rotation: number) {
  const angle = ((180 - (longitude - rotation)) * Math.PI) / 180;
  return { x: C + radius * Math.cos(angle), y: C - radius * Math.sin(angle) };
}

/** Evita sobreposição de glifos de planetas próximos. */
function spreadLongitudes(longitudes: number[], minGap = 9): number[] {
  const order = longitudes.map((lon, i) => ({ lon, i })).sort((a, b) => a.lon - b.lon);
  const adjusted = order.map((o) => o.lon);
  for (let pass = 0; pass < 10; pass++) {
    for (let k = 1; k < adjusted.length; k++) {
      const gap = adjusted[k] - adjusted[k - 1];
      if (gap < minGap) {
        const push = (minGap - gap) / 2;
        adjusted[k - 1] -= push;
        adjusted[k] += push;
      }
    }
  }
  const result: number[] = [];
  order.forEach((o, k) => {
    result[o.i] = adjusted[k];
  });
  return result;
}

export function ChartWheel({ chart }: { chart: NatalChart }) {
  const rotation = chart.ascendant ? chart.ascendant.longitude : 0;
  const displayed = spreadLongitudes(chart.planets.map((p) => p.longitude));

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Roda do mapa astral com os signos e as posições dos planetas"
      className="mx-auto h-auto w-full max-w-md"
    >
      <circle cx={C} cy={C} r={R_OUT} className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" />
      <circle cx={C} cy={C} r={R_SIGN - 18} className="fill-none stroke-zinc-200 dark:stroke-zinc-800" />
      <circle cx={C} cy={C} r={R_IN} className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" />

      {SIGNS.map((sign, i) => {
        const start = point(i * 30, R_OUT, rotation);
        const inner = point(i * 30, R_SIGN - 18, rotation);
        const mid = point(i * 30 + 15, R_SIGN, rotation);
        return (
          <g key={sign.name}>
            <line x1={start.x} y1={start.y} x2={inner.x} y2={inner.y} className="stroke-zinc-300 dark:stroke-zinc-700" />
            <text
              x={mid.x}
              y={mid.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="17"
              fill={ELEMENT_COLOR[sign.element]}
            >
              {sign.glyph}
            </text>
          </g>
        );
      })}

      {chart.aspects.map((aspect) => {
        const a = chart.planets.find((p) => p.key === aspect.a)!;
        const b = chart.planets.find((p) => p.key === aspect.b)!;
        const pa = point(a.longitude, R_IN - 4, rotation);
        const pb = point(b.longitude, R_IN - 4, rotation);
        const color =
          aspect.type === "trígono" || aspect.type === "sextil"
            ? "#22c55e"
            : aspect.type === "conjunção"
              ? "#a1a1aa"
              : "#ef4444";
        return (
          <line
            key={`${aspect.a}-${aspect.b}`}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={color}
            strokeWidth="1"
            opacity="0.45"
          />
        );
      })}

      {chart.planets.map((planet, i) => {
        const info = PLANETS.find((p) => p.key === planet.key)!;
        const tick1 = point(planet.longitude, R_SIGN - 18, rotation);
        const tick2 = point(planet.longitude, R_SIGN - 26, rotation);
        const label = point(displayed[i], R_PLANET, rotation);
        return (
          <g key={planet.key}>
            <line x1={tick1.x} y1={tick1.y} x2={tick2.x} y2={tick2.y} className="stroke-amber-500" strokeWidth="1.5" />
            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              className="fill-zinc-900 dark:fill-zinc-100"
            >
              {info.glyph}
              <title>{`${info.name} em ${signOf(planet).name} ${planet.degree}°${String(planet.minutes).padStart(2, "0")}'`}</title>
            </text>
          </g>
        );
      })}

      {chart.ascendant && chart.midheaven && (
        <>
          {[
            { label: "ASC", lon: chart.ascendant.longitude },
            { label: "MC", lon: chart.midheaven.longitude },
          ].map((angle) => {
            const edge = point(angle.lon, R_OUT, rotation);
            const inner = point(angle.lon, R_IN, rotation);
            const text = point(angle.lon, R_OUT + 0, rotation);
            return (
              <g key={angle.label}>
                <line x1={edge.x} y1={edge.y} x2={inner.x} y2={inner.y} className="stroke-amber-500" strokeWidth="2" />
                <text
                  x={text.x + (angle.label === "ASC" ? 6 : 0)}
                  y={text.y + (angle.label === "MC" ? -8 : -8)}
                  fontSize="11"
                  fontWeight="700"
                  className="fill-amber-600 dark:fill-amber-400"
                >
                  {angle.label}
                </text>
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}

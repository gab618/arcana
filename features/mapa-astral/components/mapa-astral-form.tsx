"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ShareButtons } from "@/components/share-buttons";
import { trackTarotEvent } from "@/lib/analytics";
import {
  computeNatalChart,
  isValidTimeZone,
  signOf,
  type ChartInput,
  type NatalChart,
  type Position,
} from "../calculate";
import { searchPlaces, type PlaceResult } from "../geocode";
import { ASPECTS, HOUSE_THEMES, PLANETS, SIGNS } from "../zodiac";
import { ChartWheel } from "./chart-wheel";

type Mode = "simple" | "full";
type PlaceMode = "search" | "manual";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100";

function todayISO() {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

function formatPosition(p: Position) {
  const sign = signOf(p);
  return `${p.degree}°${String(p.minutes).padStart(2, "0")}' ${sign.glyph} ${sign.name}`;
}

export function MapaAstralForm() {
  const [mode, setMode] = useState<Mode>("simple");
  const [placeMode, setPlaceMode] = useState<PlaceMode>("search");
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [places, setPlaces] = useState<PlaceResult[] | null>(null);
  const [place, setPlace] = useState<PlaceResult | null>(null);

  const [result, setResult] = useState<{
    chart: NatalChart;
    input: ChartInput;
    placeLabel?: string;
  } | null>(null);

  async function handleSearch() {
    setError(null);
    setPlaces(null);
    setSearching(true);
    try {
      const found = await searchPlaces(query);
      setPlaces(found);
      if (found.length === 0) setError("Nenhuma cidade encontrada. Tente outro nome ou use coordenadas manuais.");
    } catch {
      setError("Não foi possível buscar a cidade agora. Use as coordenadas manuais.");
    } finally {
      setSearching(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const date = String(data.get("date") ?? "");
    const time = String(data.get("time") ?? "");

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return setError("Informe uma data de nascimento válida.");
    if (date > todayISO()) return setError("A data de nascimento não pode estar no futuro.");
    if (date < "1900-01-01") return setError("Use uma data a partir de 1900.");

    let input: ChartInput = { date, time: time || undefined };
    let placeLabel: string | undefined;

    if (mode === "full") {
      if (!time) return setError("Informe o horário de nascimento para calcular Ascendente e casas.");

      if (placeMode === "search") {
        if (!place) return setError("Busque e selecione a cidade de nascimento.");
        input = { ...input, location: place };
        placeLabel = `${place.name}, ${place.region}`;
      } else {
        const latitude = Number(String(data.get("lat")).replace(",", "."));
        const longitude = Number(String(data.get("lon")).replace(",", "."));
        const timezone = String(data.get("tz") ?? "").trim() || "America/Sao_Paulo";
        if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90)
          return setError("Latitude inválida (use um valor entre -90 e 90).");
        if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180)
          return setError("Longitude inválida (use um valor entre -180 e 180).");
        if (!isValidTimeZone(timezone))
          return setError("Fuso horário inválido. Exemplo: America/Sao_Paulo.");
        input = { ...input, location: { latitude, longitude, timezone } };
        placeLabel = `${latitude.toFixed(2)}, ${longitude.toFixed(2)} (${timezone})`;
      }
    }

    const chart = computeNatalChart(input);
    trackTarotEvent(
      mode === "full" ? "mapa_astral_completo" : "mapa_astral_simples",
      "mapa_astral",
      String(chart.planets[0].signIndex),
    );
    setResult({ chart, input, placeLabel });
  }

  const sun = result?.chart.planets.find((p) => p.key === "sun");
  const moon = result?.chart.planets.find((p) => p.key === "moon");

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 text-sm font-medium">Tipo de mapa</legend>
          {(
            [
              ["simple", "Sem coordenadas", "Só a data (hora opcional). Mostra planetas nos signos e aspectos."],
              ["full", "Com coordenadas", "Data, hora e local. Inclui Ascendente, Meio do Céu e casas."],
            ] as const
          ).map(([value, title, desc]) => (
            <label
              key={value}
              className={`cursor-pointer rounded-xl border p-4 text-sm transition ${
                mode === value
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800"
              }`}
            >
              <input
                type="radio"
                name="mode"
                value={value}
                checked={mode === value}
                onChange={() => setMode(value)}
                className="sr-only"
              />
              <span className="font-semibold">{title}</span>
              <span className="mt-1 block text-xs text-zinc-600 dark:text-zinc-400">{desc}</span>
            </label>
          ))}
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium">
            Data de nascimento
            <input name="date" type="date" min="1900-01-01" className={inputClass} required />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Hora de nascimento{" "}
            <span className="text-xs font-normal text-zinc-500">
              {mode === "full" ? "(obrigatória)" : "(opcional)"}
            </span>
            <input name="time" type="time" className={inputClass} required={mode === "full"} />
          </label>
        </div>

        {mode === "full" && (
          <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex gap-4 text-sm">
              {(
                [
                  ["search", "Buscar cidade"],
                  ["manual", "Informar coordenadas"],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="placeMode"
                    checked={placeMode === value}
                    onChange={() => setPlaceMode(value)}
                  />
                  {label}
                </label>
              ))}
            </div>

            {placeMode === "search" ? (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPlace(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void handleSearch();
                      }
                    }}
                    placeholder="Cidade de nascimento (ex.: Belo Horizonte)"
                    aria-label="Cidade de nascimento"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={searching || query.trim().length < 2}
                    className="shrink-0 cursor-pointer rounded-lg border border-zinc-300 px-4 text-sm font-medium transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    {searching ? "Buscando…" : "Buscar"}
                  </button>
                </div>
                {places && places.length > 0 && (
                  <ul className="flex flex-col gap-1.5" aria-label="Resultados da busca">
                    {places.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setPlace(p)}
                          className={`w-full cursor-pointer rounded-lg border px-3 py-2 text-left text-sm transition ${
                            place?.id === p.id
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800"
                          }`}
                        >
                          <span className="font-medium">{p.name}</span>
                          <span className="text-zinc-500"> · {p.region}</span>
                          <span className="block text-xs text-zinc-500">
                            {p.latitude.toFixed(2)}, {p.longitude.toFixed(2)} · {p.timezone}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {place && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Local selecionado: {place.name}, {place.region}
                  </p>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Latitude
                  <input name="lat" inputMode="decimal" placeholder="-19.92" className={inputClass} />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Longitude
                  <input name="lon" inputMode="decimal" placeholder="-43.94" className={inputClass} />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Fuso horário
                  <input name="tz" defaultValue="America/Sao_Paulo" className={inputClass} />
                </label>
                <p className="text-xs text-zinc-500 sm:col-span-3">
                  Use graus decimais (sul e oeste são negativos). O fuso IANA cuida do horário de verão histórico.
                </p>
              </div>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2.5 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Gerar meu mapa astral
        </button>
        <p className="text-xs text-zinc-500">
          O cálculo é feito no seu navegador. Data, hora e coordenadas não são enviadas a nenhum servidor
          {mode === "full" && placeMode === "search" && " — apenas o nome da cidade é consultado no serviço público Open-Meteo para obter latitude e longitude"}
          .
        </p>
      </form>

      {result && sun && moon && (
        <section aria-live="polite" className="space-y-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <header>
            <h2 className="text-2xl font-bold tracking-tight">Seu mapa astral</h2>
            <p className="mt-1 text-xs text-zinc-500">
              {result.input.date.split("-").reverse().join("/")}
              {result.input.time ? ` às ${result.input.time}` : ""}
              {result.placeLabel ? ` · ${result.placeLabel}` : ""}
            </p>
          </header>

          <ChartWheel chart={result.chart} />

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Sol", pos: sun },
              { label: "Lua", pos: moon },
              ...(result.chart.ascendant ? [{ label: "Ascendente", pos: result.chart.ascendant }] : []),
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-950/70">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-bold">{signOf(item.pos).name}</p>
                <p className="text-xs text-zinc-500">{signOf(item.pos).element} · {signOf(item.pos).modality}</p>
              </div>
            ))}
          </div>

          {result.chart.moonApproximate && (
            <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-zinc-700 dark:text-zinc-300">
              Sem a hora de nascimento, calculamos para as 12:00 — a Lua anda cerca de 13° por dia, então o signo
              lunar pode estar diferente se você nasceu no início ou no fim do dia.
            </p>
          )}

          <div>
            <h3 className="text-lg font-semibold">Planetas nos signos</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="py-2 pr-3">Astro</th>
                    <th className="py-2 pr-3">Posição</th>
                    {result.chart.mode === "full" && <th className="py-2 pr-3">Casa</th>}
                    <th className="py-2">Arcano afim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {result.chart.planets.map((p) => {
                    const info = PLANETS.find((i) => i.key === p.key)!;
                    return (
                      <tr key={p.key}>
                        <td className="py-2 pr-3 font-medium">
                          {info.glyph} {info.name}
                          {p.retrograde && (
                            <span className="ml-1 text-xs text-red-500" title="Retrógrado">℞</span>
                          )}
                        </td>
                        <td className="py-2 pr-3">{formatPosition(p)}</td>
                        {result.chart.mode === "full" && <td className="py-2 pr-3">{p.house}</td>}
                        <td className="py-2">
                          <Link href={`/arcanos/${info.arcanumSlug}`} className="underline underline-offset-4">
                            {info.arcanumName}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  {result.chart.ascendant && result.chart.midheaven && (
                    <>
                      <tr>
                        <td className="py-2 pr-3 font-medium">Ascendente</td>
                        <td className="py-2 pr-3">{formatPosition(result.chart.ascendant)}</td>
                        <td className="py-2 pr-3">1</td>
                        <td className="py-2">—</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3 font-medium">Meio do Céu</td>
                        <td className="py-2 pr-3">{formatPosition(result.chart.midheaven)}</td>
                        <td className="py-2 pr-3">—</td>
                        <td className="py-2">—</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">O que cada posição sugere</h3>
            {result.chart.planets.slice(0, 5).map((p) => {
              const info = PLANETS.find((i) => i.key === p.key)!;
              const sign = SIGNS[p.signIndex];
              const sign_arcanum = sign.arcanumName;
              return (
                <p key={p.key} className="text-sm text-zinc-700 dark:text-zinc-300">
                  <strong>
                    {info.name} em {sign.name}:
                  </strong>{" "}
                  {info.theme} {sign.expression}.
                  {p.house && <> Ocupa a casa {p.house}, ligada a {HOUSE_THEMES[p.house - 1]}.</>}{" "}
                  <span className="text-zinc-500">
                    Arcano do signo:{" "}
                    <Link href={`/arcanos/${sign.arcanumSlug}`} className="underline underline-offset-4">
                      {sign_arcanum}
                    </Link>
                    .
                  </span>
                </p>
              );
            })}
            {result.chart.ascendant && (
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                <strong>Ascendente em {signOf(result.chart.ascendant).name}:</strong> a forma como você se apresenta
                ao mundo e inicia as coisas tende a se mostrar {signOf(result.chart.ascendant).expression}.
              </p>
            )}
          </div>

          {result.chart.aspects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Aspectos principais</h3>
              <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
                {result.chart.aspects.slice(0, 12).map((a) => {
                  const pa = PLANETS.find((p) => p.key === a.a)!;
                  const pb = PLANETS.find((p) => p.key === a.b)!;
                  const color = ASPECTS.find((x) => x.type === a.type)!.color;
                  return (
                    <li key={`${a.a}-${a.b}`} className="flex items-center gap-2">
                      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
                      {pa.glyph} {pa.name} {a.type} {pb.glyph} {pb.name}
                      <span className="text-xs text-zinc-500">({a.orb.toFixed(1)}°)</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="flex justify-center sm:justify-start">
            <ShareButtons
              title={`Meu Mapa Astral: Sol em ${signOf(sun).name}, Lua em ${signOf(moon).name}`}
              text={`Fiz meu mapa astral: Sol em ${signOf(sun).name}, Lua em ${signOf(moon).name}${
                result.chart.ascendant ? `, Ascendente em ${signOf(result.chart.ascendant).name}` : ""
              }! Descubra o seu:`}
              path="/mapa-astral"
            />
          </div>

          <p className="text-xs text-zinc-500">
            Interpretações com caráter de entretenimento e autoconhecimento. Casas calculadas pelo sistema de
            signos inteiros; posições geocêntricas tropicais.
          </p>
        </section>
      )}
    </div>
  );
}

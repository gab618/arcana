"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ShareButtons } from "@/components/share-buttons";
import { ArcanoCard } from "@/features/arcano-pessoal/components/arcano-card";
import { trackTarotEvent } from "@/lib/analytics";
import { getArcanumByNumber } from "@/lib/tarot/major-arcana";
import type { MajorArcanum } from "@/lib/tarot/types";
import {
  calculateAnnualArcanum,
  getLatestBirthdayYear,
} from "../calculate";

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

type CalculationResult = {
  arcanum: MajorArcanum;
  birthDateFormatted: string;
  referenceYear: number;
  cycleStart: string;
  cycleEnd: string;
  birthSum: number;
  total: number;
  digitsSum: number;
  final: number;
};

export function ArcanoAnualForm() {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [customYear, setCustomYear] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const birth = String(data.get("birth") ?? "");

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
      setError("Informe uma data de nascimento válida.");
      return;
    }
    if (birth > todayISO()) {
      setError("A data de nascimento não pode estar no futuro.");
      return;
    }

    setError(null);
    const [year, month, day] = birth.split("-").map(Number);

    // Se o usuário digitou um ano de referência customizado, usa ele.
    // Senão, calcula o ano do último aniversário em relação a hoje.
    let refYear = Number(customYear);
    if (!refYear || isNaN(refYear)) {
      refYear = getLatestBirthdayYear(day, month);
    }

    const calc = calculateAnnualArcanum(day, month, year, refYear);
    const arcanum = getArcanumByNumber(calc.final);

    const pad = (n: number) => String(n).padStart(2, "0");
    const birthFormatted = `${pad(day)}/${pad(month)}/${year}`;
    const cycleStart = `${pad(day)}/${pad(month)}/${refYear}`;
    const cycleEnd = `${pad(day)}/${pad(month)}/${refYear + 1}`;

    trackTarotEvent("calcular_arcano_anual", "arcano_anual", String(calc.final));

    setResult({
      arcanum,
      birthDateFormatted: birthFormatted,
      referenceYear: refYear,
      cycleStart,
      cycleEnd,
      birthSum: calc.birthSum,
      total: calc.total,
      digitsSum: calc.digitsSum,
      final: calc.final,
    });
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100";

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Data de nascimento
          <input
            name="birth"
            type="date"
            min="1900-01-01"
            className={inputClass}
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Ano do aniversário a consultar{" "}
          <span className="text-xs font-normal text-zinc-500">
            (opcional — deixe em branco para o ciclo do último aniversário)
          </span>
          <input
            type="number"
            min="1900"
            max="2100"
            placeholder="Ex: 2026"
            value={customYear}
            onChange={(e) => setCustomYear(e.target.value)}
            className={inputClass}
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Calcular meu arcano anual
        </button>

        <p className="text-xs text-zinc-500">
          O cálculo é feito localmente no seu navegador. Nenhuma data é enviada
          para o servidor.
        </p>
      </form>

      {result && (
        <section
          aria-live="polite"
          className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Link
              href={`/arcanos/${result.arcanum.slug}`}
              className="w-40 shrink-0 transition-transform hover:scale-105"
              aria-label={`Ver significado de ${result.arcanum.name}`}
            >
              <ArcanoCard arcanum={result.arcanum} priority />
            </Link>

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <span className="inline-block rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                Arcano {result.arcanum.number}
              </span>
              <h2 className="text-2xl font-bold tracking-tight">
                {result.arcanum.name}
              </h2>

              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                📅 Ciclo de vigência:{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {result.cycleStart} a {result.cycleEnd}
                </span>
              </p>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {result.arcanum.summary}
              </p>

              <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 text-left text-xs dark:border-zinc-750 dark:bg-zinc-950/70">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Passo a passo do seu cálculo:
                </p>
                <ul className="mt-2 space-y-1 font-mono text-zinc-600 dark:text-zinc-400">
                  <li>
                    1. Data de nascimento:{" "}
                    <strong>{result.birthDateFormatted}</strong> → soma:{" "}
                    <strong>{result.birthSum}</strong>
                  </li>
                  <li>
                    2. Soma com o ano do aniversário (
                    <strong>{result.referenceYear}</strong>): {result.birthSum} +{" "}
                    {result.referenceYear} = <strong>{result.total}</strong>
                  </li>
                  <li>
                    3. Soma dos dígitos de {result.total}:{" "}
                    <strong>{result.digitsSum}</strong>
                    {result.digitsSum > 22 && (
                      <> → reduzido para {result.final}</>
                    )}
                  </li>
                  <li className="pt-1 text-zinc-900 dark:text-zinc-100">
                    → Arcano Regente: <strong>{result.final} ({result.arcanum.name})</strong>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center pt-2 sm:justify-start">
                <ShareButtons
                  title={`Meu Arcano Anual: ${result.arcanum.name}`}
                  text={`Meu Arcano Anual (${result.cycleStart} a ${result.cycleEnd}) é ${result.arcanum.name} (Arcano ${result.arcanum.number})! Calcule o seu também:`}
                  path="/arcano-anual"
                />
              </div>

              <div className="pt-1">
                <Link
                  href={`/arcanos/${result.arcanum.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
                >
                  Ver significado completo de {result.arcanum.name} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

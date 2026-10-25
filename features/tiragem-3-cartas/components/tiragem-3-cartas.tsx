"use client";

import Link from "next/link";
import { useState } from "react";
import { ShareButtons } from "@/components/share-buttons";
import { ArcanoCard } from "@/features/arcano-pessoal/components/arcano-card";
import { trackTarotEvent } from "@/lib/analytics";
import { SITE_NAME } from "@/lib/site";
import { getArcanumByNumber } from "@/lib/tarot/major-arcana";
import {
  SPREAD_MODELS,
  createShuffledDeck,
  cutDeck,
  type SpreadModelId,
} from "../spread";

type Stage = "intencao" | "baralho" | "leque" | "revelacao";

function MiniCardBack({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center rounded-lg border border-amber-400/50 bg-gradient-to-br from-[#1b1730] to-[#0b0a12] shadow-md ${className}`}
    >
      <div className="pointer-events-none absolute inset-1.5 rounded border border-amber-400/25" />
      <svg viewBox="0 0 32 32" className="h-2/5 w-2/5" fill="none">
        <path
          d="M16 3 L18.2 11.5 L25.7 11.5 L19.6 16 L21.8 23.5 L16 19.2 L10.2 23.5 L12.4 16 L6.3 11.5 L13.8 11.5 Z"
          fill="#d4af37"
        />
        <circle cx="16" cy="15" r="2.2" fill="#fff" opacity="0.9" />
      </svg>
    </div>
  );
}

export function TiragemTresCartas() {
  const [modelId, setModelId] = useState<SpreadModelId>("tempo");
  const [question, setQuestion] = useState("");
  const [stage, setStage] = useState<Stage>("intencao");

  const [deck, setDeck] = useState<number[]>([]);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [hasCut, setHasCut] = useState(false);

  const [pickedNumbers, setPickedNumbers] = useState<number[]>([]);
  const [revealedSlots, setRevealedSlots] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);

  const model = SPREAD_MODELS[modelId];
  const allRevealed =
    pickedNumbers.length === 3 &&
    revealedSlots[0] &&
    revealedSlots[1] &&
    revealedSlots[2];

  function handleStartTable() {
    setDeck(createShuffledDeck());
    setShuffleCount(1);
    setHasCut(false);
    setPickedNumbers([]);
    setRevealedSlots([false, false, false]);
    setStage("baralho");
  }

  function handleShuffle() {
    setIsShuffling(true);
    setHasCut(false);
    setDeck(createShuffledDeck());
    setShuffleCount((c) => c + 1);
    setTimeout(() => setIsShuffling(false), 450);
  }

  function handleCut() {
    setDeck((prev) => cutDeck(prev));
    setHasCut(true);
  }

  function handlePickCard(cardNumber: number) {
    if (pickedNumbers.includes(cardNumber) || pickedNumbers.length >= 3) return;
    const next = [...pickedNumbers, cardNumber];
    setPickedNumbers(next);
    if (next.length === 3) {
      trackTarotEvent("tiragem_3_cartas_completa", "tiragem_3_cartas", modelId);
      setStage("revelacao");
    }
  }

  function handleRevealSlot(index: 0 | 1 | 2) {
    setRevealedSlots((prev) => {
      const next: [boolean, boolean, boolean] = [...prev];
      next[index] = true;
      return next;
    });
  }

  function handleRevealAll() {
    setRevealedSlots([true, true, true]);
  }

  function handleReset() {
    setStage("intencao");
    setPickedNumbers([]);
    setRevealedSlots([false, false, false]);
    setHasCut(false);
  }

  return (
    <div className="space-y-8">
      {/* Etapa 1: Intenção e escolha do modelo */}
      {stage === "intencao" && (
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h2 className="text-xl font-semibold">
            1. Escolha o modelo e firme sua intenção
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Respire fundo por alguns instantes e escolha como as 3 cartas devem
            responder à sua questão.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(Object.keys(SPREAD_MODELS) as SpreadModelId[]).map((id) => {
              const item = SPREAD_MODELS[id];
              const active = modelId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setModelId(id)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-amber-500/80 bg-amber-500/10 dark:border-amber-400/70"
                      : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                  }`}
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>

          <label className="mt-5 flex flex-col gap-1.5 text-sm font-medium">
            <span>
              Sua questão ou intenção{" "}
              <span className="text-xs font-normal text-zinc-500">
                (opcional — você também pode apenas mentalizar)
              </span>
            </span>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Como conduzir minha transição profissional?"
              className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
            />
          </label>

          <button
            type="button"
            onClick={handleStartTable}
            className="mt-6 cursor-pointer rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Preparar a mesa e o baralho →
          </button>
        </section>
      )}

      {/* A Mesa Ritual (Etapas 2, 3 e 4) */}
      {stage !== "intencao" && (
        <section
          aria-label="Mesa de tiragem"
          className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#171327] via-[#110e1d] to-[#0b0a12] p-6 text-zinc-100 shadow-xl sm:p-8"
        >
          {/* Cabeçalho da mesa */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-400/20 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {model.title}
              </p>
              {question.trim() && (
                <p className="mt-0.5 text-sm italic text-zinc-300">
                  “{question.trim()}”
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer text-xs text-zinc-400 underline underline-offset-4 hover:text-zinc-200"
            >
              Recomeçar ritual
            </button>
          </div>

          {/* Etapa 2: Embaralhar e Cortar */}
          {stage === "baralho" && (
            <div className="py-8 text-center">
              <p className="text-sm text-zinc-300">
                Concentre-se na sua questão. Embaralhe quantas vezes sentir
                necessário e corte o maço antes de abrir o leque.
              </p>

              {/* Representação visual do maço / corte */}
              <div className="my-8 flex items-center justify-center gap-6">
                {!hasCut ? (
                  <div className="relative h-44 w-28">
                    <MiniCardBack
                      className={`absolute inset-0 transition-transform duration-300 ${
                        isShuffling
                          ? "-translate-x-4 -rotate-12"
                          : "-translate-x-1.5 -rotate-3"
                      }`}
                    />
                    <MiniCardBack
                      className={`absolute inset-0 transition-transform duration-300 ${
                        isShuffling
                          ? "translate-x-4 rotate-12"
                          : "translate-x-1.5 rotate-3"
                      }`}
                    />
                    <MiniCardBack className="absolute inset-0" />
                  </div>
                ) : (
                  <div className="flex items-center gap-6">
                    <div className="h-40 w-24 -rotate-3 transition-transform">
                      <MiniCardBack className="h-full w-full" />
                    </div>
                    <div className="h-40 w-24 translate-y-2 rotate-3 transition-transform">
                      <MiniCardBack className="h-full w-full" />
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-amber-300/90">
                {hasCut
                  ? "Baralho cortado e consagrado para a sua leitura."
                  : `Maço embaralhado (${shuffleCount}x).`}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="cursor-pointer rounded-lg border border-amber-400/40 bg-white/5 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-white/10"
                >
                  🔀 Embaralhar mais
                </button>
                <button
                  type="button"
                  onClick={handleCut}
                  disabled={hasCut}
                  className="cursor-pointer rounded-lg border border-amber-400/40 bg-white/5 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ✂️ Cortar o baralho
                </button>
                <button
                  type="button"
                  onClick={() => setStage("leque")}
                  className="cursor-pointer rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                >
                  Abrir leque na mesa →
                </button>
              </div>
            </div>
          )}

          {/* Slots das 3 posições na mesa (visíveis nas etapas "leque" e "revelacao") */}
          {(stage === "leque" || stage === "revelacao") && (
            <div className="mt-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {model.positions.map((pos) => {
                  const cardNumber = pickedNumbers[pos.index];
                  const arcanum = cardNumber
                    ? getArcanumByNumber(cardNumber)
                    : null;
                  const isRevealed = revealedSlots[pos.index];

                  return (
                    <div
                      key={pos.index}
                      className="flex flex-col items-center text-center"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                        {pos.index + 1}. {pos.label}
                      </span>

                      <div className="mt-2 aspect-[600/1050] w-full max-w-[160px]">
                        {!arcanum ? (
                          <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-amber-400/30 bg-white/5 p-2 text-xs text-zinc-400">
                            {pickedNumbers.length === pos.index
                              ? "Escolha no leque ↓"
                              : "Aguardando"}
                          </div>
                        ) : (
                          <div className="h-full w-full perspective-distant">
                            <div
                              className={`relative h-full w-full transition-transform duration-700 transform-3d motion-reduce:duration-0 ${
                                isRevealed ? "rotate-y-180" : ""
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => handleRevealSlot(pos.index)}
                                disabled={isRevealed}
                                aria-label={`Revelar carta de ${pos.label}`}
                                className="group absolute inset-0 h-full w-full cursor-pointer backface-hidden"
                              >
                                <MiniCardBack className="h-full w-full rounded-xl transition group-hover:scale-[1.03] group-hover:border-amber-300" />
                                <span className="absolute inset-x-1 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-amber-200">
                                  Toque para virar
                                </span>
                              </button>

                              {isRevealed && (
                                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                                  <ArcanoCard
                                    arcanum={arcanum}
                                    sizes="(min-width: 640px) 160px, 30vw"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {arcanum && isRevealed && (
                        <p className="mt-2 text-xs font-semibold text-zinc-100 sm:text-sm">
                          {arcanum.number}. {arcanum.name}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Leque de 22 cartas para escolher (apenas enquanto escolhe as 3) */}
              {stage === "leque" && (
                <div className="mt-8 border-t border-amber-400/20 pt-6">
                  <p className="text-center text-sm text-amber-200">
                    Escolha a{" "}
                    <strong>
                      {pickedNumbers.length + 1}ª carta (
                      {model.positions[pickedNumbers.length as 0 | 1 | 2].label}
                      )
                    </strong>{" "}
                    tocando em uma das 22 cartas abaixo:
                  </p>

                  <div className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-11 sm:gap-2.5">
                    {deck.map((cardNumber, idx) => {
                      const alreadyPicked = pickedNumbers.includes(cardNumber);
                      return (
                        <button
                          key={cardNumber}
                          type="button"
                          disabled={alreadyPicked}
                          onClick={() => handlePickCard(cardNumber)}
                          aria-label={`Escolher carta ${idx + 1} do leque`}
                          className={`aspect-[600/1050] w-full transition ${
                            alreadyPicked
                              ? "pointer-events-none scale-90 opacity-15"
                              : "cursor-pointer hover:-translate-y-1.5"
                          }`}
                        >
                          <MiniCardBack className="h-full w-full" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Controles de revelação quando as 3 cartas estão na mesa */}
              {stage === "revelacao" && !allRevealed && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-zinc-300">
                    Toque em cada carta na mesa para virá-la no seu ritmo.
                  </p>
                  <button
                    type="button"
                    onClick={handleRevealAll}
                    className="mt-3 cursor-pointer rounded-lg border border-amber-400/40 bg-white/10 px-4 py-1.5 text-xs font-medium text-amber-200 transition hover:bg-white/15"
                  >
                    Revelar todas de uma vez
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Leitura de cada carta revelada */}
      {stage === "revelacao" && revealedSlots.some(Boolean) && (
        <section aria-live="polite" className="space-y-4">
          <h2 className="text-xl font-semibold">Interpretação das Posições</h2>

          <div className="grid gap-4">
            {model.positions.map((pos) => {
              if (!revealedSlots[pos.index]) return null;
              const arcanum = getArcanumByNumber(pickedNumbers[pos.index]);

              return (
                <article
                  key={pos.index}
                  className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-5 sm:flex-row sm:items-center dark:border-zinc-800"
                >
                  <Link
                    href={`/arcanos/${arcanum.slug}`}
                    className="w-24 shrink-0 transition-transform hover:scale-105"
                    aria-label={`Ver significado de ${arcanum.name}`}
                  >
                    <ArcanoCard arcanum={arcanum} sizes="96px" />
                  </Link>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {pos.index + 1}. {pos.label} — {pos.prompt}
                    </p>
                    <h3 className="text-lg font-bold">
                      Arcano {arcanum.number} · {arcanum.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {arcanum.summary}
                    </p>
                    <Link
                      href={`/arcanos/${arcanum.slug}`}
                      className="inline-block pt-1 text-xs font-medium underline underline-offset-4 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      Ver significado completo de {arcanum.name} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {allRevealed && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Compartilhar sua tiragem ({model.title}):
                </p>
                <ShareButtons
                  title={`Minha Tiragem de 3 Cartas (${model.title}) · ${SITE_NAME}`}
                  text={`Minha tiragem de 3 cartas (${model.title}) no ${SITE_NAME} revelou: ${model.positions
                    .map(
                      (p) =>
                        `${p.label}: ${getArcanumByNumber(pickedNumbers[p.index]).name}`,
                    )
                    .join(" · ")}. Faça a sua tiragem:`}
                  path="/tiragem-3-cartas"
                />
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2 text-xs font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Fazer nova tiragem
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

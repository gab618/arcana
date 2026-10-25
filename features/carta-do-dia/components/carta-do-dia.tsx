"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ShareButtons } from "@/components/share-buttons";
import { ArcanoCard } from "@/features/arcano-pessoal/components/arcano-card";
import { trackTarotEvent } from "@/lib/analytics";
import { getArcanumByNumber } from "@/lib/tarot/major-arcana";
import {
  DAILY_CARD_STORAGE_KEY,
  drawArcanumNumber,
  parseStoredDraw,
  serializeDraw,
  todayKey,
} from "../draw";

const CHANGE_EVENT = "arcana:daily-card-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** Só roda no navegador. Devolve a carta sorteada hoje, ou null. */
function getSnapshot(): number | null {
  try {
    return parseStoredDraw(
      window.localStorage.getItem(DAILY_CARD_STORAGE_KEY),
      todayKey(),
    );
  } catch {
    return null; // localStorage bloqueado (ex.: modo privado)
  }
}

/** No servidor/prerender a carta nunca está revelada. */
function getServerSnapshot(): number | null {
  return null;
}

function CardBack() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center rounded-xl border border-amber-400/40 bg-gradient-to-br from-[#181528] to-[#0b0a12] shadow-lg backface-hidden"
    >
      <div className="absolute inset-2 rounded-lg border border-amber-400/30" />
      <svg viewBox="0 0 32 32" className="h-1/3 w-1/3" fill="none">
        <path
          d="M16 3 L18.2 11.5 L25.7 11.5 L19.6 16 L21.8 23.5 L16 19.2 L10.2 23.5 L12.4 16 L6.3 11.5 L13.8 11.5 Z"
          fill="#d4af37"
        />
        <circle cx="16" cy="15" r="2.2" fill="#fff" opacity="0.9" />
      </svg>
    </div>
  );
}

export function CartaDoDia() {
  const storedNumber = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  // Plano B para quando o localStorage não puder ser usado: vale só até recarregar.
  const [fallbackNumber, setFallbackNumber] = useState<number | null>(null);

  const number = storedNumber ?? fallbackNumber;
  const arcanum = number ? getArcanumByNumber(number) : null;

  function handleDraw() {
    const drawn = drawArcanumNumber();
    trackTarotEvent("tirar_carta_do_dia", "carta_do_dia", String(drawn));
    try {
      window.localStorage.setItem(
        DAILY_CARD_STORAGE_KEY,
        serializeDraw(todayKey(), drawn),
      );
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      setFallbackNumber(drawn);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
      <div className="aspect-[600/1050] w-44 shrink-0 perspective-distant sm:w-52">
        <div
          className={`relative h-full w-full transition-transform duration-700 transform-3d motion-reduce:duration-0 ${
            arcanum ? "rotate-y-180" : ""
          }`}
        >
          <CardBack />
          {arcanum && (
            <div className="absolute inset-0 rotate-y-180 backface-hidden">
              <Link
                href={`/arcanos/${arcanum.slug}`}
                className="block h-full w-full transition-transform hover:scale-105"
                aria-label={`Ver significado de ${arcanum.name}`}
              >
                <ArcanoCard arcanum={arcanum} sizes="208px" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left" aria-live="polite">
        {arcanum ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Sua carta de hoje · Arcano {arcanum.number}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              {arcanum.name}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {arcanum.summary}
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              A energia de hoje já foi revelada. Volte amanhã para uma nova
              carta.
            </p>
            <div className="mt-4 flex justify-center sm:justify-start">
              <ShareButtons
                title={`Minha Carta do Dia: ${arcanum.name}`}
                text={`Minha Carta do Dia no Tarot hoje é ${arcanum.name} (Arcano ${arcanum.number})! Tire a sua carta de hoje:`}
                path="/carta-do-dia"
              />
            </div>
            <Link
              href={`/arcanos/${arcanum.slug}`}
              className="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Ver significado completo de {arcanum.name} →
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold tracking-tight">Carta do Dia</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Respire fundo, foque no seu dia e revele a carta que traz a
              energia de hoje.
            </p>
            <button
              type="button"
              onClick={handleDraw}
              className="mt-4 cursor-pointer rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Tirar minha carta de hoje
            </button>
            <p className="mt-3 text-xs text-zinc-500">
              Sua carta fica salva só neste navegador. Nada é enviado a nenhum
              servidor.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

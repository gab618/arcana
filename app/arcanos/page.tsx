import type { Metadata } from "next";
import Link from "next/link";
import { ArcanoCard } from "@/features/arcano-pessoal/components/arcano-card";
import { MAJOR_ARCANA } from "@/lib/tarot/major-arcana";
import { MINOR_ARCANA, SUITS_META } from "@/lib/tarot/minor-arcana";
import type { TarotSuit } from "@/lib/tarot/types";

export const metadata: Metadata = {
  title: "Os 78 Arcanos do Tarot – Maiores e Menores",
  description:
    "Explore as 78 cartas do Tarot: os 22 Arcanos Maiores e os 56 Arcanos Menores (Copas, Ouros, Espadas e Paus) com imagens clássicas e significados.",
  alternates: { canonical: "/arcanos" },
};

const SUITS_ORDER: readonly TarotSuit[] = [
  "copas",
  "ouros",
  "espadas",
  "paus",
];

const SUIT_ICONS: Record<TarotSuit, string> = {
  copas: "♥️",
  ouros: "♦️",
  espadas: "♠️",
  paus: "♣️",
};

export default function ArcanosPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Os 78 Arcanos do Tarot
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          O baralho completo é composto pelos <strong>22 Arcanos Maiores</strong>,
          que representam as grandes jornadas da alma e arquétipos universais, e
          pelos <strong>56 Arcanos Menores</strong>, que expressam os eventos,
          desafios e emoções da vida prática distribuídos em quatro naipes.
        </p>

        {/* Navegação rápida por âncoras */}
        <nav
          aria-label="Seções do baralho"
          className="mt-6 flex flex-wrap gap-2 text-xs font-medium"
        >
          <a
            href="#arcanos-maiores"
            className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1.5 text-amber-700 transition hover:bg-amber-500/20 dark:text-amber-300"
          >
            🔮 Arcanos Maiores (22)
          </a>
          {SUITS_ORDER.map((suit) => (
            <a
              key={suit}
              href={`#${suit}`}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {SUIT_ICONS[suit]} {SUITS_META[suit].name} (14)
            </a>
          ))}
        </nav>
      </header>

      {/* Seção 1: Arcanos Maiores */}
      <section id="arcanos-maiores" className="mt-14 scroll-mt-20">
        <div className="border-b border-zinc-200 pb-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              🔮
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Arcanos Maiores
            </h2>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              22 cartas
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            A jornada do herói, os grandes arquétipos da consciência humana e os
            marcos espirituais.
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {MAJOR_ARCANA.map((arcanum) => (
            <li key={arcanum.slug}>
              <Link
                href={`/arcanos/${arcanum.slug}`}
                className="group block transition hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-xl border border-zinc-200 transition group-hover:border-amber-400 dark:border-zinc-800">
                  <ArcanoCard arcanum={arcanum} sizes="(min-width: 1024px) 160px, 30vw" />
                </div>
                <span className="mt-2 block text-center text-xs font-medium text-zinc-800 transition group-hover:text-amber-600 dark:text-zinc-200 dark:group-hover:text-amber-400">
                  {arcanum.number}. {arcanum.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Seção 2: Arcanos Menores organizados por naipe */}
      <div className="mt-16 space-y-16">
        {SUITS_ORDER.map((suit) => {
          const meta = SUITS_META[suit];
          const cardsOfSuit = MINOR_ARCANA.filter((c) => c.suit === suit);

          return (
            <section key={suit} id={suit} className="scroll-mt-20">
              <div className="border-b border-zinc-200 pb-3 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">
                    {SUIT_ICONS[suit]}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Naipe de {meta.name}
                  </h2>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    Elemento {meta.element} · 14 cartas
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {meta.theme}.
                </p>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {cardsOfSuit.map((card) => (
                  <li key={card.slug}>
                    <Link
                      href={`/arcanos/${card.slug}`}
                      className="group block transition hover:-translate-y-1"
                    >
                      <div className="overflow-hidden rounded-xl border border-zinc-200 transition group-hover:border-amber-400 dark:border-zinc-800">
                        <ArcanoCard arcanum={card} sizes="(min-width: 1024px) 140px, 30vw" />
                      </div>
                      <span className="mt-2 block text-center text-xs font-medium text-zinc-800 transition group-hover:text-amber-600 dark:text-zinc-200 dark:group-hover:text-amber-400">
                        {card.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}

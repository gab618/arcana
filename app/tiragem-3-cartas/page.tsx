import type { Metadata } from "next";
import { TiragemTresCartas } from "@/features/tiragem-3-cartas/components/tiragem-3-cartas";

export const metadata: Metadata = {
  title: "Tiragem de 3 Cartas do Tarot",
  description:
    "Faça uma tiragem de 3 cartas de Tarot gratuita com os 22 Arcanos Maiores: embaralhe, corte o maço e escolha suas cartas na mesa.",
  alternates: { canonical: "/tiragem-3-cartas" },
};

export default function TiragemTresCartasPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Tiragem de 3 Cartas do Tarot
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Vivencie o ritual clássico da tiragem de três cartas: firme sua
        intenção, embaralhe, corte o maço e escolha três Arcanos Maiores no
        leque.
      </p>

      <div className="mt-8">
        <TiragemTresCartas />
      </div>

      <section className="mt-14 space-y-4">
        <h2 className="text-xl font-semibold">
          Como funciona a Tiragem de 3 Cartas?
        </h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          A tiragem de três cartas é um dos métodos mais consagrados e diretos
          do Tarot. Utilizando os <strong>22 Arcanos Maiores</strong>, cada
          posição da mesa revela uma faceta complementar da sua questão:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>Passado · Presente · Futuro:</strong> ideal para compreender
            a trajetória de uma situação, o que está ativo agora e para onde as
            energias caminham.
          </li>
          <li>
            <strong>Situação · Desafio · Conselho:</strong> recomendada quando
            você precisa tomar uma decisão prática, identificando o obstáculo
            central e a postura mais sábia a adotar.
          </li>
        </ul>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { CartaDoDia } from "@/features/carta-do-dia/components/carta-do-dia";

export const metadata: Metadata = {
  title: "Carta do Dia",
  description:
    "Tire sua carta do dia do tarot e descubra a energia e o conselho dos Arcanos Maiores para hoje.",
  alternates: { canonical: "/carta-do-dia" },
};

export default function CartaDoDiaPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Carta do Dia do Tarot
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Uma carta, uma intenção. Revele o arcano que acompanha o seu dia.
      </p>

      <div className="mt-10">
        <CartaDoDia />
      </div>

      <section className="mt-14 space-y-3">
        <h2 className="text-xl font-semibold">Como funciona a carta do dia?</h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          A carta do dia é uma prática simples de tarot: você tira uma única
          carta dos 22 Arcanos Maiores e usa o seu simbolismo como tema de
          reflexão até a virada do dia.
        </p>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Uma vez revelada, a carta fica a mesma pelo resto do dia, e um novo
          sorteio fica disponível a partir da meia-noite no seu fuso horário.
          Tudo acontece no seu navegador, e nenhuma informação é enviada a
          servidores.
        </p>
      </section>
    </main>
  );
}

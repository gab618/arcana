import type { Metadata } from "next";
import { ArcanoAnualForm } from "@/features/arcano-anual/components/arcano-anual-form";

export const metadata: Metadata = {
  title: "Descubra seu Arcano Anual",
  description:
    "Calcule o arcano do tarot que rege o seu ano pessoal, válido de um aniversário ao outro.",
  alternates: { canonical: "/arcano-anual" },
};

export default function ArcanoAnualPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Descubra seu Arcano Anual
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Descubra qual arcano do tarot rege a energia do seu ano pessoal atual ou
        de qualquer ciclo entre aniversários.
      </p>

      <div className="mt-8">
        <ArcanoAnualForm />
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Como funciona o cálculo?</h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          O seu <strong>ano pessoal</strong> não começa no dia 1º de janeiro. Ele
          abrange um ciclo anual que inicia no dia do seu aniversário e vai até a
          véspera do seu próximo aniversário.
        </p>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200">
          <p className="font-semibold">Exemplo prático:</p>
          <p className="mt-1">
            Para quem nasceu no dia <strong>03 de janeiro de 1990</strong> e teve
            seu último aniversário em <strong>2020</strong>:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs text-zinc-700 dark:text-zinc-300">
            <li>03 + 01 + 1990 = 1994 (soma da data de nascimento)</li>
            <li>1994 + 2020 = 4014 (soma com o ano do aniversário de referência)</li>
            <li>4 + 0 + 1 + 4 = 9 (soma dos algarismos)</li>
            <li>
              Resultado: <strong>Arcano 9 (O Eremita)</strong>
            </li>
          </ul>
        </div>

        <p className="text-xs text-zinc-500">
          Caso a soma final ultrapasse 22, os algarismos são reduzidos novamente
          até alcançar um número entre 1 e 22 (no qual o arcano 22 corresponde a O
          Louco).
        </p>
      </section>
    </main>
  );
}

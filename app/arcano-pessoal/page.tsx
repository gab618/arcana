import type { Metadata } from "next";
import { ArcanoForm } from "@/features/arcano-pessoal/components/arcano-form";

export const metadata: Metadata = {
  title: "Descubra seu Arcano Pessoal",
  description:
    "Calcule seu arcano pessoal do tarot com seu nome completo e data de nascimento, usando numerologia pitagórica.",
  alternates: { canonical: "/arcano-pessoal" },
};

export default function ArcanoPessoalPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Descubra seu Arcano Pessoal
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Informe seu nome completo e sua data de nascimento para descobrir qual
        dos 22 Arcanos Maiores representa você.
      </p>
      <div className="mt-8">
        <ArcanoForm />
      </div>

      <section className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold">Como o cálculo funciona</h2>
        <ol className="list-decimal space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>Data:</strong> somamos todos os dígitos da data de
            nascimento. Se o total passar de 22, somamos os algarismos de novo
            até chegar a um valor entre 1 e 22.
          </li>
          <li>
            <strong>Nome:</strong> cada letra do nome completo vale um número
            na tabela pitagórica (A=1, B=2 … I=9, J=1 … R=9, S=1 … Z=8).
            Somamos tudo e reduzimos para um valor entre 1 e 22.
          </li>
          <li>
            <strong>Resultado:</strong> somamos o valor da data com o valor do
            nome e reduzimos novamente, se passar de 22. O número final
            corresponde ao seu arcano, e o 22 representa O Louco.
          </li>
        </ol>
      </section>
    </main>
  );
}

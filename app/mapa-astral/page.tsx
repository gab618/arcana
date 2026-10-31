import type { Metadata } from "next";
import { MapaAstralForm } from "@/features/mapa-astral/components/mapa-astral-form";

export const metadata: Metadata = {
  title: "Mapa Astral Grátis Online",
  description:
    "Gere seu mapa astral online: posições do Sol, Lua e planetas nos signos, aspectos e, com hora e local de nascimento, Ascendente, Meio do Céu e casas.",
  alternates: { canonical: "/mapa-astral" },
};

export default function MapaAstralPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Mapa Astral</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Descubra onde estavam o Sol, a Lua e os planetas no momento do seu
        nascimento. Escolha o mapa simples (só a data) ou o completo, com
        coordenadas, para obter Ascendente e casas.
      </p>

      <div className="mt-8">
        <MapaAstralForm />
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Com ou sem coordenadas: qual a diferença?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
            <p className="font-semibold">Sem coordenadas</p>
            <p className="mt-1 text-zinc-700 dark:text-zinc-300">
              Usa apenas a data de nascimento (e a hora, se você souber).
              Mostra o signo de cada planeta e os aspectos entre eles. Não
              calcula Ascendente nem casas, que dependem do local e do horário
              exatos.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
            <p className="font-semibold">Com coordenadas</p>
            <p className="mt-1 text-zinc-700 dark:text-zinc-300">
              Usa data, hora e local (cidade ou latitude/longitude). Além dos
              planetas, calcula Ascendente, Meio do Céu e em qual das 12 casas
              cada planeta está.
            </p>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          Os cálculos usam posições astronômicas geocêntricas no zodíaco
          tropical. O horário de verão histórico é considerado a partir do
          fuso horário do local. Conteúdo com caráter de entretenimento e
          autoconhecimento.
        </p>
      </section>
    </main>
  );
}

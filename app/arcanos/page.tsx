import type { Metadata } from "next";
import Link from "next/link";
import { ArcanoCard } from "@/features/arcano-pessoal/components/arcano-card";
import { MAJOR_ARCANA } from "@/lib/tarot/major-arcana";

export const metadata: Metadata = {
  title: "Os 22 Arcanos Maiores do Tarot",
  description:
    "Conheça os 22 Arcanos Maiores do tarot e o significado de cada carta.",
  alternates: { canonical: "/arcanos" },
};

export default function ArcanosPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Os 22 Arcanos Maiores
      </h1>
      <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {MAJOR_ARCANA.map((arcanum) => (
          <li key={arcanum.slug}>
            <Link href={`/arcanos/${arcanum.slug}`} className="block">
              <ArcanoCard arcanum={arcanum} />
              <span className="mt-2 block text-center text-sm font-medium">
                {arcanum.number}. {arcanum.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

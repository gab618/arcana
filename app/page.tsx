import Link from "next/link";
import { CartaDoDia } from "@/features/carta-do-dia/components/carta-do-dia";
import { SITE_DESCRIPTION } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Ferramentas de tarot
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {SITE_DESCRIPTION}
      </p>

      <section
        aria-label="Carta do Dia"
        className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <CartaDoDia />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Outras ferramentas
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="block rounded-xl border border-zinc-200 p-5 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <h3 className="text-lg font-medium">{tool.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {tool.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

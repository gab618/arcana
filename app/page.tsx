import Link from "next/link";
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
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block rounded-xl border border-zinc-200 p-5 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <h2 className="text-lg font-medium">{tool.title}</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

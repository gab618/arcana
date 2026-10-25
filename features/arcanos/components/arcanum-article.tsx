import type { ArcanumContent } from "@/lib/tarot/types";

/** Texto corrido de uma seção, em parágrafos. */
function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </>
  );
}

export function ArcanumArticle({
  name,
  content,
}: {
  name: string;
  content: ArcanumContent;
}) {
  const sections = [
    { id: "significado", title: `Significado de ${name}`, body: content.general },
    { id: "amor", title: `${name} no amor`, body: content.love },
    {
      id: "trabalho",
      title: `${name} no trabalho e nas finanças`,
      body: content.work,
    },
    {
      id: "saude",
      title: `${name} na saúde e no bem-estar`,
      body: content.health,
    },
    { id: "invertida", title: `${name} invertido`, body: content.reversed },
  ];

  return (
    <article className="mx-auto mt-14 max-w-3xl">
      <ul
        aria-label="Palavras-chave"
        className="flex flex-wrap gap-2 text-xs font-medium"
      >
        {content.keywords.map((keyword) => (
          <li
            key={keyword}
            className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-amber-700 dark:text-amber-300"
          >
            {keyword}
          </li>
        ))}
      </ul>

      <nav
        aria-label="Neste artigo"
        className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="underline underline-offset-4 hover:text-amber-600 dark:hover:text-amber-400"
          >
            {section.title}
          </a>
        ))}
        <a
          href="#conselho"
          className="underline underline-offset-4 hover:text-amber-600 dark:hover:text-amber-400"
        >
          Conselho da carta
        </a>
      </nav>

      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 space-y-3 leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {section.title}
            </h2>
            <Paragraphs items={section.body} />
          </section>
        ))}

        <section
          id="conselho"
          className="scroll-mt-24 rounded-2xl border border-amber-400/40 bg-amber-500/5 p-6"
        >
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Conselho da carta
          </h2>
          <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-300">
            {content.advice}
          </p>
        </section>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import { ArcanoCard } from "@/features/arcano-pessoal/components/arcano-card";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ALL_TAROT_CARDS, getCardBySlug } from "@/lib/tarot/all-cards";

export const instant = false;

export function generateStaticParams() {
  return ALL_TAROT_CARDS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/arcanos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) return {};

  const badge =
    card.type === "major"
      ? `Arcano ${card.number}`
      : `Naipe de ${card.suitName}`;
  const title = `${card.name} (${badge}) – significado`;
  const description = `Significado da carta ${card.name} (${badge}) no tarot.`;
  const url = `/arcanos/${card.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [card.image] },
    twitter: { card: "summary_large_image", title, description, images: [card.image] },
  };
}

export default async function ArcanumPage({
  params,
}: PageProps<"/arcanos/[slug]">) {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) notFound();

  const isMajor = card.type === "major";
  const badgeLabel = isMajor
    ? `Arcano Maior ${card.number}`
    : `Arcano Menor · Naipe de ${card.suitName}`;

  const pageUrl = `${SITE_URL}/arcanos/${card.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${card.name} (${badgeLabel})`,
        description: card.summary,
        image: `${SITE_URL}${card.image}`,
        inLanguage: "pt-BR",
        mainEntityOfPage: pageUrl,
        publisher: { "@type": "Organization", name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Arcanos", item: `${SITE_URL}/arcanos` },
          { "@type": "ListItem", position: 3, name: card.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
      <script
        type="application/ld+json"
        // "<" escapado para o JSON não fechar a tag <script>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <ArcanoCard arcanum={card} priority sizes="(min-width: 768px) 260px, 100vw" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {badgeLabel}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {card.name}
          </h1>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            {card.summary}
          </p>

          <div className="mt-6">
            <ShareButtons
              title={`${card.name} (${badgeLabel}) · ${SITE_NAME}`}
              text={`Conheça a carta ${card.name} (${badgeLabel}) no ${SITE_NAME}! Veja o significado completo:`}
              path={`/arcanos/${card.slug}`}
            />
          </div>

          <nav className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/carta-do-dia" className="underline">
              Tirar carta do dia
            </Link>
            <Link href="/tiragem-3-cartas" className="underline">
              Tiragem de 3 cartas
            </Link>
            <Link href="/arcanos" className="underline">
              Ver todos os 78 arcanos
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}

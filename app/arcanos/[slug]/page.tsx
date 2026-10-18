import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import { ArcanoCard } from "@/features/arcano-pessoal/components/arcano-card";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { MAJOR_ARCANA, getArcanumBySlug } from "@/lib/tarot/major-arcana";

export const instant = false;

export function generateStaticParams() {
  return MAJOR_ARCANA.map((arcanum) => ({ slug: arcanum.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/arcanos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const arcanum = getArcanumBySlug(slug);
  if (!arcanum) return {};

  const title = `${arcanum.name} (Arcano ${arcanum.number}) – significado`;
  const description = `Significado do arcano ${arcanum.number}, ${arcanum.name}, no tarot.`;
  const url = `/arcanos/${arcanum.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [arcanum.image] },
    twitter: { card: "summary_large_image", title, description, images: [arcanum.image] },
  };
}

export default async function ArcanumPage({
  params,
}: PageProps<"/arcanos/[slug]">) {
  const { slug } = await params;
  const arcanum = getArcanumBySlug(slug);
  if (!arcanum) notFound();

  const pageUrl = `${SITE_URL}/arcanos/${arcanum.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${arcanum.name} (Arcano ${arcanum.number})`,
        description: arcanum.summary,
        image: `${SITE_URL}${arcanum.image}`,
        inLanguage: "pt-BR",
        mainEntityOfPage: pageUrl,
        publisher: { "@type": "Organization", name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Arcanos", item: `${SITE_URL}/arcanos` },
          { "@type": "ListItem", position: 3, name: arcanum.name, item: pageUrl },
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
        <ArcanoCard arcanum={arcanum} priority sizes="(min-width: 768px) 260px, 100vw" />
        <div>
          <p className="text-sm text-zinc-500">Arcano {arcanum.number}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {arcanum.name}
          </h1>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            {arcanum.summary}
          </p>

          <div className="mt-6">
            <ShareButtons
              title={`${arcanum.name} (Arcano ${arcanum.number}) · ${SITE_NAME}`}
              text={`Descobri o arcano ${arcanum.name} (Arcano ${arcanum.number}) no Arcana! Veja o significado e descubra o seu:`}
              path={`/arcanos/${arcanum.slug}`}
            />
          </div>

          <nav className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/arcano-pessoal" className="underline">
              Descobrir meu arcano
            </Link>
            <Link href="/arcanos" className="underline">
              Ver todos os arcanos
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}

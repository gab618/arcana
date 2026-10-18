import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ALL_TAROT_CARDS } from "@/lib/tarot/all-cards";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/arcanos",
    ...TOOLS.map((tool) => tool.href),
    ...ALL_TAROT_CARDS.map((card) => `/arcanos/${card.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { MAJOR_ARCANA } from "@/lib/tarot/major-arcana";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/arcanos",
    ...TOOLS.map((tool) => tool.href),
    ...MAJOR_ARCANA.map((arcanum) => `/arcanos/${arcanum.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}

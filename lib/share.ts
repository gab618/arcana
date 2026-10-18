import { SITE_URL } from "./site";

/** Garante uma URL absoluta a partir de um path (ex: "/arcanos/o-mago") ou URL completa. */
export function resolveShareUrl(pathOrUrl: string, origin = SITE_URL): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = origin.replace(/\/+$/, "");
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${cleanPath}`;
}

/** Monta a URL de compartilhamento direto no WhatsApp com texto + link. */
export function buildWhatsAppUrl(text: string, url: string): string {
  const message = `${text} ${url}`.trim();
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

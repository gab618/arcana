import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { SITE_NAME } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/sobre", label: "Sobre e contato" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            {SITE_NAME}
          </p>
          <p className="mt-1 max-w-md text-xs">
            Conteúdo com caráter de entretenimento e autoconhecimento. Não
            substitui aconselhamento médico, psicológico, jurídico ou
            financeiro.
          </p>
        </div>

        <nav aria-label="Links institucionais">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePreferencesButton />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-4"
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        <ul className="flex items-center gap-5 text-sm">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="hover:underline">
                {tool.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/arcanos" className="hover:underline">
              Arcanos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

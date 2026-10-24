import type { ReactNode } from "react";
import { LEGAL_UPDATED_AT } from "@/lib/site";

export function LegalPage({
  title,
  intro,
  showUpdatedAt = true,
  children,
}: {
  title: string;
  intro?: string;
  showUpdatedAt?: boolean;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {showUpdatedAt && (
        <p className="mt-1 text-xs text-zinc-500">
          Última atualização: {LEGAL_UPDATED_AT}
        </p>
      )}
      {intro && (
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">{intro}</p>
      )}
      <div className="mt-8 space-y-8">{children}</div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

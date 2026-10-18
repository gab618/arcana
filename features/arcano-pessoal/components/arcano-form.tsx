"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getArcanumByNumber } from "@/lib/tarot/major-arcana";
import { normalizeName, personalArcanum } from "../calculate";

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function ArcanoForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const birth = String(data.get("birth") ?? "");

    if (normalizeName(name).length === 0) {
      setError("Informe seu nome completo (use letras).");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
      setError("Informe uma data de nascimento válida.");
      return;
    }
    if (birth > todayISO()) {
      setError("A data de nascimento não pode estar no futuro.");
      return;
    }

    const [year, month, day] = birth.split("-").map(Number);
    const { final } = personalArcanum(name, year, month, day);
    router.push(`/arcanos/${getArcanumByNumber(final).slug}`);
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Nome completo
        <input
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass}
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Data de nascimento
        <input
          name="birth"
          type="date"
          min="1900-01-01"
          className={inputClass}
          required
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Descobrir meu arcano
      </button>
      <p className="text-xs text-zinc-500">
        O cálculo é feito no seu navegador. Seu nome e sua data não são enviados
        a nenhum servidor.
      </p>
    </form>
  );
}

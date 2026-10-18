"use client";

import { useState } from "react";
import { buildWhatsAppUrl, resolveShareUrl } from "@/lib/share";

type ShareButtonsProps = {
  /** Título usado na Web Share API nativa */
  title: string;
  /** Mensagem persuasiva que acompanha o link */
  text: string;
  /** Caminho relativo (ex: "/arcanos/o-mago") ou URL completa */
  path: string;
};

export function ShareButtons({ title, text, path }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  function getFullUrl() {
    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;
    return resolveShareUrl(path, origin);
  }

  function handleWhatsApp() {
    const url = getFullUrl();
    window.open(
      buildWhatsAppUrl(text, url),
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function handleCopy() {
    const url = getFullUrl();
    const payload = `${text} ${url}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencioso caso a permissão de área de transferência falhe
    }
  }

  async function handleNativeShare() {
    const url = getFullUrl();
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // Usuário cancelou a gaveta de compartilhamento
        return;
      }
    }
    await handleCopy();
  }

  const buttonClass =
    "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800";

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Compartilhar resultado">
      <button type="button" onClick={handleWhatsApp} className={buttonClass}>
        <span aria-hidden="true">💬</span>
        WhatsApp
      </button>

      <button type="button" onClick={handleNativeShare} className={buttonClass}>
        <span aria-hidden="true">📤</span>
        Compartilhar
      </button>

      <button type="button" onClick={handleCopy} className={buttonClass}>
        <span aria-hidden="true">{copied ? "✅" : "🔗"}</span>
        {copied ? "Copiado!" : "Copiar link"}
      </button>
    </div>
  );
}

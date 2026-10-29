"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { SITE_NAME } from "../lib/site";

export const COOKIE_CONSENT_KEY = "tt_cookie_consent";
export const OPEN_COOKIE_CONSENT_EVENT = "tt:open-cookie-consent";

export type ConsentChoice = "all" | "essential";

/** Dispara evento global para reabrir o banner de preferências de cookies. */
export function openCookieConsent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_COOKIE_CONSENT_EVENT));
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getStoredConsent(): string | null {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return "blocked";
  }
}

export function CookieConsent() {
  // Lê o consentimento do localStorage no cliente de forma síncrona e segura
  const storedConsent = useSyncExternalStore(
    subscribe,
    getStoredConsent,
    () => "loading",
  );

  const [manuallyOpened, setManuallyOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setDismissed(false);
      setManuallyOpened(true);
    }
    window.addEventListener(OPEN_COOKIE_CONSENT_EVENT, handleOpen);
    return () => {
      window.removeEventListener(OPEN_COOKIE_CONSENT_EVENT, handleOpen);
    };
  }, []);

  function handleChoice(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    } catch {
      // Ignora falha de gravação caso cookies/storage estejam desativados
    }
    setDismissed(true);
    setManuallyOpened(false);
  }

  const shouldShow =
    !dismissed &&
    (manuallyOpened || (storedConsent !== "loading" && storedConsent === null));

  if (!shouldShow) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Aviso de cookies e privacidade"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-zinc-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-md transition-all sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/95"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-xl text-amber-600 dark:bg-amber-400/10 dark:text-amber-400"
        >
          🍪
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Sua privacidade no {SITE_NAME}
          </h2>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Utilizamos cookies essenciais para o funcionamento do site e recursos
            para medição de audiência e exibição de anúncios personalizados
            (Google AdSense), de acordo com nossa{" "}
            <Link
              href="/politica-de-privacidade"
              className="font-medium text-amber-600 underline underline-offset-2 hover:text-amber-500 dark:text-amber-400"
            >
              Política de Privacidade
            </Link>
            .
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => handleChoice("all")}
              className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Aceitar todos
            </button>
            <button
              type="button"
              onClick={() => handleChoice("essential")}
              className="cursor-pointer rounded-lg border border-zinc-300 px-3.5 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Apenas essenciais
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

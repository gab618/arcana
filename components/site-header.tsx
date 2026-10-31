"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu sempre que a rota mudar
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Fecha com a tecla Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const navLinks = [
    ...TOOLS.map((tool) => ({ href: tool.href, label: tool.title })),
    { href: "/arcanos", label: "Arcanos" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:py-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight transition hover:opacity-85"
        >
          <span className="text-amber-500 dark:text-amber-400" aria-hidden="true">
            🔮
          </span>
          <span>{SITE_NAME}</span>
        </Link>

        {/* Menu Desktop (visível a partir de md) */}
        <ul className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition hover:text-amber-600 dark:hover:text-amber-400 ${
                    isActive
                      ? "font-semibold text-amber-600 dark:text-amber-400"
                      : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Botão Hambúrguer Mobile (visível abaixo de md) */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100 lg:hidden dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {isOpen ? (
            // Ícone X
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Ícone Hambúrguer
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Painel Dropdown Mobile */}
      {isOpen && (
        <div className="border-b border-zinc-200 bg-white/95 px-4 pt-2 pb-5 shadow-lg backdrop-blur-md lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
          <ul className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="text-xs text-amber-500">●</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

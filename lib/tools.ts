export type Tool = {
  href: string;
  title: string;
  description: string;
};

/** Registro de ferramentas: a home, o menu e o sitemap leem daqui. */
export const TOOLS: readonly Tool[] = [
  {
    href: "/arcano-pessoal",
    title: "Arcano Pessoal",
    description: "Descubra seu arcano com nome completo e data de nascimento.",
  },
  {
    href: "/arcano-anual",
    title: "Arcano Anual",
    description: "Descubra o arcano que rege seu ciclo de aniversário a aniversário.",
  },
];

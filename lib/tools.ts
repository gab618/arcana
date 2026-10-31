export type Tool = {
  href: string;
  title: string;
  description: string;
};

/** Registro de ferramentas: a home, o menu e o sitemap leem daqui. */
export const TOOLS: readonly Tool[] = [
  {
    href: "/carta-do-dia",
    title: "Carta do Dia",
    description: "Sorteie o arcano que acompanha e orienta a energia do seu dia.",
  },
  {
    href: "/tiragem-3-cartas",
    title: "Tiragem de 3 Cartas",
    description:
      "Embaralhe, corte o maço e escolha 3 Arcanos Maiores na mesa ritual.",
  },
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
  {
    href: "/mapa-astral",
    title: "Mapa Astral",
    description:
      "Veja seus planetas nos signos, com ou sem coordenadas de nascimento.",
  },
];

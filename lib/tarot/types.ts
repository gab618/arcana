export type TarotCardType = "major" | "minor";

export type TarotSuit = "copas" | "ouros" | "espadas" | "paus";

/**
 * Conteúdo editorial de uma carta. Cada seção é uma lista de parágrafos.
 * Meta editorial: 400–600+ palavras somando todas as seções.
 */
export type ArcanumContent = {
  /** Descrição curta (até ~155 caracteres): meta description e resumo da página */
  summary: string;
  /** Palavras-chave do arcano, exibidas como etiquetas */
  keywords: readonly string[];
  /** Significado geral da carta */
  general: readonly string[];
  /** Significado no amor e nos relacionamentos */
  love: readonly string[];
  /** Significado no trabalho e nas finanças */
  work: readonly string[];
  /** Significado na saúde e no bem-estar */
  health: readonly string[];
  /** Interpretação da carta na posição invertida */
  reversed: readonly string[];
  /** Conselho final da carta (1–2 frases) */
  advice: string;
};

export type TarotCard = {
  type: TarotCardType;
  /** Número do arcano maior (1–22) ou número da ordem no naipe (1–14) */
  number?: number;
  suit?: TarotSuit;
  suitName?: string;
  rankName?: string;
  /** Usado na URL: /arcanos/o-louco ou /arcanos/as-de-copas */
  slug: string;
  name: string;
  summary: string;
  /** Caminho do arquivo em public/ */
  image: string;
  /** Descrição da imagem em pt-BR */
  imageAlt: string;
  /** Conteúdo editorial completo (quando já escrito) */
  content?: ArcanumContent;
};

export type MajorArcanum = TarotCard & {
  type: "major";
  number: number;
};

export type MinorArcanum = TarotCard & {
  type: "minor";
  number: number;
  suit: TarotSuit;
  suitName: string;
  rankName: string;
};

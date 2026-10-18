export type TarotCardType = "major" | "minor";

export type TarotSuit = "copas" | "ouros" | "espadas" | "paus";

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

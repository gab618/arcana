export type MajorArcanum = {
  /** 1–22 (o 22 é O Louco) */
  number: number;
  /** Usado na URL: /arcanos/o-louco */
  slug: string;
  name: string;
  summary: string;
  /** Caminho de um arquivo em public/ */
  image: string;
  /** Descrição da imagem em pt-BR */
  imageAlt: string;
};

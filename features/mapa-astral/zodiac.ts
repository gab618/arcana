export type Sign = {
  name: string;
  glyph: string;
  element: "Fogo" | "Terra" | "Ar" | "Água";
  modality: "Cardinal" | "Fixo" | "Mutável";
  ruler: string;
  /** Complemento para frases do tipo "sua essência se expressa {expression}". */
  expression: string;
  /** Arcano maior de correspondência tradicional (slug em /arcanos). */
  arcanumSlug: string;
  arcanumName: string;
};

// \uFE0E força o glifo em texto (evita versão emoji colorida).
export const SIGNS: readonly Sign[] = [
  { name: "Áries", glyph: "♈\uFE0E", element: "Fogo", modality: "Cardinal", ruler: "Marte", expression: "de forma direta, corajosa e pioneira", arcanumSlug: "o-imperador", arcanumName: "O Imperador" },
  { name: "Touro", glyph: "♉\uFE0E", element: "Terra", modality: "Fixo", ruler: "Vênus", expression: "de forma estável, sensorial e persistente", arcanumSlug: "o-hierofante", arcanumName: "O Hierofante" },
  { name: "Gêmeos", glyph: "♊\uFE0E", element: "Ar", modality: "Mutável", ruler: "Mercúrio", expression: "de forma curiosa, versátil e comunicativa", arcanumSlug: "os-enamorados", arcanumName: "Os Enamorados" },
  { name: "Câncer", glyph: "♋\uFE0E", element: "Água", modality: "Cardinal", ruler: "Lua", expression: "de forma sensível, protetora e intuitiva", arcanumSlug: "o-carro", arcanumName: "O Carro" },
  { name: "Leão", glyph: "♌\uFE0E", element: "Fogo", modality: "Fixo", ruler: "Sol", expression: "de forma expressiva, generosa e criativa", arcanumSlug: "a-forca", arcanumName: "A Força" },
  { name: "Virgem", glyph: "♍\uFE0E", element: "Terra", modality: "Mutável", ruler: "Mercúrio", expression: "de forma cuidadosa, analítica e prática", arcanumSlug: "o-eremita", arcanumName: "O Eremita" },
  { name: "Libra", glyph: "♎\uFE0E", element: "Ar", modality: "Cardinal", ruler: "Vênus", expression: "de forma harmoniosa, diplomática e relacional", arcanumSlug: "a-justica", arcanumName: "A Justiça" },
  { name: "Escorpião", glyph: "♏\uFE0E", element: "Água", modality: "Fixo", ruler: "Plutão", expression: "de forma intensa, profunda e transformadora", arcanumSlug: "a-morte", arcanumName: "A Morte" },
  { name: "Sagitário", glyph: "♐\uFE0E", element: "Fogo", modality: "Mutável", ruler: "Júpiter", expression: "de forma otimista, livre e em busca de sentido", arcanumSlug: "a-temperanca", arcanumName: "A Temperança" },
  { name: "Capricórnio", glyph: "♑\uFE0E", element: "Terra", modality: "Cardinal", ruler: "Saturno", expression: "de forma disciplinada, responsável e ambiciosa", arcanumSlug: "o-diabo", arcanumName: "O Diabo" },
  { name: "Aquário", glyph: "♒\uFE0E", element: "Ar", modality: "Fixo", ruler: "Urano", expression: "de forma original, independente e humanitária", arcanumSlug: "a-estrela", arcanumName: "A Estrela" },
  { name: "Peixes", glyph: "♓\uFE0E", element: "Água", modality: "Mutável", ruler: "Netuno", expression: "de forma sonhadora, empática e espiritual", arcanumSlug: "a-lua", arcanumName: "A Lua" },
];

export type PlanetKey =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export type PlanetInfo = {
  key: PlanetKey;
  name: string;
  glyph: string;
  /** Oração (com verbo) que completa com a expressão do signo. */
  theme: string;
  arcanumSlug: string;
  arcanumName: string;
};

export const PLANETS: readonly PlanetInfo[] = [
  { key: "sun", name: "Sol", glyph: "☉\uFE0E", theme: "sua essência, vontade e identidade se expressam", arcanumSlug: "o-sol", arcanumName: "O Sol" },
  { key: "moon", name: "Lua", glyph: "☽\uFE0E", theme: "suas emoções e necessidades de segurança se expressam", arcanumSlug: "a-sacerdotisa", arcanumName: "A Sacerdotisa" },
  { key: "mercury", name: "Mercúrio", glyph: "☿\uFE0E", theme: "sua mente e sua forma de comunicar se expressam", arcanumSlug: "o-mago", arcanumName: "O Mago" },
  { key: "venus", name: "Vênus", glyph: "♀\uFE0E", theme: "seu jeito de amar, se relacionar e valorizar as coisas se expressa", arcanumSlug: "a-imperatriz", arcanumName: "A Imperatriz" },
  { key: "mars", name: "Marte", glyph: "♂\uFE0E", theme: "sua ação, seu desejo e sua coragem se expressam", arcanumSlug: "a-torre", arcanumName: "A Torre" },
  { key: "jupiter", name: "Júpiter", glyph: "♃\uFE0E", theme: "sua busca por crescimento, fé e sentido se expressa", arcanumSlug: "a-roda-da-fortuna", arcanumName: "A Roda da Fortuna" },
  { key: "saturn", name: "Saturno", glyph: "♄\uFE0E", theme: "sua disciplina, seus limites e suas responsabilidades se expressam", arcanumSlug: "o-mundo", arcanumName: "O Mundo" },
  { key: "uranus", name: "Urano", glyph: "♅\uFE0E", theme: "sua necessidade de liberdade e mudança (marca geracional) se expressa", arcanumSlug: "o-louco", arcanumName: "O Louco" },
  { key: "neptune", name: "Netuno", glyph: "♆\uFE0E", theme: "sua sensibilidade, seus sonhos e sua espiritualidade (marca geracional) se expressam", arcanumSlug: "o-enforcado", arcanumName: "O Enforcado" },
  { key: "pluto", name: "Plutão", glyph: "♇\uFE0E", theme: "seus processos de transformação e regeneração (marca geracional) se expressam", arcanumSlug: "o-julgamento", arcanumName: "O Julgamento" },
];

export const HOUSE_THEMES: readonly string[] = [
  "identidade e aparência",
  "recursos e valores pessoais",
  "comunicação e aprendizado",
  "lar, família e raízes",
  "criatividade, prazer e romance",
  "rotina, trabalho e saúde",
  "parcerias e relacionamentos",
  "transformações e vínculos profundos",
  "viagens, estudos e filosofia",
  "carreira e vida pública",
  "amizades, grupos e projetos de futuro",
  "inconsciente, recolhimento e espiritualidade",
];

export type AspectType = "conjunção" | "sextil" | "quadratura" | "trígono" | "oposição";

export const ASPECTS: readonly { type: AspectType; angle: number; orb: number; color: string }[] = [
  { type: "conjunção", angle: 0, orb: 8, color: "#a1a1aa" },
  { type: "sextil", angle: 60, orb: 4, color: "#38bdf8" },
  { type: "quadratura", angle: 90, orb: 6, color: "#ef4444" },
  { type: "trígono", angle: 120, orb: 6, color: "#22c55e" },
  { type: "oposição", angle: 180, orb: 8, color: "#f97316" },
];

import type { ArcanumContent } from "../types";
import { aEstrela } from "./a-estrela";
import { aForca } from "./a-forca";
import { aImperatriz } from "./a-imperatriz";
import { aJustica } from "./a-justica";
import { aLua } from "./a-lua";
import { aMorte } from "./a-morte";
import { aRodaDaFortuna } from "./a-roda-da-fortuna";
import { aSacerdotisa } from "./a-sacerdotisa";
import { aTemperanca } from "./a-temperanca";
import { aTorre } from "./a-torre";
import { oCarro } from "./o-carro";
import { oDiabo } from "./o-diabo";
import { oEnforcado } from "./o-enforcado";
import { oEremita } from "./o-eremita";
import { oHierofante } from "./o-hierofante";
import { oImperador } from "./o-imperador";
import { oJulgamento } from "./o-julgamento";
import { oLouco } from "./o-louco";
import { oMago } from "./o-mago";
import { oMundo } from "./o-mundo";
import { oSol } from "./o-sol";
import { osEnamorados } from "./os-enamorados";

/**
 * Conteúdo editorial dos 22 Arcanos Maiores, indexado pelo slug da carta.
 * Cada arcano conta com guia aprofundado: significado geral, amor,
 * trabalho e finanças, saúde/bem-estar, posição invertida e conselho.
 */
export const MAJOR_CONTENT: Readonly<Record<string, ArcanumContent>> = {
  "o-mago": oMago,
  "a-sacerdotisa": aSacerdotisa,
  "a-imperatriz": aImperatriz,
  "o-imperador": oImperador,
  "o-hierofante": oHierofante,
  "os-enamorados": osEnamorados,
  "o-carro": oCarro,
  "a-justica": aJustica,
  "o-eremita": oEremita,
  "a-roda-da-fortuna": aRodaDaFortuna,
  "a-forca": aForca,
  "o-enforcado": oEnforcado,
  "a-morte": aMorte,
  "a-temperanca": aTemperanca,
  "o-diabo": oDiabo,
  "a-torre": aTorre,
  "a-estrela": aEstrela,
  "a-lua": aLua,
  "o-sol": oSol,
  "o-julgamento": oJulgamento,
  "o-mundo": oMundo,
  "o-louco": oLouco,
};

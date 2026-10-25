import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Sobre e Contato",
  description: `Conheça o ${SITE_NAME}, um projeto de ferramentas de tarot online, e saiba como entrar em contato.`,
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <LegalPage
      title={`Sobre o ${SITE_NAME}`}
      showUpdatedAt={false}
      intro={`O ${SITE_NAME} é um projeto independente de ferramentas de tarot online, criado para quem quer explorar os arquétipos dos Arcanos de forma simples, bonita e gratuita.`}
    >
      <LegalSection title="O que você encontra aqui">
        <ul className="list-disc space-y-1 pl-5">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="font-medium underline">
                {tool.title}
              </Link>
              : {tool.description}
            </li>
          ))}
          <li>
            <Link href="/arcanos" className="font-medium underline">
              Os 78 Arcanos
            </Link>
            : o baralho completo, com os Arcanos Maiores e Menores.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Nosso compromisso">
        <p>
          Os cálculos de Arcano Pessoal e Anual e as tiragens acontecem no seu
          navegador: seu nome e sua data de nascimento não são enviados a
          nenhum servidor. As tiragens têm caráter de entretenimento e
          autoconhecimento e não substituem orientação profissional. Veja os{" "}
          <Link href="/termos-de-uso" className="underline">
            Termos de Uso
          </Link>{" "}
          e a{" "}
          <Link href="/politica-de-privacidade" className="underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Contato">
        <p>
          Sugestões, correções ou parcerias? Escreva para{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">
            {CONTACT_EMAIL}
          </a>
          . Respondemos o mais breve possível.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

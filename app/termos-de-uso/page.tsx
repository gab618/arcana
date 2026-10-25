import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Regras gerais de uso do ${SITE_NAME} e aviso sobre o caráter de entretenimento e autoconhecimento das tiragens.`,
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermosDeUsoPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      intro={`Ao acessar e utilizar o ${SITE_NAME} (tirartarot.com.br), você concorda com os termos abaixo. Se não concordar, recomendamos não utilizar o site.`}
    >
      <LegalSection title="1. Natureza do serviço">
        <p>
          O {SITE_NAME} oferece ferramentas e conteúdos sobre tarot e
          numerologia com <strong>finalidade exclusiva de entretenimento e
          autoconhecimento</strong>. As tiragens e os cálculos são simbólicos e
          não possuem comprovação científica.
        </p>
      </LegalSection>

      <LegalSection title="2. Sem aconselhamento profissional">
        <p>
          Nenhum resultado, texto ou interpretação deste site constitui
          previsão garantida nem aconselhamento médico, psicológico, jurídico,
          financeiro ou de qualquer outra natureza profissional. Não tome
          decisões importantes de saúde, finanças ou segurança com base apenas
          no conteúdo do site. Em caso de necessidade, procure um profissional
          qualificado.
        </p>
      </LegalSection>

      <LegalSection title="3. Regras de uso">
        <p>Ao utilizar o site, você se compromete a:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>usar o conteúdo apenas para fins pessoais e lícitos;</li>
          <li>
            não tentar prejudicar o funcionamento do site, burlar medidas de
            segurança ou realizar acessos automatizados abusivos;
          </li>
          <li>
            não reproduzir os textos do site em grande escala sem autorização.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Propriedade intelectual">
        <p>
          Os textos, a organização e o design do {SITE_NAME} são protegidos por
          direitos autorais. As ilustrações das cartas pertencem ao baralho
          Rider-Waite-Smith (1909), ilustrado por Pamela Colman Smith, que se
          encontra em domínio público.
        </p>
      </LegalSection>

      <LegalSection title="5. Links de terceiros, afiliados e anúncios">
        <p>
          O site pode exibir anúncios e links de afiliados (por exemplo,
          Amazon). Não nos responsabilizamos pelo conteúdo, pelos produtos ou
          pelas políticas de sites de terceiros. Consulte a nossa{" "}
          <Link href="/politica-de-privacidade" className="underline">
            Política de Privacidade
          </Link>{" "}
          para saber mais.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitação de responsabilidade">
        <p>
          O conteúdo é fornecido &ldquo;como está&rdquo;. Não garantimos
          disponibilidade ininterrupta nem a ausência de erros e não nos
          responsabilizamos por decisões tomadas com base nas informações do
          site.
        </p>
      </LegalSection>

      <LegalSection title="7. Alterações e legislação aplicável">
        <p>
          Estes termos podem ser alterados a qualquer momento, e a versão
          vigente é sempre a publicada nesta página. Eles são regidos pelas leis
          da República Federativa do Brasil.
        </p>
      </LegalSection>

      <LegalSection title="8. Contato">
        <p>
          Dúvidas sobre estes termos? Escreva para{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

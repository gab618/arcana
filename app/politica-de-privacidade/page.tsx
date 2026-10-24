import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Saiba como o ${SITE_NAME} trata seus dados, cookies e anúncios, em conformidade com a LGPD.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      intro={`Esta política explica quais informações o ${SITE_NAME} (tirartarot.com.br) coleta, como são usadas e quais são os seus direitos, em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).`}
    >
      <LegalSection title="1. Dados que você informa nas ferramentas">
        <p>
          O nome, a data de nascimento e a pergunta que você digita nas
          ferramentas (Arcano Pessoal, Arcano Anual e Tiragem de 3 Cartas) são
          processados <strong>apenas no seu navegador</strong>. Esses dados não
          são enviados, armazenados nem compartilhados com nossos servidores.
        </p>
        <p>
          Não exigimos cadastro, login ou senha para usar o site.
        </p>
      </LegalSection>

      <LegalSection title="2. Armazenamento local no seu dispositivo">
        <p>
          Para a funcionalidade da <strong>Carta do Dia</strong>, guardamos no
          armazenamento local do navegador (<em>localStorage</em>) a carta
          sorteada e a data do sorteio, para que ela permaneça a mesma durante
          o dia. Essa informação fica somente no seu dispositivo e pode ser
          apagada a qualquer momento limpando os dados do site no navegador.
        </p>
      </LegalSection>

      <LegalSection title="3. Dados de navegação e estatísticas">
        <p>
          Como qualquer site, nossa hospedagem pode registrar dados técnicos de
          acesso, como endereço IP, tipo de navegador, páginas visitadas e data
          e hora do acesso, para fins de segurança e funcionamento.
        </p>
        <p>
          Podemos utilizar ferramentas de análise, como o{" "}
          <strong>Google Analytics</strong> e o <strong>Vercel Analytics</strong>
          , para entender de forma agregada como o site é usado (páginas mais
          acessadas, origem do tráfego, desempenho). Essas ferramentas podem
          utilizar cookies ou identificadores e não nos permitem identificar
          você pelo nome.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies e anúncios (Google AdSense)">
        <p>
          O {SITE_NAME} pode exibir anúncios do <strong>Google AdSense</strong>.
          O Google e seus parceiros, como fornecedores terceirizados, utilizam
          cookies para exibir anúncios com base em visitas anteriores do
          usuário a este e a outros sites.
        </p>
        <p>
          O uso de cookies de publicidade, como o cookie <strong>DART</strong>,
          permite que o Google e seus parceiros exibam anúncios para você com
          base na sua navegação neste e em outros sites da internet.
        </p>
        <p>
          Você pode desativar a publicidade personalizada acessando as{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Configurações de anúncios do Google
          </a>{" "}
          ou o site{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            aboutads.info
          </a>
          . Você também pode bloquear ou apagar cookies nas configurações do seu
          navegador, ciente de que algumas funções do site podem ser afetadas.
        </p>
        <p>
          Saiba mais sobre como o Google usa dados em{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            policies.google.com/technologies/partner-sites
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="5. Links de afiliados e sites externos">
        <p>
          Algumas páginas podem conter links para produtos de terceiros (por
          exemplo, baralhos e livros de tarot na Amazon). Se você comprar por
          meio desses links, podemos receber uma comissão, sem custo adicional
          para você. Os sites externos têm suas próprias políticas de
          privacidade, pelas quais não somos responsáveis.
        </p>
      </LegalSection>

      <LegalSection title="6. Seus direitos (LGPD)">
        <p>
          Nos termos da LGPD, você pode solicitar a confirmação do tratamento
          de dados, acesso, correção, anonimização, eliminação, portabilidade e
          informações sobre compartilhamento, bem como revogar consentimentos
          dados. Para exercer seus direitos, escreva para{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Crianças e adolescentes">
        <p>
          O site não é direcionado a menores de 18 anos e não coleta
          intencionalmente dados pessoais de crianças e adolescentes.
        </p>
      </LegalSection>

      <LegalSection title="8. Alterações nesta política">
        <p>
          Podemos atualizar esta política periodicamente. A data da última
          atualização está indicada no topo desta página.
        </p>
      </LegalSection>

      <LegalSection title="9. Contato">
        <p>
          Dúvidas sobre privacidade? Fale conosco em{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

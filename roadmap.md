📌 Roadmap: Lançamento, SEO e Monetização - TirarTarot.com.br

🎯 Objetivo

Estruturar o site em Next.js para ranquear organicamente no Google e cumprir todos os requisitos técnicos e editoriais para aprovação no Google AdSense e afiliação.

1. ⚙️ Domínio e Infraestrutura

- [x] Registrar o domínio definitivo no Registro.br (tirartarot.com.br)

- [x] Configurar DNS no Registro.br apontando para os servidores da Vercel

- [x] Configurar redirecionamento automático de http:// para https:// e canonical tag

- [ ] Validar se as variáveis de ambiente de produção estão configuradas na Vercel

2. 📄 Páginas Institucionais Obrigatórias (Requisito AdSense)

- [x] Criar /politica-de-privacidade (com menção a cookies e anúncios Google AdSense / DART)

- [x] Criar /termos-de-uso (regras gerais de uso e aviso de que tiragens têm caráter de entretenimento/autoconhecimento)

- [x] Criar /sobre ou /contato (com e-mail para contato e descrição do projeto)

- [x] Adicionar links visíveis para essas 3 páginas no rodapé global (Footer)

3. 🔍 Conteúdo Estático & SEO On-Page (Combater o erro "Baixo Valor")

- [x] Criar rota dinâmica para cartas usando SSG (/arcanos/[slug]) com generateStaticParams

- [x] Escrever/cadastrar conteúdo estático para os 22 Arcanos Maiores:

	- [x] Palavras-chave principais no h1 e meta tags

	- [x] Significado geral da carta (mínimo 400–600 palavras por carta)

	- [x] Significado no amor, finanças/trabalho e saúde

	- [x] Interpretação da carta na posição invertida

- [x] Adicionar link interno no resultado da tiragem interativa apontando para a página detalhada da carta tirada

4. 🗺️ Metadados, Sitemaps e Indexação

- [x] Gerar sitemap.xml dinâmico via Next.js (app/sitemap.ts) incluindo a home e todas as cartas

- [x] Configurar robots.txt (app/robots.ts) permitindo a indexação dos bots do Google

- [x] Configurar metadados Open Graph (imagem de compartilhamento para WhatsApp/redes sociais)

- [ ] Cadastrar e verificar a propriedade no Google Search Console

- [ ] Enviar o sitemap no Google Search Console

5. 📊 Monitoramento de Tráfego e Conversão

- [x] Instalar o Google Analytics 4 (GA4) via @next/third-parties/google ou Google Tag Manager

- [x] Ativar o Vercel Analytics / Speed Insights no painel da Vercel

- [x] Configurar evento personalizado no GA4 quando o usuário completa uma tiragem de cartas

6. 💰 Monetização

- [ ] Aguardar indexação das páginas e início do fluxo orgânico (pelo menos 20 a 50 visitas/dia)

- [ ] Solicitar revisão do site no painel do Google AdSense

- [ ] Cadastrar-se no programa de Associados da Amazon (inserir links de baralhos e livros de tarot recomendados)

- [ ] Reservar os espaços de banners (ads.txt na pasta public/ e componentes de display na home e no rodapé do resultado)

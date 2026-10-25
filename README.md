# 🔮 Tirar Tarot

> Plataforma web moderna de ferramentas de Tarot, Numerologia e Autoconhecimento desenvolvida com **Next.js 16**, **React 19** e **Tailwind CSS v4**.

---

## ✨ Sobre o Projeto

O **Tirar Tarot** (`tirartarot.com.br`) foi concebido para ser uma suíte expansível de ferramentas esotéricas e arquetípicas. O projeto combina cálculos numerológicos precisos, privacidade de dados e uma arquitetura orientada a performance e SEO técnico para buscadores.

---

## 🚀 Funcionalidades Atuais

- ☀️ **Carta do Dia (`/` e `/carta-do-dia`)**:
  - Sorteio diário interativo com animação *flip* 3D e destaque direto na Home.
  - Persistência por fuso local no `localStorage`: mantém a carta revelada até a meia-noite e libera um novo sorteio no dia seguinte.

- 🎴 **Tiragem de 3 Cartas (`/tiragem-3-cartas`)**:
  - Ritual guiado na mesa: escolha entre *Passado · Presente · Futuro* ou *Situação · Desafio · Conselho*, embaralhe, corte o maço, escolha 3 cartas no leque dos 22 Arcanos Maiores e revele uma a uma.

- 🌟 **Descobridor de Arcano Pessoal (`/arcano-pessoal`)**:
  - Calcula o arcano regente com base no **nome completo** e **data de nascimento**.
  - **Passo 1 (Data)**: Soma de todos os dígitos da data reduzida para um valor de 1 a 22.
  - **Passo 2 (Nome)**: Conversão das letras usando a tabela pitagórica (A=1...I=9, J=1...R=9, S=1...Z=8), somando e reduzindo para 1 a 22.
  - **Passo 3 (Soma Final)**: Combinação da data com o nome reduzida para 1 a 22 (onde 22 representa O Louco).
  - 🛡️ **Privacidade**: Cálculo executado 100% no navegador — nome e data nunca saem do dispositivo do usuário.

- 📅 **Descobridor de Arcano Anual (`/arcano-anual`)**:
  - Calcula a energia regente do **ano pessoal**, válido de um aniversário ao outro.
  - **Fórmula**: `(dia + mês + ano de nascimento) + ano do aniversário de referência`. A soma dos algarismos do total é reduzida para 1 a 22.
  - Determinação automática do ciclo de vigência vigente (último aniversário) ou consulta flexível de qualquer ano.

- 🃏 **Catálogo dos 78 Arcanos do Tarot (`/arcanos` e `/arcanos/[slug]`)**:
  - 78 páginas estáticas pré-renderizadas (SSG): **22 Arcanos Maiores** e **56 Arcanos Menores** organizados pelos 4 naipes (*Copas, Ouros, Espadas e Paus*).
  - Ilustrações clássicas *Rider-Waite-Smith* otimizadas em formato WebP de alta fidelidade e baixo peso (~150 KB por carta), com links de navegação rápida e Schema.org Article em cada página.

- 🔍 **SEO & Otimização Técnica**:
  - Metadados dinâmicos e exclusivos por página (`title`, `description`, `canonical`).
  - Imagens de compartilhamento para redes sociais (`Open Graph` e `Twitter Cards`).
  - Dados estruturados Schema.org (`Article` e `BreadcrumbList`) em JSON-LD.
  - Geração automática de `sitemap.xml` e `robots.txt`.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Finalidade |
| :--- | :--- |
| **[Next.js 16](https://nextjs.org/)** | Framework fullstack com App Router, Turbopack e Cache Components |
| **[React 19](https://react.dev/)** | Biblioteca de interface reativa |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Estilização utilitária de alto desempenho |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipagem estática rigorosa em todo o código |
| **[Vitest](https://vitest.dev/)** | Suíte de testes unitários ultrarrápida |
| **[pnpm](https://pnpm.io/)** | Gerenciador de pacotes eficiente |

---

## 📁 Arquitetura do Projeto

O código é estruturado pelo padrão **Feature-Driven Architecture** para permitir escalabilidade e fácil manutenção:

```text
arcana/
├── 📂 app/                     # Rotas e páginas (App Router)
│   ├── 📄 layout.tsx           # Layout raiz com fontes Geist, SEO base e header
│   ├── 📄 page.tsx             # Home com catálogo de ferramentas ativas
│   ├── 📄 sitemap.ts           # Geração automatizada do sitemap.xml
│   ├── 📄 robots.ts            # Configuração do robots.txt
│   ├── 📂 arcano-pessoal/      # Rota da ferramenta de Arcano Pessoal
│   └── 📂 arcanos/             # Catálogo (/arcanos) e páginas individuais ([slug])
│
├── 📂 features/                # Módulos isolados por funcionalidade
│   └── 📂 arcano-pessoal/
│       ├── 📄 calculate.ts     # Funções puras de cálculo (sem dependência de UI)
│       ├── 📄 calculate.test.ts# Testes unitários com casos de borda
│       └── 📂 components/      # Formulário e componentes visuais da feature
│
├── 📂 lib/                     # Dados compartilhados e utilitários
│   ├── 📄 site.ts              # Constantes de configuração e URLs do site
│   ├── 📄 tools.ts             # Registro central de ferramentas disponíveis
│   └── 📂 tarot/
│       ├── 📄 types.ts         # Definições de tipos TypeScript dos Arcanos
│       └── 📄 major-arcana.ts  # Catálogo dos 22 arcanos e utilitários de busca
│
├── 📂 public/                  # Arquivos estáticos
│   └── 📂 arcanos/             # 22 cartas em formato .webp otimizado
└── 📂 components/              # Componentes globais de UI (ex: SiteHeader)
```

---

## 🧩 Como Adicionar Novas Ferramentas

Para adicionar uma nova ferramenta (ex: *Tiragem de 3 Cartas*):

1. **Crie a feature em `features/<nova-ferramenta>/`**:
   - Implemente a lógica pura e componentes necessários.
2. **Crie a rota em `app/<nova-ferramenta>/page.tsx`**:
   - Monte a interface e defina a metadata de SEO.
3. **Registre a ferramenta em `lib/tools.ts`**:
   - Adicione o link, título e descrição no array `TOOLS`.
   - A home, o menu de navegação e o sitemap serão atualizados automaticamente! 🎉

---

## 🚦 Como Rodar Localmente

### Pré-requisitos
- Node.js 20+
- pnpm instalado (`corepack enable` ou `npm i -g pnpm`)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/arcana.git
cd arcana

# Instale as dependências
pnpm install
```

### Executando em Desenvolvimento

```bash
pnpm dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Rodando os Testes Unitários

```bash
pnpm test
```

### Verificação de Tipos e Build de Produção

```bash
# Linting
pnpm lint

# Build otimizado para produção
pnpm build
```

---

## 🎨 Imagens e Créditos

- As ilustrações dos Arcanos Maiores são provenientes do clássico baralho **Rider-Waite-Smith (1909)**, ilustrado por Pamela Colman Smith sob a orientação de Arthur Edward Waite, de **domínio público**.

---

<p align="center">
  Feito com 🔮 e dedicação para amantes de Tarot e tecnologia.
</p>

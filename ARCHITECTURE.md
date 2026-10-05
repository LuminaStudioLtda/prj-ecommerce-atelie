# Arquitetura - E-commerce Ateliê

## Visão geral

Esta é uma plataforma Next.js com dois módulos integrados:

- **Loja pública:** vitrine, catálogo, detalhes de produto, carrinho, checkout e acompanhamento de pedidos.
- **Painel administrativo:** gestão de insumos, ficha técnica, precificação, estoque, produção e pedidos.

O App Router entrega as rotas. A regra de negócio pertence ao domínio que a utiliza, nunca à página ou ao componente visual.

## Estrutura de pastas

```text
src/
  app/          # Rotas, layouts e Route Handlers do Next.js App Router.
  features/     # Domínios de negócio e seus casos de uso.
  components/   # UI reutilizada por duas ou mais features; shadcn em components/ui.
  hooks/        # Hooks reutilizados por duas ou mais features.
  lib/          # Clientes de infraestrutura PostgreSQL/Prisma e helpers gerais.
  store/        # Stores Zustand compartilhadas, uma por domínio.
```

### Onde cada coisa vai

- Uma feature fica em `src/features/<nome-em-kebab-case>/` e pode ter `components/`, `hooks/`, `services/` e `types.ts` próprios.
- Código utilizado apenas por uma feature permanece dentro dela. Código utilizado por duas ou mais sobe para `components/`, `hooks/`, `lib/` ou `store/`.
- `components/` contém primitives e composições de UI sem regra de domínio. Os componentes shadcn/ui ficam obrigatoriamente em `components/ui/`.
- `lib/` concentra o cliente PostgreSQL/Prisma e helpers gerais. Features acessam dados persistidos somente por seus próprios services; esses services usam `lib/db.ts` e `lib/with-database-role.ts`.
- `store/` contém apenas estado global ou compartilhado entre features. Nomeie cada arquivo como `use-<dominio>-store.ts`. Estado local de uma única feature deve permanecer nela.
- Não crie `shared/`, `entities/`, `widgets/` ou uma pasta genérica de tipos.

## Convenções

- Features e diretórios: `kebab-case` (`ficha-tecnica`, `controle-estoque`).
- Componentes React: `PascalCase.tsx`.
- Hooks: `use-nome-do-hook.ts`.
- Serviços: `nome-do-servico.ts`.
- Tipos: no arquivo onde são usados ou em `features/<feature>/types.ts`; não crie `src/types`.
- Importe diretamente o arquivo real. Barrel files `index.ts` e `index.tsx` que apenas reexportam arquivos da pasta são proibidos.
- Use os aliases `@/features/*`, `@/components/*`, `@/hooks/*`, `@/lib/*` e `@/store/*`.
- TypeScript é estrito; `any` explícito é proibido.

## State management

Zustand é a solução de estado global. Crie store apenas para estado que atravessa componentes ou features, como carrinho, sessão ou filtros compartilhados. Evite duplicar dados de servidor no store: o serviço responsável pela feature é a fonte para dados persistidos.

## Stack

- Next.js App Router e React
- TypeScript estrito
- Tailwind CSS e shadcn/ui
- Zustand
- PostgreSQL, Prisma ORM e Docker para persistência

## Comandos

Use exclusivamente pnpm.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## Commits e qualidade

O Husky roda `pnpm exec lint-staged` antes de cada commit. Para arquivos JS/TS/TSX em `src`, lint-staged executa `pnpm lint` e `pnpm typecheck`.

Antes de abrir PR, execute também `pnpm build`. Não contorne hooks nem edite `node_modules` manualmente.

## Regras de negócio

Fonte de verdade: `Documento de Especificação e Regras de Negócio - Ateliê de Crochê.docx` (BRD), extraído em 28/09/2026 para [docs/TRILHAS_DESENVOLVIMENTO.md](docs/TRILHAS_DESENVOLVIMENTO.md).

As regras de ficha técnica, precificação, estoque, produção, pedidos e frete já estão extraídas e organizadas por trilha de desenvolvimento no arquivo acima. Política de cancelamento/troca, gateway de pagamento/antifraude e regiões de frete atendidas continuam **pendentes de decisão do negócio** — não as suponha a partir de protótipos, seeds ou documentos de design.

## Restrições importantes

- Não implemente lógica de negócio em componentes de UI, layouts ou páginas.
- Não acesse PostgreSQL/Prisma diretamente fora de services da feature responsável.
- Consultas a dados protegidos por Row Level Security devem executar em `withDatabaseRole`, dentro da transação, com o papel obtido da sessão validada.
- Não use npm ou yarn.
- Não crie dependências circulares entre features.
- Não suba segredos, arquivos `.env` ou dados pessoais para o Git.

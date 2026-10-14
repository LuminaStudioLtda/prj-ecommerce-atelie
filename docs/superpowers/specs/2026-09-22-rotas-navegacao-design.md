# Rotas de navegação públicas (design)

## Contexto

O `SiteHeader` (spec anterior: `2026-09-22-site-header-design.md`) hoje só existe em `/home` (protegida) e seus itens de menu ("Loja", "Coleções", "Sob Medida", "Sobre", "Contato") e ícones (favoritos, carrinho, conta) são apenas visuais, sem destino. Este spec torna todas essas rotas funcionais, como uma loja pública de verdade.

## Escopo

- Uma nova página pública `/inicio` (landing da loja) — resolve o conflito de "Início" apontar para a `/home` protegida.
- Oito páginas públicas novas, sem exigir login: `/inicio`, `/loja`, `/colecoes`, `/sob-medida`, `/sobre`, `/contato`, `/favoritos`, `/carrinho`, `/perfil`.
- Cada página nova é um placeholder simples (`SiteHeader` + título + "Conteúdo em breve.") — não há produtos, conteúdo ou regras de negócio reais ainda (backend e regras de negócio continuam pendentes, conforme `ARCHITECTURE.md`).
- `SiteHeader` atualizado: os 6 itens de menu ("Início", "Loja", "Coleções", "Sob Medida", "Sobre", "Contato") viram links reais para essas rotas. Os ícones de favoritos, carrinho e perfil viram links para `/favoritos`, `/carrinho` e `/perfil` respectivamente. O ícone de busca continua só visual (sem rota pedida). O logo "Ateliê" passa a linkar para `/inicio` (em vez de `/home`).
- `/home` continua existindo exatamente como está hoje (protegida por sessão, com botão "Sair") — só sai do menu de navegação; continua sendo o destino do login/cadastro mockado.

**Fora de escopo:** conteúdo real de produtos/coleções, funcionalidade real de busca/carrinho/favoritos/perfil, qualquer integração com backend.

## Estrutura de arquivos

- **Novo** `src/components/placeholder-page.tsx` — componente compartilhado `PlaceholderPage({ title })`, que renderiza `SiteHeader` + um título centralizado. Evita repetir a mesma estrutura nas 8 páginas novas.
- **Novos** 8 arquivos de rota, cada um usando `PlaceholderPage`:
  - `src/app/inicio/page.tsx`
  - `src/app/loja/page.tsx`
  - `src/app/colecoes/page.tsx`
  - `src/app/sob-medida/page.tsx`
  - `src/app/sobre/page.tsx`
  - `src/app/contato/page.tsx`
  - `src/app/favoritos/page.tsx`
  - `src/app/carrinho/page.tsx`
  - `src/app/perfil/page.tsx`
- **Modificado** `src/components/site-header.tsx` — menu vira lista de `{ label, href }` renderizada como `Link`; ícones de favoritos/carrinho/perfil viram `Link` (com `aria-label` no próprio link, ícone com `aria-hidden`); logo aponta para `/inicio`.

## Comportamento

- Todas as páginas novas são públicas — nenhuma tem a checagem de `isAuthenticated`/redirect que `/home` tem.
- Sem estado, sem lógica de negócio nas páginas novas — puramente apresentacionais.
- O fluxo de login/cadastro continua indo para `/home` (não muda nesta spec).

## Testagem

Sem suíte automatizada configurada. Verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e `curl` em cada rota nova (todas devem responder 200 e conter o texto do respectivo título, sem exigir sessão). Checagem visual/interativa (clicar nos links, navegar entre as páginas) fica para o navegador, fora do alcance das ferramentas automatizadas deste ambiente.

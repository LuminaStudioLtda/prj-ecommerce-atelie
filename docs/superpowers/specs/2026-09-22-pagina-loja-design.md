# Página da Loja — catálogo funcional (design)

## Contexto

O `SiteHeader` já linka para `/loja`, hoje um placeholder simples. O usuário forneceu uma referência visual detalhada: uma página de catálogo com cabeçalho descritivo, contagem de peças, ordenação, sidebar de filtros (categoria, fibra, paleta de cor, faixa de preço, modalidade de produção) com chips de filtro aplicado, grid de produtos e "carregar mais". Não existe backend/banco de produtos ainda — as regras de negócio de ficha técnica, preço e estoque continuam pendentes conforme `ARCHITECTURE.md`.

## Escopo

Uma página `/loja` com catálogo **funcional client-side** sobre um conjunto fixo de 24 produtos mockados:

- Cabeçalho da coleção (rótulo, título "Nossas Criações", descrição).
- Contagem "Exibindo X de Y peças artesanais" + dropdown de ordenação (Mais Recentes / Menor Preço / Maior Preço) — funcional.
- Sidebar de filtros, todos funcionais: categorias (checkbox, múltipla escolha), fibras/matéria-prima (checkbox, múltipla escolha), paleta de cor (swatches clicáveis, múltipla escolha), faixa de preço (min/max numérico), modalidade de produção (rádio: todas/pronta entrega/sob demanda), "Limpar Todos".
- Chips de filtros aplicados (categoria, material, cor — não preço/modalidade), removíveis individualmente.
- Grid de produtos: cada card tem placeholder de imagem cinza genérico, badge opcional (Lançamento/Em Demanda/Edição Limitada/Pronta Entrega), coração de favorito (toggle visual local, não persiste, não compartilha com `/favoritos`), descrição da fibra, nome, preço (formatado em R$), swatches de cor.
- "Carregar Mais Peças do Ateliê": revela mais 6 produtos por vez, dentro do conjunto já filtrado/ordenado.

**Simplificação deliberada (decidida com o usuário):** sem paginação numerada (1,2,3,4) — só "Carregar Mais". As contagens de categoria/material no filtro são totais fixos do catálogo completo (não recalculam dinamicamente conforme outros filtros ativos), para manter a lógica simples.

**Fora de escopo:** fotos reais de produto, favoritos persistidos/compartilhados, página de detalhe do produto (nome não é link), checkout/carrinho de verdade, dados vindos de backend, paginação numerada.

## Estrutura de arquivos

Nova feature `src/features/loja/` (domínio de negócio próprio, conforme `ARCHITECTURE.md`):

- `types.ts` — `Product`, `ProductCategory`, `ProductMaterial`, `ProductColorTone`, `ProductionMode`, `ProductBadge`, `SortOption`, `ProductFilters`.
- `constants.ts` — listas de categorias/materiais/tons de cor, mapa de classe Tailwind por tom de cor, `MIN_PRICE`/`MAX_PRICE`/`PRODUCTS_PER_PAGE`.
- `services/product-service.ts` — os 24 produtos mockados + contagens por categoria/material (hoje estático; quando o backend existir, esse é o arquivo que passa a chamar uma API real, sem mudar quem o consome).
- `components/ProductCard.tsx` — card de produto.
- `components/FilterSidebar.tsx` — sidebar de filtros.
- `components/AppliedFilters.tsx` — chips de filtro aplicado.
- `components/LojaCatalog.tsx` — orquestrador: estado de filtros/ordenação/paginação, filtragem client-side, compõe os componentes acima.
- **Modificado** `src/app/loja/page.tsx` — troca `PlaceholderPage` por `SiteHeader` + `LojaCatalog`.

## Comportamento

- Toda a filtragem/ordenação/paginação acontece no cliente, em memória, sobre o array fixo de produtos — sem chamada de API.
- Estado local ao componente `LojaCatalog` (`useState`), sem Zustand — é estado de uma única feature/página, não compartilhado.
- Alterar qualquer filtro ou ordenação reinicia a quantidade visível para 6 (primeira "página").

## Testagem

Sem suíte automatizada configurada. Verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e `curl` (confirma o HTML inicial: título, sidebar, contagem de categorias, primeiros produtos, botão "Carregar Mais"). A interatividade real dos filtros (clicar, ver a grade mudar) depende de JavaScript no navegador e não pode ser verificada por `curl` — fica para checagem manual, como já vem acontecendo nas páginas anteriores deste projeto.

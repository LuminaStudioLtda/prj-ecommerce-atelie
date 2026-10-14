# Página de detalhe do produto (design)

## Contexto

O usuário forneceu uma referência visual de uma página de detalhe de produto (galeria de imagens, preço com parcelamento, selos de destaque, descrição, seleção de tonalidade/tamanho, quantidade e "Adicionar à Sacola"). Hoje, na `/loja`, o nome do produto não é link (decisão explícita do spec anterior). Este spec reverte isso: clicar num produto abre uma página de detalhe de verdade.

## Escopo

- Rota dinâmica `/loja/[productId]` (App Router), usando o `id` já existente de cada produto mockado.
- `ProductCard` (na `/loja`) passa a linkar (imagem + nome/preço) para `/loja/[id]`; o coração de favorito continua fora do link, como botão independente.
- Página de detalhe com: galeria (4 miniaturas + imagem principal, todos placeholders cinza — sem fotos reais, como já é o padrão do projeto; clicar numa miniatura troca qual está "ativa" visualmente), badge do produto sobreposto na imagem, ícone de zoom decorativo (sem função real).
- Painel de informações: rótulo genérico (coleção + modalidade de produção + referência gerada a partir do índice do produto), nome, preço + parcelamento ("em até 6x de R$ X sem juros" — cálculo simples de exibição, não é uma regra de negócio real de pagamento), 3 selos de destaque com texto genérico e igual em todo produto ("45 Horas" / "Fios Nobres" / "Sob Medida"), descrição também genérica (mas menciona o material real do produto), seleção de tonalidade do fio (reaproveita `colorTones` do produto), seleção de tamanho (P/M/G/GG, iguais para todo produto, sem dado de estoque real), contador de quantidade, botão "Adicionar à Sacola" e botão de favoritar.
- "Adicionar à Sacola" incrementa um contador compartilhado (nova store Zustand `useCartStore`, em memória, sem persistência) que aparece no ícone de carrinho do `SiteHeader` — hoje esse ícone mostra "0" fixo; passa a refletir o total real de itens adicionados durante a sessão da aba (reseta ao recarregar a página, não há carrinho/checkout de verdade).

**Decisões explícitas do usuário:**
- Conteúdo (descrição, selos, referência, série) é genérico e reaproveitado entre os 24 produtos — só nome, preço, material e tons de cor vêm dos dados reais de cada produto. Escrever 24 descrições únicas está fora de escopo.
- Tamanho/quantidade/tonalidade têm interação real (estado local muda de verdade); "Adicionar à Sacola" tem efeito real e visível (incrementa o contador do carrinho no header).

**Fora de escopo:** fotos reais, múltiplas imagens realmente diferentes por produto, estoque por tamanho, página de carrinho funcional (o ícone só mostra a contagem), checkout, avaliações/reviews.

## Estrutura de arquivos

- **Novo** `src/store/use-cart-store.ts` — store Zustand compartilhada: `itemCount: number`, `addItems(quantity: number): void`. Sem persistência (`sessionStorage`), pois o usuário optou por um contador simples que reseta ao recarregar.
- **Modificado** `src/components/site-header.tsx` — o badge do ícone de carrinho passa a ler `itemCount` de `useCartStore` em vez do "0" fixo.
- **Modificado** `src/features/loja/components/ProductCard.tsx` — imagem e nome/preço viram `Link` para `/loja/[id]`; coração de favorito continua como botão separado, fora do link (evita botão dentro de link, HTML inválido).
- **Novo** `src/features/loja/components/ProductDetail.tsx` — componente client com toda a UI de detalhe descrita acima, recebe `product: Product` via prop.
- **Novo** `src/app/loja/[productId]/page.tsx` — rota dinâmica: busca o produto em `PRODUCTS` pelo `id` da URL; se não encontrar, usa `notFound()` do `next/navigation`; renderiza `SiteHeader` + `ProductDetail`.

## Comportamento

- Estado de galeria/tonalidade/tamanho/quantidade/favorito é local ao `ProductDetail` (`useState`) — não persiste ao sair da página.
- `useCartStore` é a única exceção: precisa ser compartilhada porque o contador aparece no `SiteHeader`, renderizado em todas as páginas. Justificado por `ARCHITECTURE.md`, que cita carrinho como exemplo de estado compartilhado.
- Parcelamento é `preço / 6`, arredondado pela formatação de moeda — cálculo de exibição, não uma regra de precificação real.

## Testagem

Sem suíte automatizada configurada. Verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e `curl` em `/loja/<algum-id-real>` (confirma que o HTML inicial tem nome, preço, selos, tamanhos). Interatividade real (trocar tamanho/tonalidade, clicar "Adicionar à Sacola" e ver o contador do header mudar) depende de JavaScript no navegador — checagem manual, como as páginas anteriores deste projeto.

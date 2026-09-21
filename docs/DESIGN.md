# Design System: Stitch & Soul — Ateliê de Crochê

Fonte de referência: projeto Stitch compartilhado em 21/09/2026. Este documento traduz o modelo em regras implementáveis; ele não é uma cópia automática de HTML/CSS do Stitch.

## 1. Tema visual e atmosfera

Slow craft contemporâneo, tátil e editorial. A loja pública deve parecer uma galeria de fibras naturais: arejada, calorosa e com foco em origem, tempo de feitura e autoria. O admin deve ser mais denso e operacional, mantendo a mesma paleta terrosa e linguagem humana.

- Densidade: loja 4/10; admin 7/10.
- Variação: 6/10, com hero editorial assimétrico e grades não uniformes.
- Movimento: 4/10; discreto, funcional e sempre via `transform` ou `opacity`.
- Nunca sobrepor texto e imagens; cada conteúdo ocupa uma área própria.

## 2. Paleta e papéis

| Token semântico | Valor | Uso |
| --- | --- | --- |
| `canvas` | `#F9F7F2` | Fundo quente principal. |
| `surface` | `#FFFFFF` | Formulários, tabelas e superfícies elevadas. |
| `ink` | `#30312E` | Texto principal, navegação e contraste. |
| `muted` | `#777773` | Texto auxiliar e metadados. |
| `border` | `#E4E2DD` | Divisórias discretas e campos. |
| `terracotta` | `#8C6A5D` | Ação primária, foco e seleção. Único acento principal. |
| `sage` | `#A3B18A` | Sustentabilidade, sucesso e disponibilidade saudável. |
| `ochre` | `#D4A373` | Aviso leve e detalhes editoriais. |
| `critical` | `#9B3A32` | Estoque crítico, erro e ação destrutiva. |

Não usar preto puro, neon, gradientes de texto ou sombras brilhantes. `sage` e `ochre` são semânticos, não ações primárias concorrentes.

## 3. Tipografia

- **Editorial:** Playfair Display, serif de títulos da referência. Usar apenas na loja, em títulos de campanha, manifesto e produto; nunca em tabelas/admin.
- **Interface:** Work Sans, para textos, navegação, campos e botões.
- **Números e códigos:** fonte mono do sistema para preço calculado, gramatura, lote, SKU, pedido e rastreio.
- Corpo: mínimo de 16 px, entrelinha 1.5–1.7 e largura máxima de 65 caracteres.
- Títulos: `clamp()` e peso controlado; não criar hierarquia somente aumentando tamanho.

## 4. Componentes e estados

### Primitives shadcn/ui

`Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Slider`, `Dialog`, `Sheet`, `Tabs`, `Accordion`, `Table`, `Badge`, `Tooltip`, `Skeleton`, `AlertDialog` e `Toast`.

### Componentes de domínio

| Componente | Contexto | Estados obrigatórios |
| --- | --- | --- |
| `SiteHeader` / `SiteFooter` | Loja | desktop, menu móvel, busca, carrinho com contador, sessão anônima/autenticada. |
| `ProductCard` | home e catálogo | pronta entrega, sob demanda, lançamento, favorito, indisponível, carregando. |
| `ProductGallery` | produto | miniaturas, zoom, imagem ausente, carregando. |
| `ProductOptions` | produto | cor, tamanho, variação indisponível, guia de medidas. |
| `ProductionModeBadge` | loja e admin | pronta entrega, sob encomenda, pausado. |
| `DeliveryCalculator` | produto/checkout | CEP vazio, inválido, calculando, sucesso, indisponível. |
| `CartItem` / `CartSummary` | carrinho | ajuste de quantidade, remoção com confirmação, estoque alterado. |
| `InventoryTable` | admin | busca, filtros, paginação, vazio, baixo/crítico, carregando/erro. |
| `RecipeMaterialsTable` | admin | insumo inexistente, consumo inválido, custo recalculado. |
| `PricingBreakdown` | admin | custo parcial, margem inválida, preço sugerido, preço manual, alerta de rentabilidade. |
| `ProductionQueueCard` | admin | aguardando pagamento, em confecção, bloqueado por insumo, pronto para envio, concluído. |
| `StatusBadge` | admin | mapeamento centralizado dos estados de pedido/estoque; nunca cor solta por página. |

Botões primários são preenchidos de terracota, com leve compressão no `active`. Campos possuem rótulo acima e erro abaixo. Use skeletons com o mesmo volume do conteúdo; não use spinner genérico como único feedback.

## 5. Layout e responsividade

- Loja: contêiner de até 1400 px; hero em duas zonas, texto alinhado à esquerda e imagem/peça em zona independente.
- Catálogo: filtros em coluna lateral no desktop e `Sheet` no mobile; grade de produtos 1 / 2 / 3 colunas conforme espaço, nunca três cards idênticos como bloco de “benefícios”.
- Produto: galeria e resumo em grid no desktop; uma coluna no mobile.
- Admin: sidebar persistente no desktop; drawer no mobile. Tabelas devem ter alternativa por cards ou scroll horizontal claramente sinalizado em telas pequenas.
- Abaixo de 768 px, todo layout multicoluna passa a uma coluna e os alvos de toque têm no mínimo 44 px.
- Usar `min-h-[100dvh]`, não `h-screen`.

## 6. Movimento e acessibilidade

- Duração de interface: 150–220 ms; `transform` e `opacity` somente.
- Listas podem entrar em cascata leve; carregamentos usam shimmer contido.
- Respeitar `prefers-reduced-motion` e nunca bloquear conteúdo por animação.
- Foco visível em terracota, contraste AA, rótulos associados, navegação por teclado e textos alternativos específicos da peça.

## 7. Proibições

- Sem emoji, cursor customizado, glow neon ou sombra pesada.
- Sem `#000000`, azul/roxo neon, gradiente decorativo nem texto genérico de IA.
- Sem cards empilhados sem propósito de hierarquia.
- Sem imagens quebradas, texto sobreposto, scroll horizontal móvel acidental ou controles só por cor.
- Sem usar dados fictícios de clientes em produção; o conteúdo do Stitch é referência visual e não base de dados.

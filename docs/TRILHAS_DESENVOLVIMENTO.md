# Trilhas de desenvolvimento — E-commerce Ateliê

Fonte de verdade: `Documento de Especificação e Regras de Negócio - Ateliê de Crochê.docx` (BRD), lido e extraído em 28/09/2026. Este arquivo substitui as hipóteses de `REGRAS_DE_NEGOCIO.md` como referência de regras de negócio; mantenha os dois em sincronia se o BRD for revisado.

O desenvolvimento recomeça do zero a partir da `main` — nenhum código de branch anterior (`feature/frontend`) será reaproveitado. As trilhas abaixo descrevem o que precisa ser **criado**, não o que já existe.

## Como usar este arquivo

Cada trilha é uma frente de trabalho quase independente, mapeada para uma ou mais features em `src/features/<nome-kebab-case>/` (ver `ARCHITECTURE.md`). Um dev escolhe uma trilha livre, marca as tarefas que for pegando (`- [ ]` → `- [x]`, adicionando seu nome entre parênteses) e abre PR pequeno por tarefa ou por grupo coeso de tarefas.

Antes de começar uma trilha, confira a seção **Depende de** — trilhas com dependência devem esperar ao menos a modelagem de dados e os contratos de serviço da trilha anterior estarem definidos (não necessariamente 100% implementados).

Siga `ARCHITECTURE.md` desde o primeiro componente: `PascalCase.tsx` para componentes React, `use-nome-do-hook.ts` para hooks, `nome-do-servico.ts` para serviços, sem barrel files, sem `any` explícito, e nenhuma lógica de negócio em página/componente de UI — ela vive no `service` da feature.

Ordem sugerida de arranque: **Trilha 0 → (1, 2 em paralelo) → 3 → (4, 6 em paralelo) → 5 → 7 → 8**. Trilha 9 é independente e pode entrar em qualquer momento.

---

## Trilha 0 — Fundação (pré-requisito de todas) — Pedro Henrique Sanson

**Depende de:** nada. **Feature(s):** `lib/`, `store/`, infraestrutura geral. **Componentes de UI:** nenhum (trabalho de infra/backend).

### Funcionalidades

- [x] Modelar entidades e relações centrais em `prisma/schema.prisma`: usuário/papel, insumo, lote, ficha técnica (BOM) e item de BOM, produto, categoria, pedido, item de pedido e movimento de estoque.
- [x] Configurar cliente Prisma/PostgreSQL em `src/lib/db.ts` e definir acesso por services de feature, sem query nas páginas.
- [x] Implementar RBAC base: papéis `Visitante Anônimo`, `Cliente Autenticado`, `Administrador/Artesã` (seção 1.3 do BRD).
- [x] Implementar Row Level Security no PostgreSQL para tabelas de insumos, lotes, BOM e margens: políticas versionadas na migration inicial `prisma/migrations/20261001000000_initial/migration.sql` (seção 2.2; aplicar ao banco local com `pnpm db:migrate:dev`).
- [x] Isolar rotas administrativas sob prefixo `/admin` com guarda server-side, validando assinatura/expiração da sessão e `role` antes de renderizar.

### Critérios de aceite

- Toda feature nova em `src/features/*` acessa dado só via seu próprio `service`; nenhuma página faz fetch/query direta.
- Rota sob `/admin` sem sessão de `ADMIN` redireciona ou bloqueia — testável manualmente e com teste automatizado.

**Status da entrega:** implementação da Trilha 0 concluída. O banco local recebe o schema e as políticas RLS ao executar `pnpm db:migrate:dev`.

---

## Trilha 1 — Autenticação, Contas e Perfil (`autenticacao`, `perfil`)

**Depende de:** Trilha 0.

### Componentes a criar

- ⬜ `LoginForm` / `RegisterForm` — formulários de e-mail e senha com validação de campo.
- ⬜ `SocialLoginButtons` — botões de OAuth (Google/Facebook).
- ⬜ `PasswordResetForm` — tela "esqueci minha senha" (pedir e-mail, exibir estado enviado).
- ⬜ `PasswordResetConfirmForm` — definir nova senha a partir do token recebido por e-mail.
- ⬜ `EmailConfirmationBanner` — aviso de conta não confirmada com botão de reenvio.
- ⬜ `AddressForm` — cadastro/edição de endereço com rótulo (casa/trabalho/presente).
- ⬜ `AddressList` — lista de endereços do cliente com ações de editar/remover/definir padrão.
- ⬜ `OrderHistoryList` / `OrderStatus` — histórico de pedidos e status detalhado por pedido na área do cliente (depende de dado real da Trilha 7).

### Store / Services

- ⬜ `store/use-session-store.ts` — usuário autenticado (`id`, `nome`, `role`) e token, não apenas um booleano de sessão.
- ⬜ `features/autenticacao/services/auth-service.ts` — login, cadastro, hashing de senha, emissão/validação de JWT.

### Funcionalidades

- [ ] Login/cadastro por e-mail e senha com hashing forte (ex.: bcrypt/argon2).
- [ ] OAuth social (Google/Facebook).
- [ ] Fluxo "esqueci minha senha" via token temporário por e-mail.
- [ ] Confirmação de conta por e-mail.
- [ ] Gestão de múltiplos endereços de entrega por cliente (casa, trabalho, presente).
- [ ] Histórico de pedidos e status detalhado por pedido na área do cliente.
- [ ] Validação de token JWT com claim de `role` em toda requisição à API administrativa (consumido pela guarda de rota da Trilha 0).

---

## Trilha 2 — Insumos e Matéria-Prima (`insumos`)

**Depende de:** Trilha 0.

### Componentes a criar

- ⬜ `InsumoForm` — cadastro/edição de insumo (SKU, nome comercial, marca, cor, lote, unidade, peso do novelo/cone, rendimento em metros, preço de aquisição).
- ⬜ `InventoryTable` — listagem com busca, filtros, paginação e alertas de nível baixo/crítico.
- ⬜ `InsumoCostBadge` — exibe o custo unitário calculado (preço/grama ou preço/metro) com até 5 casas decimais.
- ⬜ `StockThresholdAlert` / `StatusBadge` — alerta visual quando o ponto de pedido é atingido (estados `ok`/`baixo`/`critico`).
- ⬜ `RetroactiveImpactDialog` — modal que lista as fichas técnicas afetadas quando o custo de um insumo é reajustado.

### Funcionalidades

- [ ] CRUD de insumo: SKU/código interno, nome comercial, marca, cor e **lote** (obrigatório para variação de tonalidade em fios).
- [ ] Metrificação: unidade (gramas, metros ou unidade), peso do novelo/cone, rendimento total em metros.
- [ ] Financeiro: preço de aquisição da embalagem + cálculo automático do custo unitário (preço/grama ou preço/metro), com **até 5 casas decimais**.
- [ ] Controle de estoque: quantidade atual, ponto de pedido (estoque mínimo) configurável por insumo, alertas visuais de criticidade.
- [ ] Regra de impacto retroativo: ao reajustar preço de um insumo, listar automaticamente todas as fichas técnicas que o usam (via `RetroactiveImpactDialog`) e notificar a artesã sobre necessidade de reajuste do preço de venda.

---

## Trilha 3 — Ficha Técnica e Motor de Precificação (`ficha-tecnica`)

**Depende de:** Trilha 2 (insumo e custo unitário precisam existir).

### Componentes a criar

- ⬜ `RecipeMaterialsTable` — insumos da ficha técnica ligados por `insumoId` real (não texto livre), trazendo o custo unitário do insumo cadastrado.
- ⬜ `LaborTimeInput` — captura de tempo total de confecção em horas **e** minutos.
- ⬜ `PricingSettingsForm` — configuração global de Valor da Hora Trabalhada (VHT) e Taxa de Perdas pelo administrador.
- ⬜ `PricingBreakdown` — exibe cada termo da fórmula separadamente (custo insumos, custo mão de obra, embalagens, taxa de perdas, margem, preço sugerido).
- ⬜ `ManualPriceOverrideField` — campo de preço manual com exibição da margem real calculada (cálculo reverso).

### Funcionalidades

- [ ] Estrutura de BOM por produto: insumos com quantidade exata, custos indiretos (embalagem, tags, cartões, mimos) e mão de obra (tempo estimado em horas e minutos).
- [ ] Configuração global do VHT e da Taxa de Perdas (%) via `PricingSettingsForm`.
- [ ] Motor de precificação com as fórmulas exatas do BRD (não aproximar nem redefinir):
  ```text
  Custo_Insumos   = Σ (Quantidade_Usada * Custo_Unitário_Insumo)
  Custo_Mão_Obra  = (Tempo_Total_Minutos / 60) * VHT
  Custo_Direto    = Custo_Insumos + Custo_Mão_Obra + Embalagens
  Preço_Sugerido  = Custo_Direto * (1 + Taxa_Perdas) * (1 + Margem_Lucro_%)
  ```
- [ ] Sobrescrita manual de preço via `ManualPriceOverrideField`: ao inserir preço manual, calcular e exibir a **margem de lucro real** sobre o custo direto (cálculo reverso).
- [ ] Testes unitários das fórmulas acima (casos de borda: taxa/margem zero, custo insumo com 5 casas decimais, tempo em minutos não múltiplo de 60).

---

## Trilha 4 — Catálogo e Produtos (`catalogo`)

**Depende de:** Trilha 3 para exibir preço real (pode iniciar cadastro/conteúdo em paralelo com preço mockado).

### Componentes a criar

- ⬜ `ProductForm` (admin) — título, descrição rica em Markdown, categorização, modalidade de venda.
- ⬜ `ProductGallery` — upload e reordenação de fotos, reaproveitada na página de produto da loja.
- ⬜ `ProductCard` — card de vitrine com estados: pronta entrega, sob encomenda, lançamento, favorito, indisponível, carregando.
- ⬜ `PublicationStatusSelect` — seletor dos 4 estados (`Rascunho`, `Ativo`, `Pausado`, `Fora de Linha`) com aviso de efeito (ex.: "Pausado continua visível, mas não compra").
- ⬜ `StockModeFields` — subformulário condicional: campo de "quantidade física" quando Pronta Entrega, campo de "prazo de produção (dias úteis)" obrigatório quando Sob Encomenda.

### Funcionalidades

- [ ] Cadastro de produto: título, descrição rica (Markdown), galeria de fotos, categorização.
- [ ] Modalidade de estoque **Pronta Entrega** (quantidade física em prateleira) via `StockModeFields`.
- [ ] Modalidade **Sob Encomenda** (sem estoque físico; exige prazo de produção em dias úteis, campo obrigatório) via `StockModeFields`.
- [ ] Ciclo de vida de publicação: `Rascunho` (invisível) → `Ativo` (visível e vendável) → `Pausado` (visível, indisponível para compra) → `Fora de Linha` (arquivado), via `PublicationStatusSelect`; a vitrine deve respeitar esse status ao listar.

---

## Trilha 5 — Loja Pública / Vitrine e Carrinho (`loja`, `carrinho`)

**Depende de:** Trilha 4.

### Componentes a criar

- ⬜ `SiteHeader` / `SiteFooter` — navegação, busca, contador de carrinho, sessão anônima/autenticada.
- ⬜ `FilterSidebar` / `AppliedFilters` — filtros dinâmicos por categoria, preço e disponibilidade (Pronta Entrega vs. Encomenda), com versão em `Sheet` no mobile.
- ⬜ `ProductDetail` / `ProductOptions` — página de produto com variações e guia de medidas.
- ⬜ `FavoritesList` — lista de favoritos do cliente.
- ⬜ `CartList` / `CartItem` / `CartSummary` / `QuantityStepper` — carrinho com ajuste de quantidade e remoção com confirmação.
- ⬜ `DeliveryEstimateBanner` — exibe o `Prazo_Total_Entrega` consolidado do carrinho misto (fórmula abaixo).
- ⬜ `InsufficientMaterialNotice` — mensagem "Matéria-prima indisponível para encomenda no momento" com botão de compra desabilitado.

### Store

- ⬜ `store/use-cart-store.ts` — carrinho com `persist`/`createJSONStorage` (precisa sobreviver a reload).
- ⬜ `store/use-favorites-store.ts` — favoritos sincronizados com a conta do cliente autenticado (Trilha 1), não só locais.

### Funcionalidades

- [ ] Filtros dinâmicos de vitrine: categoria, preço e disponibilidade (Pronta Entrega vs. Encomenda).
- [ ] Carrinho persistente entre sessões.
- [ ] Regra de prazo consolidado em carrinho misto (Pronta Entrega + Sob Encomenda), exibida via `DeliveryEstimateBanner`:
  ```text
  Prazo_Total_Entrega = MAX(Prazos_de_Produção_dos_Itens) + Prazo_do_Frete_Selecionado
  ```
- [ ] Validação prévia de insumos no checkout: para item Sob Encomenda, verificar matéria-prima suficiente; se insuficiente, desabilitar compra com `InsufficientMaterialNotice` (seção 8.3 do BRD — pode ser implementado aqui ou na Trilha 7, decidir conforme dono do checkout).

---

## Trilha 6 — Frete e Envio (`frete`)

**Depende de:** Trilha 0 (pode avançar em paralelo às trilhas 1–5, integra no checkout/carrinho da Trilha 5).

### Componentes a criar

- ⬜ `DeliveryCalculator` — estados: CEP vazio, inválido, calculando, sucesso, indisponível.
- ⬜ `ShippingMethodSelect` — lista de modais (PAC, SEDEX, transportadora, Retirada no Ateliê) com preço e prazo de cada um.
- ⬜ `PickupAtStudioNotice` — aviso de retirada disponível quando o CEP informado está na lista de CEPs atendidos.

### Funcionalidades

- [ ] Integração com gateway(s) de frete: PAC, SEDEX e transportadoras.
- [ ] Opção "Retirada no Ateliê" configurável por CEPs específicos.
- [ ] Cálculo de volume: soma de peso e dimensões de todos os itens do carrinho para definir a caixa final, aplicando peso cubado quando exigido pela transportadora.
- [ ] Data estimada de entrega = tempo de confecção (maior prazo de produção do carrinho, ver fórmula da Trilha 5) + tempo de trânsito da transportadora.

---

## Trilha 7 — Pedidos, Produção e Estoque (`pedidos`, `producao`)

**Depende de:** Trilhas 2, 3, 4, 5 e 6 (usa ficha técnica, catálogo, carrinho e frete).

### Componentes a criar

- ⬜ `CheckoutSteps` / `CheckoutSummary` — fluxo de finalização de compra (endereço, frete, pagamento, revisão de prazo).
- ⬜ `StatusBadge` — mapeamento centralizado de todos os estados de pedido (ver máquina de estados abaixo); nunca cor solta por página.
- ⬜ `ProductionQueueCard` — card do Kanban de produção, com o insumo faltante específico quando bloqueado.
- ⬜ `OrderTrackingCodeField` — campo de admin para registrar código de rastreio ao mover pedido para `ENVIADO`.

### Funcionalidades

- [ ] Implementar `CheckoutSteps`/`CheckoutSummary` ligando carrinho (Trilha 5) + frete (Trilha 6) + criação do pedido em estado `CRIADO`.
- [ ] Máquina de estados do pedido: `CRIADO` → `PAGO` → `EM PRODUÇÃO` → `PRONTO PARA ENVIO` → `ENVIADO` → `ENTREGUE` / `CANCELADO`.
- [ ] Gatilho no estado `PAGO`: reserva de estoque e entrada em produção.
- [ ] Baixa automática de estoque ao atingir `PAGO`:
  - Pronta Entrega: subtrai 1 unidade do estoque do produto final.
  - Sob Encomenda: acessa a ficha técnica (BOM) e subtrai as quantidades de fios/insumos do estoque de matéria-prima (não há produto final a debitar).
- [ ] Fila de produção em Kanban: card do pedido move para "Em Produção" quando alocado na agenda da artesã (evento que a Trilha 8 escuta para disparar e-mail).
- [ ] Geração/registro de código de rastreio ao mover pedido para `ENVIADO`, via `OrderTrackingCodeField`.
- [ ] Validação prévia de insumos no checkout (se não implementada na Trilha 5): bloquear compra Sob Encomenda sem matéria-prima suficiente.

---

## Trilha 8 — Notificações Transacionais (`notificacoes`)

**Depende de:** Trilha 7 (eventos de pedido/produção/envio disparam os e-mails).

### Componentes/serviços a criar

- ⬜ `notificacoes-service.ts` — camada única de disparo de e-mail transacional (fonte de verdade para todos os templates abaixo).
- ⬜ Templates: `OrderConfirmationEmail`, `ProductionStartedEmail`, `TrackingCodeEmail`.

### Funcionalidades

- [ ] E-mail de confirmação imediatamente após criação do pedido (evento `CRIADO`).
- [ ] E-mail de produção quando o card muda para "Em Produção" no Kanban ("sua peça começou a ser tecida").
- [ ] E-mail de rastreio automático assim que o código de postagem é inserido no sistema (via `OrderTrackingCodeField` da Trilha 7).

---

## Trilha 9 — Sob Medida / Encomenda Personalizada (`sob-medida`) — fora do BRD

O BRD não descreve esse fluxo (ele só define "Sob Encomenda" como modalidade de estoque de um produto de catálogo, não um pedido de peça totalmente personalizada). Validar com a artesã antes de implementar se esse fluxo deve existir e, se sim, se ele gera um `Pedido` dentro da máquina de estados da Trilha 7 ou é só um formulário de contato/orçamento avulso.

### Componentes a criar (se aprovado)

- ⬜ `CustomOrderIntro` — apresentação do fluxo de encomenda personalizada.
- ⬜ `CustomOrderForm` — nome, e-mail, tipo de peça, material, descrição e prazo desejado.

### Funcionalidades (se aprovado)

- [ ] Decidir com o negócio: encomenda personalizada gera um `Pedido` (entra na máquina de estados da Trilha 7) ou é só um lead/solicitação de orçamento.
- [ ] Persistir a solicitação e notificar a artesã.
- [ ] Se virar pedido: precificação manual pela artesã via `PricingBreakdown` (Trilha 3) antes de confirmar com o cliente.

---

## Fora de escopo deste BRD (não codificar sem decisão do negócio)

Itens que aparecem no sistema mas não têm regra definida no documento fonte — mantidos de `REGRAS_DE_NEGOCIO.md`:

- política de cancelamento, troca e devolução;
- parcelamento, gateway de pagamento e antifraude;
- regiões de frete atendidas e regras de exceção;
- reserva vs. baixa definitiva de insumos em caso de cancelamento pós-pagamento;
- multi-moeda, impostos e emissão fiscal.

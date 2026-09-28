# Trilhas de desenvolvimento — E-commerce Ateliê

Fonte de verdade: `Documento de Especificação e Regras de Negócio - Ateliê de Crochê.docx` (BRD), lido e extraído em 28/09/2026. Este arquivo substitui as hipóteses de `REGRAS_DE_NEGOCIO.md` como referência de regras de negócio; mantenha os dois em sincronia se o BRD for revisado.

Inventário de componentes cruzado com a branch `feature/frontend` em 28/09/2026 e com `docs/DESIGN.md`.

## Como usar este arquivo

Cada trilha é uma frente de trabalho quase independente, mapeada para uma ou mais features em `src/features/<nome-kebab-case>/` (ver `ARCHITECTURE.md`). Um dev escolhe uma trilha livre, marca as tarefas que for pegando (`- [ ]` → `- [x]`, adicionando seu nome entre parênteses) e abre PR pequeno por tarefa ou por grupo coeso de tarefas.

Antes de começar uma trilha, confira **Depende de** e **Estado atual** — várias telas já existem como casca visual na branch `feature/frontend`, com dados mockados em memória (arrays `const`, `mockAuthenticate`/`mockSubmitCustomOrder` com `setTimeout`). Nenhuma delas persiste dado real, valida regra de negócio do BRD ou fala com banco. O trabalho de cada trilha é, na maioria dos casos, **substituir o mock por lógica real**, não criar a tela do zero.

Legenda de status:

- ✅ **Existe (mock/visual)** — componente ou serviço já implementado na branch `feature/frontend`, sem regra de negócio real.
- 🔧 **Ajustar** — existe mas precisa mudar de forma (tipo, prop, contrato de service) para caber na regra real.
- ⬜ **Criar** — não existe ainda em nenhuma branch.

Ordem sugerida de arranque: **Trilha 0 → (1, 2 em paralelo) → 3 → (4, 6 em paralelo) → 5 → 7 → 8**. Trilha 9 é independente e pode entrar em qualquer momento.

### Dívida técnica a resolver na Trilha 0

- `src/components/site-header.tsx` e `src/components/placeholder-page.tsx` estão em kebab-case; `ARCHITECTURE.md` exige `PascalCase.tsx` para componentes React. Renomear para `SiteHeader.tsx` e `PlaceholderPage.tsx` ao tocar nesses arquivos.
- Nenhum `service` atual acessa MySQL — todos exportam arrays/const mockados no próprio arquivo do `service`. Ao introduzir persistência, o service passa a ser a única porta de entrada para o dado (conforme `ARCHITECTURE.md`), e os arrays mock devem virar seeds de desenvolvimento, não fonte de dado em runtime.
- `use-session-store.ts` guarda apenas `isAuthenticated: boolean`; não há usuário, papel (`role`) nem token — precisa ser refeito na Trilha 1 para caber em RBAC/JWT.
- `use-cart-store.ts` guarda só `productId` + `quantity`, sem hidratação/persistência (`persist` do zustand não está aplicado, ao contrário do `use-session-store`) — ajustar na Trilha 5.

---

## Trilha 0 — Fundação (pré-requisito de todas)

**Depende de:** nada. **Feature(s):** `lib/`, `store/`, infraestrutura geral. **Componentes de UI:** nenhum (trabalho de infra/backend).

### Funcionalidades

- [ ] Modelar entidades e relações centrais: usuário/papel, insumo, lote, ficha técnica (BOM) e item de BOM, produto, categoria, pedido, item de pedido e movimento de estoque.
  - Usar como ponto de partida os tipos já rascunhados no front (`InventoryItem`, `TechnicalSheet`/`RecipeMaterial`, `Product`, `ProductionOrder`), mas **completá-los** — hoje faltam, por exemplo, SKU/lote/custo unitário em `InventoryItem`, vínculo por id (hoje é por nome de string) entre `RecipeMaterial.insumo` e o insumo real, e `dataPrazoProducao` em `Product`.
- [ ] Configurar cliente MySQL em `lib/` (ex.: `lib/db.ts`) e definir como as features acessam dados (services por feature, nunca acesso direto fora deles).
- [ ] Implementar RBAC base: papéis `Visitante Anônimo`, `Cliente Autenticado`, `Administrador/Artesã` (seção 1.3 do BRD).
- [ ] Aplicar Row Level Security no banco para tabelas de insumos e margens: apenas `ADMIN` acessa ou altera (seção 2.2).
- [ ] Isolar rotas administrativas sob prefixo `/admin` (já existe em `src/app/admin/*`) com guarda de rota real no front-end — hoje `src/app/admin/layout.tsx` monta o `AdminSidebar` mas não verifica sessão/role.

### Critérios de aceite

- Toda feature nova em `src/features/*` acessa dado só via seu próprio `service`; nenhuma página faz fetch/query direta.
- Rota sob `/admin` sem sessão de `ADMIN` redireciona ou bloqueia — testável manualmente e com teste automatizado.

---

## Trilha 1 — Autenticação, Contas e Perfil (`autenticacao`, `perfil`)

**Depende de:** Trilha 0.

### Estado atual (branch `feature/frontend`)

| Item | Caminho | Status |
| --- | --- | --- |
| Página de login | `src/app/login/page.tsx` | ✅ layout, sem submissão real |
| Página de cadastro | `src/app/cadastro/page.tsx` | ✅ layout, sem submissão real |
| Página de perfil | `src/app/perfil/page.tsx` | ✅ `placeholder-page`, sem conteúdo |
| `LoginForm` | `src/features/auth/components/LoginForm.tsx` | ✅ visual + validação de campo |
| `RegisterForm` | `src/features/auth/components/RegisterForm.tsx` | ✅ visual + validação de campo |
| `SocialLoginButtons` | `src/features/auth/components/SocialLoginButtons.tsx` | ✅ visual, sem OAuth real |
| `LoginBrandPanel` | `src/features/auth/components/LoginBrandPanel.tsx` | ✅ só ilustrativo |
| `auth-service.ts` | `src/features/auth/services/auth-service.ts` | 🔧 só `validatePassword`/`mockAuthenticate` (delay de 800 ms, sem checar credencial) |
| `use-session-store.ts` | `src/store/use-session-store.ts` | 🔧 só `isAuthenticated: boolean`, sem usuário/role/token |

### Componentes a criar

- ⬜ `PasswordResetForm` — tela "esqueci minha senha" (pedir e-mail, exibir estado enviado).
- ⬜ `PasswordResetConfirmForm` — definir nova senha a partir do token recebido por e-mail.
- ⬜ `EmailConfirmationBanner` — aviso de conta não confirmada com botão de reenvio.
- ⬜ `AddressForm` (já listado em `TRELLO_BACKLOG_TECNICO.md` como pendente) — cadastro/edição de endereço com rótulo (casa/trabalho/presente).
- ⬜ `AddressList` — lista de endereços do cliente com ações de editar/remover/definir padrão, usada em `perfil/page.tsx`.
- ⬜ `OrderHistoryList` / `OrderStatus` — histórico de pedidos e status detalhado por pedido, usados em `perfil/page.tsx` (depende de dado real da Trilha 7).

### Funcionalidades

- [ ] Login/cadastro por e-mail e senha com hashing forte (ex.: bcrypt/argon2) — substituir `mockAuthenticate`.
- [ ] OAuth social (Google/Facebook) — dar comportamento real a `SocialLoginButtons`.
- [ ] Fluxo "esqueci minha senha" via token temporário por e-mail.
- [ ] Confirmação de conta por e-mail.
- [ ] Gestão de múltiplos endereços de entrega por cliente (casa, trabalho, presente) em `perfil/page.tsx`.
- [ ] Histórico de pedidos e status detalhado por pedido na área do cliente em `perfil/page.tsx`.
- [ ] Reescrever `use-session-store.ts` para guardar usuário autenticado (`id`, `nome`, `role`) e token, não só um booleano.
- [ ] Validação de token JWT com claim de `role` em toda requisição à API administrativa (consumido pela guarda de rota da Trilha 0).

---

## Trilha 2 — Insumos e Matéria-Prima (`insumos`)

**Depende de:** Trilha 0.

### Estado atual (branch `feature/frontend`)

Existe hoje só do lado de **exibição de estoque já pronto**, dentro da feature `controle-estoque` (não `insumos`) — decidir se a feature de cadastro de insumo nasce separada ou dentro de `controle-estoque`:

| Item | Caminho | Status |
| --- | --- | --- |
| Página de estoque admin | `src/app/admin/estoque/page.tsx` | ✅ layout |
| `InventoryTable` | `src/features/controle-estoque/components/InventoryTable.tsx` | ✅ visual (busca/filtro ainda a confirmar) |
| `inventory-service.ts` | `src/features/controle-estoque/services/inventory-service.ts` | 🔧 array mock de 6 itens, sem SKU/lote/custo |
| `InventoryItem` (tipo) | `src/features/controle-estoque/types.ts` | 🔧 falta SKU, marca, lote, unidade de medida detalhada, peso do novelo/cone, rendimento, preço de aquisição, custo unitário, ponto de pedido |

### Componentes a criar

- ⬜ `InsumoForm` — cadastro/edição de insumo (SKU, nome comercial, marca, cor, lote, unidade, peso do novelo/cone, rendimento em metros, preço de aquisição).
- ⬜ `InsumoCostBadge` — exibe o custo unitário calculado (preço/grama ou preço/metro) com as 5 casas decimais.
- ⬜ `StockThresholdAlert` — reaproveita a semântica de `StatusBadge` (`ok`/`baixo`/`critico`) já existente para alertar ponto de pedido atingido.
- ⬜ `RetroactiveImpactDialog` — modal que lista as fichas técnicas afetadas quando o custo de um insumo é reajustado, disparado a partir do fluxo de edição de insumo.

### Funcionalidades

- [ ] CRUD de insumo: SKU/código interno, nome comercial, marca, cor e **lote** (obrigatório para variação de tonalidade em fios).
- [ ] Metrificação: unidade (gramas, metros ou unidade), peso do novelo/cone, rendimento total em metros.
- [ ] Financeiro: preço de aquisição da embalagem + cálculo automático do custo unitário (preço/grama ou preço/metro), com **até 5 casas decimais**.
- [ ] Controle de estoque: quantidade atual, ponto de pedido (estoque mínimo), alertas visuais de criticidade — estender `InventoryTable`/`StockStatus` para refletir o ponto de pedido configurável por insumo, não um enum fixo.
- [ ] Regra de impacto retroativo: ao reajustar preço de um insumo, listar automaticamente todas as fichas técnicas que o usam (via `RetroactiveImpactDialog`) e notificar a artesã sobre necessidade de reajuste do preço de venda.

---

## Trilha 3 — Ficha Técnica e Motor de Precificação (`ficha-tecnica`)

**Depende de:** Trilha 2 (insumo e custo unitário precisam existir).

### Estado atual (branch `feature/frontend`)

| Item | Caminho | Status |
| --- | --- | --- |
| Página de ficha técnica admin | `src/app/admin/ficha-tecnica/page.tsx` | ✅ layout |
| `RecipeMaterialsTable` | `src/features/ficha-tecnica/components/RecipeMaterialsTable.tsx` | ✅ visual |
| `PricingBreakdown` | `src/features/ficha-tecnica/components/PricingBreakdown.tsx` | ✅ visual — checar se já expõe VHT/taxa de perdas/margem ou só exibe total |
| `ficha-tecnica-service.ts` | `src/features/ficha-tecnica/services/ficha-tecnica-service.ts` | 🔧 um único `TechnicalSheet` mockado, `RecipeMaterial.insumo` é string livre (não referencia insumo real) |

### Componentes a criar/ajustar

- 🔧 `RecipeMaterialsTable` — ligar `insumo` a um `insumoId` real (via Trilha 2) em vez de string livre, e trazer o `custoUnitario` do insumo em vez de digitado à mão.
- 🔧 `PricingBreakdown` — garantir que renderiza cada termo da fórmula abaixo separadamente (custo insumos, custo mão de obra, embalagens, taxa de perdas, margem, preço sugerido) e não só o resultado final.
- ⬜ `LaborTimeInput` — captura de tempo total de confecção em horas e minutos (o BRD exige os dois, `TechnicalSheet.horasConfeccao` hoje só guarda horas).
- ⬜ `PricingSettingsForm` — configuração global de VHT e Taxa de Perdas pelo administrador (ainda não existe tela para isso).
- ⬜ `ManualPriceOverrideField` — campo de preço manual dentro de `PricingBreakdown`, com exibição da margem real calculada (cálculo reverso).

### Funcionalidades

- [ ] Estrutura de BOM por produto: insumos com quantidade exata, custos indiretos (embalagem, tags, cartões, mimos) e mão de obra (tempo estimado em horas **e** minutos).
- [ ] Configuração global do Valor da Hora Trabalhada (VHT) pelo administrador via `PricingSettingsForm`.
- [ ] Configuração global da Taxa de Perdas (%) via `PricingSettingsForm`.
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

### Estado atual (branch `feature/frontend`)

O front hoje só **lê** produtos prontos (`PRODUCTS` em `product-service.ts`, dentro da feature `loja`); não existe tela de cadastro/edição de produto no admin.

| Item | Caminho | Status |
| --- | --- | --- |
| `Product` (tipo) | `src/features/loja/types.ts` | 🔧 sem descrição rica, galeria (é só id/name/price/category/material/colorTones/productionMode/badge), sem prazo de produção, sem status de publicação |
| `ProductCard` | `src/components/ProductCard.tsx` | ✅ visual, estados a confirmar (pronta entrega/sob demanda/indisponível listados em `DESIGN.md`) |

### Componentes a criar

- ⬜ `ProductForm` (admin) — título, descrição rica em Markdown, categorização, modalidade de venda.
- ⬜ `ProductGallery` (edição, admin) / reutilizar em `ProductDetail` (loja) — upload e reordenação de fotos.
- ⬜ `PublicationStatusSelect` — seletor dos 4 estados (`Rascunho`, `Ativo`, `Pausado`, `Fora de Linha`) com aviso de efeito (ex.: "Pausado continua visível, mas não compra").
- ⬜ `StockModeFields` — subformulário condicional: campo de "quantidade física" quando Pronta Entrega, campo de "prazo de produção (dias úteis)" obrigatório quando Sob Encomenda.

### Funcionalidades

- [ ] Cadastro de produto: título, descrição rica (Markdown), galeria de fotos, categorização.
- [ ] Modalidade de estoque **Pronta Entrega** (quantidade física em prateleira) via `StockModeFields`.
- [ ] Modalidade **Sob Encomenda** (sem estoque físico; exige prazo de produção em dias úteis, campo obrigatório) via `StockModeFields`.
- [ ] Ciclo de vida de publicação: `Rascunho` (invisível) → `Ativo` (visível e vendável) → `Pausado` (visível, indisponível para compra) → `Fora de Linha` (arquivado), via `PublicationStatusSelect`; `LojaCatalog`/`ProductCard` devem respeitar esse status ao listar.

---

## Trilha 5 — Loja Pública / Vitrine e Carrinho (`loja`, `carrinho`)

**Depende de:** Trilha 4.

### Estado atual (branch `feature/frontend`)

Esta é a trilha mais avançada visualmente — favoritos, filtros e carrinho já têm tela e store, mas sem integração com produto/estoque real, sem persistência do carrinho e sem a regra de prazo consolidado.

| Item | Caminho | Status |
| --- | --- | --- |
| Home | `src/app/home/page.tsx` + `src/features/home/components/{HeroSection,CategoryGrid,ProductHighlights,TraditionSection}.tsx` | ✅ visual |
| Catálogo | `src/app/loja/page.tsx` + `LojaCatalog.tsx`, `FilterSidebar.tsx`, `AppliedFilters.tsx` | ✅ filtros por categoria/material/cor/modo de produção/preço já implementados |
| Produto | `src/app/loja/[productId]/page.tsx` + `ProductDetail.tsx` | ✅ visual |
| Favoritos | `src/app/favoritos/page.tsx` + `FavoritesList.tsx` + `use-favorites-store.ts` | ✅ funcional em memória (sem persistência entre sessões, sem sincronizar com conta) |
| Carrinho | `src/app/carrinho/page.tsx` + `CartList.tsx` + `use-cart-store.ts` | 🔧 funcional em memória, **sem `persist`**, sem preço/estoque validado contra o produto real |
| `QuantityStepper` | `src/components/QuantityStepper.tsx` | ✅ visual |

### Componentes a criar/ajustar

- 🔧 `use-cart-store.ts` — adicionar `persist` (como já existe em `use-session-store.ts`) para carrinho sobreviver a reload.
- ⬜ `DeliveryEstimateBanner` (ou estender `CartList`) — exibe o `Prazo_Total_Entrega` consolidado do carrinho misto (fórmula abaixo), hoje inexistente.
- ⬜ `InsufficientMaterialNotice` — mensagem "Matéria-prima indisponível para encomenda no momento" com botão de compra desabilitado, exibida em `ProductDetail`/`CartList`.
- 🔧 `FilterSidebar`/`AppliedFilters` — confirmar que o filtro de disponibilidade cobre exatamente Pronta Entrega vs. Encomenda (nomeação atual usa `sob-demanda`; alinhar com o termo do BRD "Sob Encomenda" ao ligar no backend).

### Funcionalidades

- [ ] Filtros dinâmicos de vitrine: categoria, preço e disponibilidade (Pronta Entrega vs. Encomenda) — já existe em `FilterSidebar`; validar contra dado real da Trilha 4.
- [ ] Carrinho persistente: aplicar `persist`/`createJSONStorage` em `use-cart-store.ts`.
- [ ] Regra de prazo consolidado em carrinho misto (Pronta Entrega + Sob Encomenda), exibida via `DeliveryEstimateBanner`:
  ```text
  Prazo_Total_Entrega = MAX(Prazos_de_Produção_dos_Itens) + Prazo_do_Frete_Selecionado
  ```
- [ ] Validação prévia de insumos no checkout: para item Sob Encomenda, verificar matéria-prima suficiente; se insuficiente, desabilitar compra com `InsufficientMaterialNotice` (seção 8.3 do BRD — pode ser implementado aqui ou na Trilha 7, decidir conforme dono do checkout).
- [ ] Sincronizar `use-favorites-store.ts` com conta do cliente autenticado (hoje é só local, some ao trocar de navegador).

---

## Trilha 6 — Frete e Envio (`frete`)

**Depende de:** Trilha 0 (pode avançar em paralelo às trilhas 1–5, integra no checkout/carrinho da Trilha 5). Não existe nada desta trilha na branch `feature/frontend` hoje.

### Componentes a criar

- ⬜ `DeliveryCalculator` — já previsto em `DESIGN.md` (contexto produto/checkout), estados: CEP vazio, inválido, calculando, sucesso, indisponível.
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

### Estado atual (branch `feature/frontend`)

| Item | Caminho | Status |
| --- | --- | --- |
| Página de produção admin | `src/app/admin/producao/page.tsx` | ✅ layout |
| `ProductionQueueCard` | `src/features/producao/components/ProductionQueueCard.tsx` | ✅ visual |
| `producao-service.ts` | `src/features/producao/services/producao-service.ts` | 🔧 5 pedidos mockados; `ProductionStatus` não tem `PAGO` nem `ENVIADO`/`ENTREGUE`/`CANCELADO` — só cobre a fatia "em produção" do ciclo |
| `ProductionOrder` (tipo) | `src/features/producao/types.ts` | 🔧 falta itens do pedido, vínculo com ficha técnica/insumos, código de rastreio |

Não existe ainda checkout, criação de pedido nem página de acompanhamento de pedido do cliente (depende também da Trilha 1 para o histórico).

### Componentes a criar/ajustar

- ⬜ `CheckoutSteps` / `CheckoutSummary` — fluxo de finalização de compra (endereço, frete, pagamento, revisão de prazo).
- 🔧 `ProductionStatus`/`StatusBadge` — estender para a máquina de estados completa do BRD (ver abaixo); hoje `StatusBadge` cobre só os status de produção, não os de pedido ponta a ponta.
- ⬜ `OrderTrackingCodeField` — campo de admin para registrar código de rastreio ao mover pedido para `ENVIADO`.
- 🔧 `ProductionQueueCard` — exibir o bloqueio `bloqueado-insumo` com o insumo faltante específico, não só o badge genérico.

### Funcionalidades

- [ ] Máquina de estados do pedido: `CRIADO` → `PAGO` → `EM PRODUÇÃO` → `PRONTO PARA ENVIO` → `ENVIADO` → `ENTREGUE` / `CANCELADO` — estender `ProductionStatus` (hoje `aguardando-pagamento | em-confeccao | bloqueado-insumo | pronto-envio | concluido`) para bater exatamente com os nomes e a extensão do BRD.
- [ ] Gatilho no estado `PAGO`: reserva de estoque e entrada em produção.
- [ ] Baixa automática de estoque ao atingir `PAGO`:
  - Pronta Entrega: subtrai 1 unidade do estoque do produto final.
  - Sob Encomenda: acessa a ficha técnica (BOM) e subtrai as quantidades de fios/insumos do estoque de matéria-prima (não há produto final a debitar).
- [ ] Fila de produção em Kanban: card do pedido move para "Em Produção" quando alocado na agenda da artesã (evento que a Trilha 8 escuta para disparar e-mail).
- [ ] Geração/registro de código de rastreio ao mover pedido para `ENVIADO`, via `OrderTrackingCodeField`.
- [ ] Validação prévia de insumos no checkout (se não implementada na Trilha 5): bloquear compra Sob Encomenda sem matéria-prima suficiente.
- [ ] Implementar `CheckoutSteps`/`CheckoutSummary` ligando carrinho (Trilha 5) + frete (Trilha 6) + criação do pedido em estado `CRIADO`.

---

## Trilha 8 — Notificações Transacionais (`notificacoes`)

**Depende de:** Trilha 7 (eventos de pedido/produção/envio disparam os e-mails). Não existe nada desta trilha na branch `feature/frontend` hoje.

### Componentes/serviços a criar

- ⬜ `notificacoes-service.ts` — camada única de disparo de e-mail transacional (fonte de verdade para todos os templates abaixo).
- ⬜ Templates: `OrderConfirmationEmail`, `ProductionStartedEmail`, `TrackingCodeEmail`.

### Funcionalidades

- [ ] E-mail de confirmação imediatamente após criação do pedido (evento `CRIADO`).
- [ ] E-mail de produção quando o card muda para "Em Produção" no Kanban ("sua peça começou a ser tecida").
- [ ] E-mail de rastreio automático assim que o código de postagem é inserido no sistema (via `OrderTrackingCodeField` da Trilha 7).

---

## Trilha 9 — Sob Medida / Encomenda Personalizada (`sob-medida`) — fora do BRD

Feature já existente na branch `feature/frontend` que **não está descrita no BRD** (o BRD só define "Sob Encomenda" como modalidade de estoque de um produto de catálogo, não um pedido de peça totalmente personalizada). Manter listada porque já tem página e formulário funcionando; validar com a artesã se o fluxo deve virar um tipo de pedido dentro da máquina de estados da Trilha 7 ou permanecer como formulário de contato avulso.

### Estado atual (branch `feature/frontend`)

| Item | Caminho | Status |
| --- | --- | --- |
| Página | `src/app/sob-medida/page.tsx` | ✅ visual |
| `CustomOrderForm` | `src/features/sob-medida/components/CustomOrderForm.tsx` | ✅ visual + validação de campo |
| `CustomOrderIntro` | `src/features/sob-medida/components/CustomOrderIntro.tsx` | ✅ só ilustrativo |
| `custom-order-service.ts` | `src/features/sob-medida/services/custom-order-service.ts` | 🔧 só valida nome/descrição; `mockSubmitCustomOrder` não persiste nem notifica ninguém |

### Funcionalidades

- [ ] Decidir com o negócio: encomenda personalizada gera um `Pedido` (entra na máquina de estados da Trilha 7) ou é só um lead/solicitação de orçamento?
- [ ] Persistir a solicitação (hoje `mockSubmitCustomOrder` descarta o formulário) e notificar a artesã.
- [ ] Se virar pedido: precificação manual pela artesã via `PricingBreakdown` (Trilha 3) antes de confirmar com o cliente.

---

## Fora de escopo deste BRD (não codificar sem decisão do negócio)

Itens que aparecem no sistema mas não têm regra definida no documento fonte — mantidos de `REGRAS_DE_NEGOCIO.md`:

- política de cancelamento, troca e devolução;
- parcelamento, gateway de pagamento e antifraude;
- regiões de frete atendidas e regras de exceção;
- reserva vs. baixa definitiva de insumos em caso de cancelamento pós-pagamento;
- multi-moeda, impostos e emissão fiscal.

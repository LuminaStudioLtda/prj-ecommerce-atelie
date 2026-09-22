# Backlog técnico inicial para o Trello

Copie estes cartões para o quadro junto ao backlog de MVP em [TRELLO_BACKLOG_MVP.md](TRELLO_BACKLOG_MVP.md). Eles não substituem os cartões de negócio; organizam o trabalho compartilhado.

## Lista: Fundação

### [Infra] Consolidar a estrutura do repositório

- Escopo: manter uma única aplicação na raiz, sem repositório Git aninhado ou pacote duplicado.
- Aceite: Git raiz acompanha os arquivos do app; `node_modules` e `.next` não aparecem no status.
- QA: `git status --ignored` confirma os ignores.

### [Infra] Validar CI no primeiro PR

- Escopo: confirmar o workflow `Qualidade` no GitHub Actions.
- Aceite: lint, tipos e build executam em um PR para `hml`.
- Dependência: primeiro push do workflow para o GitHub.

### [Infra] Proteger branches e configurar Vercel

- Escopo: aplicar o ruleset de `main` e `hml`; conectar a Vercel com a raiz do repositório como Root Directory.
- Aceite: push direto é recusado; PR possui check obrigatório; `main` publica produção e PR possui preview.
- Pré-requisito: permissões administrativas necessárias.

## Lista: Design system

### [UI] Extrair tokens do modelo Stitch

- Entrada: link/export do Stitch.
- Saída: paleta, tipografia, espaçamentos, raios, sombras, breakpoints e estados documentados.
- Aceite: tokens entram em `src/app/globals.css`, sem valores visuais repetidos arbitrariamente em páginas.

### [UI] Mapear primitives e componentes de domínio

- Primitives shadcn/ui: Button, Input, Select, Dialog, Sheet, Badge, Card, Skeleton, Alert e Tooltip.
- Domínio a confirmar pelo modelo/regra: `ProductCard`, `ProductGallery`, `Price`, `QuantitySelector`, `CartItem`, `CartSummary`, `AddressForm`, `OrderStatus` e `EmptyState`.
- Aceite: cada componente tem props, estados (loading, vazio, erro, disabled) e comportamento responsivo definidos antes de implementar páginas.

### [UI] Criar layout responsivo

- Escopo: header, navegação móvel, container, footer e feedback de carregamento/erro.
- Aceite: funciona em 360 px, 768 px e desktop; navegação por teclado e foco visível.

## Lista: Produto — preencher após leitura do Trello

Para cada fluxo de negócio, criar cartões neste formato:

```text
[Domínio] Nome da funcionalidade
Como [perfil], quero [objetivo] para [benefício].

Critérios de aceite
- ...

Regras de negócio
- ...

Cenários de QA
- feliz:
- vazio:
- erro:
- borda:

Dependências e dados necessários
- ...
```

Separar os cartões por domínio: catálogo, produto, carrinho, autenticação, checkout, pagamento, entrega, pedido e administração. Somente crie um cartão quando a regra correspondente estiver confirmada no documento de negócio.

## Definition of Done

Um cartão só pode ir para concluído quando:

- critérios de aceite e regras de negócio foram atendidos;
- há PR pequeno, review e CI verde;
- há evidência no preview/hml;
- estados de loading, vazio, erro e responsividade foram considerados quando aplicáveis;
- o cartão e o PR estão vinculados.

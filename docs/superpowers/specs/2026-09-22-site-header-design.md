# Header da loja (design)

## Contexto

O usuário forneceu uma referência visual (screenshot) de um header de e-commerce: uma barra de aviso no topo (frete grátis) e uma barra principal com logo, menu de navegação e ícones (busca, favoritos, carrinho, conta). O projeto hoje só tem as telas de login (`/`), cadastro (`/cadastro`) e uma home mockada (`/home`) — não existem páginas de loja/coleções ainda.

## Escopo

Um componente `SiteHeader` reutilizável, renderizado no topo da `/home` (a tela pós-login/cadastro), reproduzindo o layout da referência:

- Barra de aviso: texto estático "FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 350 • PEÇAS FEITAS À MÃO SOB DEMANDA" — cópia fixa de exibição, sem cálculo real de frete.
- Barra principal:
  - Logo "Ateliê" (mantém a marca já usada no projeto, não "Stitch & Soul" da referência).
  - Menu: "Início" é link real para `/home`; "Loja", "Coleções", "Sob Medida", "Sobre" e "Contato" são texto estático (sem destino ainda, pois essas páginas não existem).
  - Ícones (lucide-react): busca, favoritos (coração), carrinho (sacola, com contador fixo em "0"), conta (avatar circular). Nenhum ícone tem interação funcional agora.

**Fora de escopo:** menu mobile tipo hambúrguer (em telas pequenas, o menu de navegação some, ficando só logo + ícones); qualquer lógica real de carrinho, busca, favoritos ou conta (nenhuma dessas features existe ainda); navegação real para "Loja", "Coleções", "Sob Medida", "Sobre", "Contato".

## Estrutura de arquivos

- **Novo** `src/components/site-header.tsx` — exporta `SiteHeader`, um componente de UI sem lógica de negócio (fica em `src/components/`, não em `src/features/`, pois é composição de layout compartilhada, sem domínio específico, seguindo `ARCHITECTURE.md`).
- **Modificado** `src/app/home/page.tsx` — renderiza `<SiteHeader />` no topo, antes do conteúdo "Bem-vindo(a)!" existente.

## Comportamento

- Sem estado, sem interação — `SiteHeader` é puramente apresentacional (nenhum `useState`, nenhuma chamada a store).
- Responsivo: em telas pequenas, o menu de navegação (`Início`, `Loja`, etc.) fica oculto via classes Tailwind (`hidden md:flex`), mantendo logo e ícones visíveis.

## Testagem

Sem suíte automatizada configurada. Verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e checagem manual/curl: `/home` deve conter o texto da barra de aviso, o menu ("Início", "Loja", "Coleções", "Sob Medida", "Sobre", "Contato") e os rótulos acessíveis dos ícones — mas isso só é visível quando autenticado (a rota já é protegida por sessão), então a checagem via `curl` sem sessão continuará retornando markup vazio, como hoje.

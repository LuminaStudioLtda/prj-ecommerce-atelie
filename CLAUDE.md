# E-commerce Ateliê

Projeto Next.js de loja pública e painel administrativo de ateliê. Use somente pnpm: `pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm typecheck` e `pnpm build`.

Antes de editar, leia [ARCHITECTURE.md](ARCHITECTURE.md) e siga sua estrutura FBS simplificada, convenções de import, regras de Zustand e limites de responsabilidade. Consulte também [AGENTS.md](AGENTS.md). Não use npm/yarn, barrel files, `any` explícito ou lógica de negócio em UI.

## Design system

Before implementing or changing UI, read [docs/DESIGN.md](docs/DESIGN.md).
Use this palette consistently; do not introduce ad-hoc interface colors:

| Token | Hex | Required use |
| --- | --- | --- |
| `canvas` | `#F9F7F2` | Main warm background. |
| `surface` | `#FFFFFF` | Elevated surfaces, forms, and tables. |
| `ink` | `#30312E` | Primary text, navigation, and high-contrast content. |
| `muted` | `#777773` | Secondary text and metadata. |
| `border` | `#E4E2DD` | Subtle dividers and field borders. |
| `terracotta` | `#8C6A5D` | The only primary action, focus, and selection color. |
| `sage` | `#A3B18A` | Sustainability, success, and healthy availability. |
| `ochre` | `#D4A373` | Light warnings and editorial details. |
| `critical` | `#9B3A32` | Errors, destructive actions, and critical inventory. |

Do not use pure black, neon colors, decorative gradients, bright shadows, or
`sage` and `ochre` as competing primary actions. Map colors through semantic
tokens in `src/app/globals.css`; do not scatter arbitrary hex values in UI
components.

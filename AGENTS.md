# E-commerce Ateliê

Plataforma Next.js de loja pública e painel administrativo para gestão de insumos, ficha técnica, precificação, estoque, produção e pedidos. Stack: Next.js, TypeScript, Tailwind, shadcn/ui, Zustand, PostgreSQL, Prisma ORM e Docker.

Para iniciar: `pnpm install` e `pnpm dev`.

Leia [ARCHITECTURE.md](ARCHITECTURE.md) antes de qualquer alteração estrutural, de convenção ou regra de negócio. Use exclusivamente pnpm.

## Design system

Before implementing or changing UI, read [docs/DESIGN.md](docs/DESIGN.md).
Use this palette consistently; do not introduce ad-hoc interface colors:

| Token        | Hex       | Required use                                         |
| ------------ | --------- | ---------------------------------------------------- |
| `canvas`     | `#F9F7F2` | Main warm background.                                |
| `surface`    | `#FFFFFF` | Elevated surfaces, forms, and tables.                |
| `ink`        | `#30312E` | Primary text, navigation, and high-contrast content. |
| `muted`      | `#777773` | Secondary text and metadata.                         |
| `border`     | `#E4E2DD` | Subtle dividers and field borders.                   |
| `terracotta` | `#8C6A5D` | The only primary action, focus, and selection color. |
| `sage`       | `#A3B18A` | Sustainability, success, and healthy availability.   |
| `ochre`      | `#D4A373` | Light warnings and editorial details.                |
| `critical`   | `#9B3A32` | Errors, destructive actions, and critical inventory. |

Do not use pure black, neon colors, decorative gradients, bright shadows, or
`sage` and `ochre` as competing primary actions. Map colors through semantic
tokens in `src/app/globals.css`; do not scatter arbitrary hex values in UI
components.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

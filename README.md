# Ateliê E-commerce

A Next.js platform for a public storefront and an administrative workspace. The public module covers the catalogue, product pages, cart, checkout, and order tracking. The administrative module supports supplies, technical sheets, pricing, inventory, production, and order operations.

## Technology

Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Zustand, MySQL, and Docker. Use **pnpm only**; npm and Yarn are not supported.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

Run these commands before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Husky runs lint-staged before every commit. For staged application source files, it runs lint and type checking. GitHub Actions repeats lint, type checking, and the production build in a clean environment.

## Branching and delivery

```text
feat/* | fix/* | chore/*  →  hml  →  main
```

- `main` is the protected production branch. Changes reach it only through a pull request from `hml`.
- `hml` is the protected staging and QA branch. Create working branches from it and open pull requests back to it.
- Use `feat/`, `fix/`, `chore/`, or `hotfix/` prefixes. Keep branches and pull requests focused on one deliverable.
- Require a green CI run and resolved review comments before merging. Prefer squash merges.
- Use Conventional Commits in English. Examples: `feat: add product card`, `fix: prevent empty cart checkout`, and `chore: update project tooling`.

## Code conventions

- Follow the simplified feature-based structure documented in [ARCHITECTURE.md](ARCHITECTURE.md).
- Keep domain-specific code inside `src/features/<feature-name>/`; promote code only when it is reused by two or more features.
- Put shared UI in `src/components`, shadcn/ui primitives in `src/components/ui`, reusable hooks in `src/hooks`, infrastructure helpers in `src/lib`, and cross-feature Zustand stores in `src/store`.
- Keep types colocated with their usage. Do not create a generic shared types folder.
- Import the concrete file directly. Barrel files (`index.ts` or `index.tsx` used only for re-exports) are not allowed.
- Keep business rules out of pages, layouts, and visual UI components. Database access belongs in the responsible feature service.
- Use strict TypeScript. Explicit `any`, direct edits to `node_modules`, committed secrets, and circular feature dependencies are prohibited.

## Documentation

[ARCHITECTURE.md](ARCHITECTURE.md) is the authoritative technical reference for project structure and conventions. See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow and [docs/OPERACAO_E_GOVERNANCA.md](docs/OPERACAO_E_GOVERNANCA.md) for branch protection and deployment guidance.

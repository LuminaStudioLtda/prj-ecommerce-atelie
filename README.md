# Ateliê E-commerce

A Next.js application for a public storefront and an administrative workspace.
The storefront provides the catalogue, product pages, cart, checkout, and order
tracking. The workspace supports supplies, technical sheets, pricing,
inventory, production, and order operations.

## Technology

- Next.js App Router and React
- TypeScript
- Tailwind CSS and shadcn/ui
- Zustand
- MySQL and Docker

Use pnpm exclusively. npm and Yarn are not supported.

## Prerequisites

- Node.js 22 or later
- pnpm 11.15.1

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

Run all checks before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Husky runs lint-staged before every commit. GitHub Actions runs lint, type
checking, and the production build in a clean environment.

## Git workflow

```text
feat/* | fix/* | chore/* | hotfix/* -> hml -> main
```

- `main` is the protected production branch.
- `hml` is the protected staging and QA branch.
- Create working branches from `hml` and open pull requests back to `hml`.
- Promote validated changes from `hml` to `main` through a pull request.
- Keep each branch and pull request limited to one deliverable.
- Merge only after CI passes and review feedback is resolved. Prefer squash
  merges.

Create a branch from the latest staging state:

```bash
git switch hml
git pull --ff-only origin hml
git switch -c feat/catalog-filters
git push -u origin feat/catalog-filters
```

Use one of these branch prefixes:

- `feat/` for a new user-facing capability.
- `fix/` for a bug fix.
- `chore/` for maintenance or tooling work.
- `hotfix/` for an urgent production fix.

## Commit conventions

Use Conventional Commits in English:

```text
<type>(<scope>): <imperative summary>
```

The scope is optional. Use a concise, lowercase imperative summary without a
trailing period.

```text
feat(catalog): add product filters
fix(cart): prevent checkout with an empty cart
docs: clarify the release workflow
ci: run quality checks for hml
chore: update development dependencies
```

## Code conventions

- Follow the feature-based structure in [ARCHITECTURE.md](ARCHITECTURE.md).
- Keep domain code in `src/features/<feature-name>/`. Promote code only when
  two or more features reuse it.
- Put shared UI in `src/components`, shadcn/ui primitives in
  `src/components/ui`, reusable hooks in `src/hooks`, infrastructure helpers in
  `src/lib`, and cross-feature Zustand stores in `src/store`.
- Keep types close to their usage. Do not create a generic shared types folder.
- Import concrete files directly. Re-export-only `index.ts` and `index.tsx`
  barrel files are not allowed.
- Keep business rules out of pages, layouts, and visual UI components. Database
  access belongs in the responsible feature service.
- Use strict TypeScript. Explicit `any`, direct edits to `node_modules`,
  committed secrets, and circular feature dependencies are prohibited.

## Documentation

[ARCHITECTURE.md](ARCHITECTURE.md) is the source of truth for structure and
technical conventions. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution
guidelines and [docs/OPERACAO_E_GOVERNANCA.md](docs/OPERACAO_E_GOVERNANCA.md)
for branch protection and deployment guidance.

# Como contribuir

## Fluxo obrigatório

1. Atualize a sua `homolog`: `git switch homolog` e `git pull origin homolog`.
2. Crie uma branch curta a partir dela: `git switch -c feat/nome-da-entrega`.
3. Faça commits pequenos no padrão Conventional Commits, por exemplo `feat: adiciona card de produto`.
4. Abra um PR para `homolog`, vinculando a issue/cartão do Trello e preenchendo o template do PR.
5. Após revisão, CI verde e validação de QA em homolog, Pedro promove `homolog` para `main` por PR.

Não faça push direto em `main` ou `homolog`, não force-push em branches compartilhadas e não inclua `.env` ou chaves no Git.

## Antes de abrir o PR

```bash
pnpm lint
pnpm typecheck
pnpm build
```

O hook de pré-commit executa lint e checagem de tipos para arquivos de aplicação. O CI ainda executa lint, tipos e build limpo em todos os PRs.

## Padrões

- TypeScript estrito; `any` explícito é erro.
- Componentes reutilizáveis entre domínios ficam em `src/components`; componentes gerados pelo shadcn/ui em `src/components/ui`.
- Use o alias `@/` para imports internos.
- Não altere componentes `ui` sem necessidade: prefira compor ou criar um componente de domínio dentro da feature correspondente em `src/features`.
- O PR deve ter uma única intenção. Mudanças de escopo exigem nova issue/cartão.

# Tela de login (design)

## Contexto

O projeto está no estágio inicial: apenas o scaffold padrão do `create-next-app` em `src/app/` e um único componente shadcn (`button.tsx`) em `src/components/ui/`. Não existe backend/autenticação real ainda — o MySQL está pendente de introdução conforme `ARCHITECTURE.md`. Este spec cobre a primeira tela da aplicação: uma tela de login.

## Escopo

Uma tela de login única, compartilhada entre loja pública e painel administrativo, servindo como rota raiz (`/`) — a primeira tela vista ao entrar na aplicação.

**Fora de escopo:** integração real com backend/autenticação, "esqueci minha senha", "lembrar-me", link de criar conta, redirecionamento pós-login (não há outras telas ainda).

## Estrutura de arquivos

Seguindo a estrutura FBS de `ARCHITECTURE.md`:

- `src/features/auth/components/LoginForm.tsx` — client component com o formulário de login (email, senha, botão "Entrar").
- `src/app/page.tsx` — substitui o boilerplate atual do Next.js por um layout centralizado que renderiza `<LoginForm />`.
- Componentes shadcn `input`, `label` e `card`, adicionados em `src/components/ui/` via `pnpm dlx shadcn add` (hoje só existe `button.tsx`).

## Comportamento

- Estado local (`useState`) dentro do próprio `LoginForm` — sem store Zustand, pois é estado de uma única feature (`ARCHITECTURE.md`: "Estado local de uma única feature deve permanecer nela").
- Validação client-side: email obrigatório e com formato válido; senha obrigatória (mínimo de caracteres). Erros exibidos abaixo de cada campo ao tentar enviar.
- Submit mockado: ao validar com sucesso, o botão entra em estado de loading, simula um delay (~800ms) e então exibe uma mensagem de sucesso inline. Sem chamada de API real e sem navegação, já que não existem outras rotas ainda.

## Testagem

O projeto não tem suíte automatizada configurada (sem script de teste em `package.json`). Validação será manual: rodar `pnpm dev` e conferir a tela no navegador (estado inicial, erros de validação, estado de loading, estado de sucesso).

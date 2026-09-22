# Fluxo de login, cadastro e home (design)

## Contexto

A tela de login (spec anterior: `2026-09-22-tela-login-design.md`) já existe na rota raiz (`/`), com submit mockado que só exibia uma mensagem de sucesso inline. Este spec estende o fluxo: login e cadastro passam a navegar para uma home, e a home fica protegida por um estado de sessão simples. Continua sem backend/autenticação real — tudo mockado.

## Escopo

- Uma tela de cadastro (`/cadastro`) com campos nome, email e senha, submit mockado.
- Login (`/`) e cadastro (`/cadastro`), ao concluir com sucesso, autenticam (mock) e navegam para `/home`.
- Uma home (`/home`) placeholder única (sem distinção cliente/admin), protegida: acesso direto sem sessão ativa redireciona para `/`.
- Um botão "Sair" na home que encerra a sessão (mock) e volta para `/`.
- Links cruzados entre login e cadastro ("Não tem conta? Cadastre-se" / "Já tem conta? Entrar").

**Fora de escopo:** distinção cliente/admin na home, recuperação de senha, integração real com backend, persistência além da sessão do navegador (sessionStorage).

## Estrutura de arquivos

- **Novo** `src/store/use-session-store.ts` — store Zustand compartilhada: `isAuthenticated: boolean`, `login(): void`, `logout(): void`. Persistida em `sessionStorage` via `zustand/middleware` (`persist`), dura enquanto a aba estiver aberta. Justificado por `ARCHITECTURE.md`, que cita sessão como exemplo de estado compartilhado entre features.
- **Modificado** `src/features/auth/components/LoginForm.tsx` — ao validar e "logar" com sucesso, chama `login()` do store e usa `useRouter().push("/home")` em vez de mostrar mensagem inline. Adiciona link para `/cadastro`.
- **Novo** `src/features/auth/components/RegisterForm.tsx` — campos nome, email, senha; mesma abordagem de validação client-side e submit mockado (delay simulado) de `LoginForm`; ao concluir, chama `login()` e navega para `/home`. Adiciona link para `/`.
- **Novo** `src/app/cadastro/page.tsx` — renderiza `<RegisterForm />` no mesmo layout centralizado usado em `/`.
- **Novo** `src/app/home/page.tsx` — client component: lê `isAuthenticated` do store; se `false`, redireciona para `/` (via `useRouter().replace("/")` em um `useEffect`); se `true`, mostra uma home placeholder ("Bem-vindo(a)!") com botão "Sair" que chama `logout()` e navega para `/`.

## Comportamento

- Validação de cadastro: nome obrigatório (não vazio após trim), email obrigatório e válido (mesma regex do login), senha obrigatória com o mesmo mínimo de caracteres do login.
- Submit mockado do cadastro: mesmo padrão do login — delay simulado (~800ms), sem chamada de API real.
- Sessão: `login()` seta `isAuthenticated = true`; `logout()` seta `isAuthenticated = false`. Sem dados de usuário além do flag booleano (não há backend para validar credenciais).
- Proteção da home: verificação client-side simples via `useEffect` — não é proteção real de servidor, é suficiente para o estágio mockado do projeto.

## Testagem

Sem suíte automatizada configurada. Verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e checagem manual no navegador: fluxo completo login → home, cadastro → home, acesso direto a `/home` sem sessão (deve redirecionar), botão "Sair" (deve voltar para `/` e re-proteger `/home`).

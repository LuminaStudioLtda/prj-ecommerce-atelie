# Tela de Login Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma tela de login (UI-only, sem backend real) como primeira tela da aplicação, compartilhada entre loja pública e painel administrativo.

**Architecture:** Um novo componente de feature `LoginForm` em `src/features/auth/components/`, com estado e validação locais (sem Zustand), renderizado a partir da rota raiz (`src/app/page.tsx`), que substitui o boilerplate atual do Next.js. Usa três primitivas shadcn/ui novas (`input`, `label`, `card`) além do `button` já existente.

**Tech Stack:** Next.js App Router, React 19, TypeScript estrito, Tailwind CSS, shadcn/ui (`style: radix-nova`, `baseColor: neutral`).

## Global Constraints

- Use exclusivamente pnpm (nunca npm/yarn).
- TypeScript estrito; `any` explícito é proibido.
- Sem barrel files (`index.ts`/`index.tsx` que só reexportam).
- Componentes shadcn/ui ficam obrigatoriamente em `src/components/ui/`.
- Estado local de uma única feature permanece na feature (sem store Zustand para isso).
- Sem lógica de negócio em componentes de UI/páginas.
- Sem integração real com backend — submit é mockado (delay + sucesso simulado), sem chamada de API.
- Sem projeto de teste automatizado configurado (`package.json` não tem script `test`) — verificação é via `pnpm lint`, `pnpm typecheck`, `pnpm build` e checagem manual no navegador.

---

### Task 1: Adicionar primitivas shadcn/ui (input, label, card)

**Files:**
- Create: `src/components/ui/input.tsx` (gerado pelo CLI shadcn)
- Create: `src/components/ui/label.tsx` (gerado pelo CLI shadcn)
- Create: `src/components/ui/card.tsx` (gerado pelo CLI shadcn)

**Interfaces:**
- Produces: componentes `Input`, `Label`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` exportados de `@/components/ui/input`, `@/components/ui/label`, `@/components/ui/card` respectivamente — usados pela Task 2.

- [ ] **Step 1: Rodar o CLI do shadcn para adicionar os componentes**

Run: `pnpm dlx shadcn@latest add input label card --yes`

Expected: cria `src/components/ui/input.tsx`, `src/components/ui/label.tsx` e `src/components/ui/card.tsx`, sem alterar `button.tsx` existente.

- [ ] **Step 2: Conferir que os arquivos foram criados**

Run: `git status --short`

Expected: lista mostra os três novos arquivos em `src/components/ui/` como untracked (`??`).

- [ ] **Step 3: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/input.tsx src/components/ui/label.tsx src/components/ui/card.tsx
git commit -m "feat: adiciona primitivas shadcn input, label e card"
```

---

### Task 2: Criar o componente LoginForm

**Files:**
- Create: `src/features/auth/components/LoginForm.tsx`

**Interfaces:**
- Consumes: `Button` de `@/components/ui/button` (já existe); `Input` de `@/components/ui/input`, `Label` de `@/components/ui/label`, `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent` de `@/components/ui/card` (produzidos pela Task 1).
- Produces: `export function LoginForm(): JSX.Element` — sem props — usado pela Task 3 em `src/app/page.tsx`.

- [ ] **Step 1: Criar o componente com validação e submit mockado**

Criar `src/features/auth/components/LoginForm.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type FormErrors = Partial<Record<"email" | "password", string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOCK_SUBMIT_DELAY_MS = 800;

function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {};

  if (!email.trim()) {
    errors.email = "Informe seu email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Informe um email válido.";
  }

  if (!password) {
    errors.password = "Informe sua senha.";
  } else if (password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }

  return errors;
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Acesse sua conta do Ateliê.</CardDescription>
      </CardHeader>
      <CardContent>
        {submitSuccess ? (
          <p className="text-sm text-foreground">
            Login realizado com sucesso.
          </p>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="text-sm text-destructive">{errors.email}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password ? (
                <p className="text-sm text-destructive">{errors.password}</p>
              ) : null}
            </div>
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros. (O componente ainda não é renderizado em nenhuma rota — a verificação visual acontece na Task 3.)

- [ ] **Step 3: Commit**

```bash
git add src/features/auth/components/LoginForm.tsx
git commit -m "feat: cria componente LoginForm com validacao e submit mockado"
```

---

### Task 3: Renderizar o login como primeira tela (rota raiz)

**Files:**
- Modify: `src/app/page.tsx` (substitui todo o conteúdo pelo boilerplate atual)

**Interfaces:**
- Consumes: `LoginForm` de `@/features/auth/components/LoginForm` (produzido pela Task 2).

- [ ] **Step 1: Substituir o conteúdo de `src/app/page.tsx`**

Substituir todo o arquivo `src/app/page.tsx` por:

```tsx
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/40 p-6">
      <LoginForm />
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Verificar manualmente no navegador**

Run: `pnpm dev`

Abrir `http://localhost:3000` e conferir:
- A tela de login aparece centralizada como conteúdo da rota raiz, sem sobras do boilerplate do Next.js (sem logo do Next.js/Vercel, sem links de template).
- Submeter o formulário vazio mostra os dois erros de validação ("Informe seu email." e "Informe sua senha.").
- Preencher um email inválido (ex. `teste`) e senha curta (ex. `123`) mostra as mensagens específicas de cada campo.
- Preencher um email válido (ex. `teste@teste.com`) e senha com 6+ caracteres, e submeter: o botão mostra "Entrando..." por ~800ms e depois exibe "Login realizado com sucesso.".

Parar o servidor (`Ctrl+C`) depois de validar.

- [ ] **Step 4: Rodar o build de produção**

Run: `pnpm build`

Expected: build termina sem erros.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: exibe tela de login como rota raiz da aplicacao"
```

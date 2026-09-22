# Fluxo de Login, Cadastro e Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Estender o fluxo de autenticação mockado: login e um novo cadastro navegam para uma home protegida, com uma sessão compartilhada (Zustand) controlando o acesso.

**Architecture:** Uma store Zustand (`src/store/use-session-store.ts`) com um flag `isAuthenticated`, persistida em `sessionStorage`. `LoginForm` (existente) e um novo `RegisterForm` chamam `login()` ao concluir o submit mockado e navegam para `/home` via `next/navigation`. A rota `/home` lê a store; se não autenticado, redireciona para `/`.

**Tech Stack:** Next.js App Router, React 19, TypeScript estrito, Tailwind CSS, shadcn/ui, Zustand 5 (`zustand/middleware`: `persist` + `createJSONStorage`).

## Global Constraints

- Use exclusivamente pnpm (nunca npm/yarn).
- TypeScript estrito; `any` explícito é proibido.
- Sem barrel files (`index.ts`/`index.tsx` que só reexportam).
- Store Zustand fica em `src/store/`, nomeada `use-<dominio>-store.ts` — aqui `use-session-store.ts`.
- Código usado só por uma feature fica na feature (`src/features/auth/`); a store de sessão é compartilhada entre features (login, cadastro e home), por isso vai em `src/store/`.
- Sem lógica de negócio em componentes de UI/páginas — validação de formulário é aceitável (já decidido no spec anterior).
- Sem integração real com backend — login e cadastro continuam mockados (delay simulado, sem chamada de API). A store de sessão só guarda um flag booleano, sem dados reais de usuário.
- Proteção de `/home` é client-side (checagem no `useEffect`), suficiente para o estágio mockado do projeto — não é proteção real de servidor.
- Sem projeto de teste automatizado configurado — verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e checagem manual/curl no navegador.

---

### Task 1: Criar a store de sessão

**Files:**
- Create: `src/store/use-session-store.ts`

**Interfaces:**
- Produces: `useSessionStore` (hook Zustand) exportado de `@/store/use-session-store`, com shape `{ isAuthenticated: boolean; login: () => void; logout: () => void }` — usado pelas Tasks 2, 3 e 5.

- [ ] **Step 1: Criar a store**

Criar `src/store/use-session-store.ts`:

```ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SessionState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "session-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/store/use-session-store.ts
git commit -m "feat: cria store de sessao para o fluxo mockado de auth"
```

---

### Task 2: Atualizar o LoginForm para navegar para /home

**Files:**
- Modify: `src/features/auth/components/LoginForm.tsx` (substitui todo o arquivo)

**Interfaces:**
- Consumes: `useSessionStore` de `@/store/use-session-store` (Task 1) — usa `login()`.
- Produces: `LoginForm` continua exportado sem props, mesma assinatura de antes — usado pela Task 4 (página raiz, já existente, não muda).

- [ ] **Step 1: Substituir o conteúdo de `src/features/auth/components/LoginForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useSessionStore } from "@/store/use-session-store";

type FormErrors = Partial<Record<"email" | "password", string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MOCK_SUBMIT_DELAY_MS = 800;

function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = "Informe seu email.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Informe um email válido.";
  }

  if (!password) {
    errors.password = "Informe sua senha.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return errors;
}

export function LoginForm() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
    login();
    router.push("/home");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Acesse sua conta do Ateliê.</CardDescription>
      </CardHeader>
      <CardContent>
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
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <p className="text-sm text-destructive" id="email-error">
                {errors.email}
              </p>
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
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password ? (
              <p className="text-sm text-destructive" id="password-error">
                {errors.password}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link
            href="/cadastro"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/features/auth/components/LoginForm.tsx
git commit -m "feat: login navega para /home apos autenticar (mock) e linka para /cadastro"
```

---

### Task 3: Criar o RegisterForm

**Files:**
- Create: `src/features/auth/components/RegisterForm.tsx`

**Interfaces:**
- Consumes: `useSessionStore` de `@/store/use-session-store` (Task 1); `Button`/`Input`/`Label`/`Card`* de `@/components/ui/*` (já existentes).
- Produces: `export function RegisterForm(): JSX.Element` — sem props — usado pela Task 4.

- [ ] **Step 1: Criar `src/features/auth/components/RegisterForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useSessionStore } from "@/store/use-session-store";

type FormErrors = Partial<Record<"name" | "email" | "password", string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MOCK_SUBMIT_DELAY_MS = 800;

function validate(name: string, email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    errors.name = "Informe seu nome.";
  }

  if (!trimmedEmail) {
    errors.email = "Informe seu email.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Informe um email válido.";
  }

  if (!password) {
    errors.password = "Informe uma senha.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return errors;
}

export function RegisterForm() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(name, email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
    login();
    router.push("/home");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>Cadastre-se para acessar o Ateliê.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? (
              <p className="text-sm text-destructive" id="name-error">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <p className="text-sm text-destructive" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password ? (
              <p className="text-sm text-destructive" id="password-error">
                {errors.password}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link
            href="/"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros. (O componente ainda não é renderizado em nenhuma rota — a verificação visual acontece na Task 4.)

- [ ] **Step 3: Commit**

```bash
git add src/features/auth/components/RegisterForm.tsx
git commit -m "feat: cria componente RegisterForm com validacao e submit mockado"
```

---

### Task 4: Criar a rota /cadastro

**Files:**
- Create: `src/app/cadastro/page.tsx`

**Interfaces:**
- Consumes: `RegisterForm` de `@/features/auth/components/RegisterForm` (Task 3).

- [ ] **Step 1: Criar `src/app/cadastro/page.tsx`**

```tsx
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function CadastroPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/40 p-6">
      <RegisterForm />
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Verificar via curl**

Run: `pnpm dev` (background), aguardar o servidor responder em `http://localhost:3000`, então:

Run: `curl -s http://localhost:3000/cadastro`

Expected: o HTML retornado contém "Criar conta", "Nome", "Email", "Senha" e não contém nenhum resquício do boilerplate padrão do Next.js. Parar o servidor depois.

- [ ] **Step 4: Commit**

```bash
git add src/app/cadastro/page.tsx
git commit -m "feat: adiciona rota /cadastro"
```

---

### Task 5: Criar a rota /home protegida

**Files:**
- Create: `src/app/home/page.tsx`

**Interfaces:**
- Consumes: `useSessionStore` de `@/store/use-session-store` (Task 1) — usa `isAuthenticated` e `logout()`; `Button` de `@/components/ui/button`.

- [ ] **Step 1: Criar `src/app/home/page.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/use-session-store";

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const logout = useSessionStore((state) => state.logout);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-muted/40 p-6 text-center">
      <h1 className="text-2xl font-semibold">Bem-vindo(a)!</h1>
      <p className="text-sm text-muted-foreground">
        Você está autenticado(a) no Ateliê.
      </p>
      <Button variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Verificar manualmente no navegador**

Run: `pnpm dev`

Abrir `http://localhost:3000` e conferir o fluxo completo:
- Acessar `http://localhost:3000/home` diretamente, sem ter logado antes: deve redirecionar para `/`.
- Em `/`, preencher email e senha válidos e submeter: após o loading ("Entrando..."), deve navegar para `/home` mostrando "Bem-vindo(a)!".
- Clicar em "Sair" na home: deve voltar para `/`. Acessar `/home` de novo diretamente deve redirecionar para `/` (sessão encerrada).
- Em `/`, clicar em "Cadastre-se": deve ir para `/cadastro`. Preencher nome, email e senha válidos e submeter: deve navegar para `/home`.
- Em `/cadastro`, clicar em "Entrar": deve voltar para `/`.

Parar o servidor (`Ctrl+C`) depois de validar.

- [ ] **Step 4: Rodar o build de produção**

Run: `pnpm build`

Expected: build termina sem erros.

- [ ] **Step 5: Commit**

```bash
git add src/app/home/page.tsx
git commit -m "feat: adiciona rota /home protegida por sessao, com logout"
```

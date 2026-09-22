# Header da Loja Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um componente `SiteHeader` (barra de aviso + navegação + ícones, baseado em referência visual do usuário) e renderizá-lo no topo da `/home`.

**Architecture:** Um componente de UI puramente apresentacional (`src/components/site-header.tsx`, sem estado, sem lógica de negócio), usando ícones de `lucide-react` (já é dependência do projeto). Renderizado no topo de `src/app/home/page.tsx`, acima do conteúdo de boas-vindas já existente.

**Tech Stack:** Next.js App Router, React 19, TypeScript estrito, Tailwind CSS, lucide-react.

## Global Constraints

- Use exclusivamente pnpm.
- TypeScript estrito; `any` explícito é proibido.
- Sem barrel files.
- `SiteHeader` fica em `src/components/` (não em `src/features/`) — é composição de layout compartilhada, sem domínio de negócio específico.
- Sem lógica de negócio, sem estado, sem chamadas a store no `SiteHeader` — puramente apresentacional.
- Marca no logo é "Ateliê" (não "Stitch & Soul" da referência visual).
- "Início" é link real para `/home`; "Loja", "Coleções", "Sob Medida", "Sobre", "Contato" são texto estático, sem destino (essas páginas não existem).
- Ícones (busca, favoritos, carrinho, conta) são só visuais, sem interação — carrinho mostra contador fixo em "0".
- Em telas pequenas, o menu de navegação fica oculto (`hidden md:flex`), sem menu hambúrguer.
- Sem projeto de teste automatizado configurado — verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build`. Como `/home` é protegida por sessão, `curl` sem sessão ativa continua retornando markup vazio — isso é esperado, não um problema desta task.

---

### Task 1: Criar o componente SiteHeader

**Files:**
- Create: `src/components/site-header.tsx`

**Interfaces:**
- Produces: `export function SiteHeader(): JSX.Element` — sem props — usado pela Task 2.

- [ ] **Step 1: Criar `src/components/site-header.tsx`**

```tsx
import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

const PLACEHOLDER_NAV_LINKS = ["Loja", "Coleções", "Sob Medida", "Sobre", "Contato"];

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="bg-primary/10 px-4 py-2 text-center text-xs font-medium tracking-wide text-primary">
        FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 350 • PEÇAS FEITAS À MÃO SOB DEMANDA
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
        <Link href="/home" className="font-serif text-2xl italic text-foreground">
          Ateliê
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/home" className="text-foreground hover:text-primary">
            Início
          </Link>
          {PLACEHOLDER_NAV_LINKS.map((label) => (
            <span key={label} className="text-muted-foreground">
              {label}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Search className="size-5 text-foreground" aria-label="Buscar" />
          <Heart className="size-5 text-foreground" aria-label="Favoritos" />
          <div className="relative">
            <ShoppingBag className="size-5 text-foreground" aria-label="Carrinho" />
            <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              0
            </span>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="size-4" aria-label="Conta" />
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/site-header.tsx
git commit -m "feat: cria componente SiteHeader com barra de aviso e navegacao"
```

---

### Task 2: Renderizar o SiteHeader na /home

**Files:**
- Modify: `src/app/home/page.tsx` (substitui todo o arquivo)

**Interfaces:**
- Consumes: `SiteHeader` de `@/components/site-header` (Task 1).

- [ ] **Step 1: Substituir o conteúdo de `src/app/home/page.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
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
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-muted/40 p-6 text-center">
        <h1 className="text-2xl font-semibold">Bem-vindo(a)!</h1>
        <p className="text-sm text-muted-foreground">
          Você está autenticado(a) no Ateliê.
        </p>
        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Rodar o build de produção**

Run: `pnpm build`

Expected: build termina sem erros.

- [ ] **Step 4: Verificar via curl (limitado, pois /home é protegida)**

Run: `pnpm dev` (background), aguardar o servidor responder em `http://localhost:3000`, então:

Run: `curl -s http://localhost:3000/home`

Expected: como não há sessão ativa nessa requisição, o corpo continua vazio (mesmo comportamento de antes desta task) — isso é esperado, não indica falha. A confirmação visual real do header fica para checagem manual no navegador (fora do escopo desta task, já que depende de sessão autenticada). Parar o servidor depois.

- [ ] **Step 5: Commit**

```bash
git add src/app/home/page.tsx
git commit -m "feat: renderiza SiteHeader no topo da /home"
```

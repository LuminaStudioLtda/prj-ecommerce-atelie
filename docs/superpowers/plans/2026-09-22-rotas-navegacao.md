# Rotas de Navegação Públicas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar todos os itens do menu e os ícones de favoritos/carrinho/perfil do `SiteHeader` funcionais, navegando para páginas públicas reais (sem exigir login).

**Architecture:** Um componente compartilhado `PlaceholderPage` (título + `SiteHeader`) reaproveitado por 8 novas rotas públicas do App Router. `SiteHeader` é modificado para usar `Link` real em vez de texto/ícones estáticos, apontando para essas rotas.

**Tech Stack:** Next.js App Router, React 19, TypeScript estrito, Tailwind CSS, lucide-react.

## Global Constraints

- Use exclusivamente pnpm.
- TypeScript estrito; `any` explícito é proibido.
- Sem barrel files.
- `PlaceholderPage` fica em `src/components/` — sem lógica de negócio, sem estado.
- As 8 páginas novas (`/inicio`, `/loja`, `/colecoes`, `/sob-medida`, `/sobre`, `/contato`, `/favoritos`, `/carrinho`, `/perfil`) são públicas — nenhuma tem checagem de sessão/redirect.
- `/home` não muda nesta task — continua protegida, continua sendo o destino do login/cadastro mockado, só sai do menu de navegação.
- Logo "Ateliê" e item "Início" do menu apontam para `/inicio` (não mais `/home`).
- Ícone de busca continua só visual, sem rota.
- Sem projeto de teste automatizado configurado — verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e `curl` por rota (todas públicas, então `curl` deve conseguir ver o conteúdo, ao contrário de `/home`).

---

### Task 1: Criar o componente PlaceholderPage

**Files:**
- Create: `src/components/placeholder-page.tsx`

**Interfaces:**
- Consumes: `SiteHeader` de `@/components/site-header` (já existe).
- Produces: `export function PlaceholderPage({ title }: { title: string }): JSX.Element` — usado pela Task 2.

- [ ] **Step 1: Criar `src/components/placeholder-page.tsx`**

```tsx
import { SiteHeader } from "@/components/site-header";

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-muted/40 p-6 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">Conteúdo em breve.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/placeholder-page.tsx
git commit -m "feat: cria componente PlaceholderPage compartilhado"
```

---

### Task 2: Criar as 8 rotas públicas

**Files:**
- Create: `src/app/inicio/page.tsx`
- Create: `src/app/loja/page.tsx`
- Create: `src/app/colecoes/page.tsx`
- Create: `src/app/sob-medida/page.tsx`
- Create: `src/app/sobre/page.tsx`
- Create: `src/app/contato/page.tsx`
- Create: `src/app/favoritos/page.tsx`
- Create: `src/app/carrinho/page.tsx`
- Create: `src/app/perfil/page.tsx`

**Interfaces:**
- Consumes: `PlaceholderPage` de `@/components/placeholder-page` (Task 1).

- [ ] **Step 1: Criar `src/app/inicio/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function InicioPage() {
  return <PlaceholderPage title="Início" />;
}
```

- [ ] **Step 2: Criar `src/app/loja/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function LojaPage() {
  return <PlaceholderPage title="Loja" />;
}
```

- [ ] **Step 3: Criar `src/app/colecoes/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function ColecoesPage() {
  return <PlaceholderPage title="Coleções" />;
}
```

- [ ] **Step 4: Criar `src/app/sob-medida/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function SobMedidaPage() {
  return <PlaceholderPage title="Sob Medida" />;
}
```

- [ ] **Step 5: Criar `src/app/sobre/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function SobrePage() {
  return <PlaceholderPage title="Sobre" />;
}
```

- [ ] **Step 6: Criar `src/app/contato/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function ContatoPage() {
  return <PlaceholderPage title="Contato" />;
}
```

- [ ] **Step 7: Criar `src/app/favoritos/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function FavoritosPage() {
  return <PlaceholderPage title="Favoritos" />;
}
```

- [ ] **Step 8: Criar `src/app/carrinho/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function CarrinhoPage() {
  return <PlaceholderPage title="Carrinho" />;
}
```

- [ ] **Step 9: Criar `src/app/perfil/page.tsx`**

```tsx
import { PlaceholderPage } from "@/components/placeholder-page";

export default function PerfilPage() {
  return <PlaceholderPage title="Perfil" />;
}
```

- [ ] **Step 10: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 11: Commit**

```bash
git add src/app/inicio/page.tsx src/app/loja/page.tsx src/app/colecoes/page.tsx src/app/sob-medida/page.tsx src/app/sobre/page.tsx src/app/contato/page.tsx src/app/favoritos/page.tsx src/app/carrinho/page.tsx src/app/perfil/page.tsx
git commit -m "feat: cria 8 rotas publicas placeholder (inicio, loja, colecoes, sob-medida, sobre, contato, favoritos, carrinho, perfil)"
```

---

### Task 3: Tornar o SiteHeader funcional (menu e ícones)

**Files:**
- Modify: `src/components/site-header.tsx` (substitui todo o arquivo)

**Interfaces:**
- Nenhuma mudança na assinatura de `SiteHeader` (continua sem props) — quem já usa (`/home`, e as 8 páginas novas da Task 2 via `PlaceholderPage`) não precisa mudar.

- [ ] **Step 1: Substituir o conteúdo de `src/components/site-header.tsx`**

```tsx
import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", href: "/inicio" },
  { label: "Loja", href: "/loja" },
  { label: "Coleções", href: "/colecoes" },
  { label: "Sob Medida", href: "/sob-medida" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="bg-primary/10 px-4 py-2 text-center text-xs font-medium tracking-wide text-primary">
        FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 350 • PEÇAS FEITAS À MÃO SOB DEMANDA
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
        <Link href="/inicio" className="font-serif text-2xl italic text-foreground">
          Ateliê
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className="text-foreground hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Search className="size-5 text-foreground" role="img" aria-label="Buscar" />
          <Link href="/favoritos" aria-label="Favoritos">
            <Heart className="size-5 text-foreground" aria-hidden="true" />
          </Link>
          <Link href="/carrinho" className="relative" aria-label="Carrinho">
            <ShoppingBag className="size-5 text-foreground" aria-hidden="true" />
            <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              0
            </span>
          </Link>
          <Link
            href="/perfil"
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Perfil"
          >
            <User className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Rodar o build de produção**

Run: `pnpm build`

Expected: build termina sem erros, com todas as rotas novas listadas (`/inicio`, `/loja`, `/colecoes`, `/sob-medida`, `/sobre`, `/contato`, `/favoritos`, `/carrinho`, `/perfil`).

- [ ] **Step 4: Verificar cada rota pública via curl**

Run: `pnpm dev` (background), aguardar o servidor responder em `http://localhost:3000`, então checar cada rota (todas são públicas, então o conteúdo deve aparecer sem sessão, ao contrário de `/home`):

```bash
curl -s http://localhost:3000/inicio | grep -o "Início"
curl -s http://localhost:3000/loja | grep -o "Loja"
curl -s http://localhost:3000/colecoes | grep -o "Coleções"
curl -s http://localhost:3000/sob-medida | grep -o "Sob Medida"
curl -s http://localhost:3000/sobre | grep -o "Sobre"
curl -s http://localhost:3000/contato | grep -o "Contato"
curl -s http://localhost:3000/favoritos | grep -o "Favoritos"
curl -s http://localhost:3000/carrinho | grep -o "Carrinho"
curl -s http://localhost:3000/perfil | grep -o "Perfil"
```

Expected: cada comando imprime o texto buscado (confirma que o título da página renderizou no HTML). Também confirmar que `curl -s http://localhost:3000/home` continua retornando corpo vazio (comportamento protegido inalterado). Parar o servidor depois.

- [ ] **Step 5: Commit**

```bash
git add src/components/site-header.tsx
git commit -m "feat: torna menu e icones do SiteHeader funcionais com rotas reais"
```

# Página de Detalhe do Produto Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a página de detalhe do produto (`/loja/[productId]`), acessível clicando num produto na loja, com galeria, seleção de tonalidade/tamanho/quantidade e "Adicionar à Sacola" (incrementando um contador de carrinho compartilhado no header).

**Architecture:** Uma nova store Zustand compartilhada (`src/store/use-cart-store.ts`, em memória, sem persistência) guarda o total de itens do carrinho, lida pelo `SiteHeader`. `ProductCard` passa a linkar para a nova rota dinâmica `src/app/loja/[productId]/page.tsx`, que busca o produto em `PRODUCTS` pelo `id` e renderiza um novo componente `ProductDetail`, com conteúdo genérico reaproveitado entre os 24 produtos mockados (só nome/preço/material/cor vêm dos dados reais).

**Tech Stack:** Next.js App Router (rota dinâmica), React 19, TypeScript estrito, Tailwind CSS, lucide-react, Zustand 5.

## Global Constraints

- Use exclusivamente pnpm.
- TypeScript estrito; `any` explícito é proibido.
- Sem barrel files.
- `useCartStore` fica em `src/store/`, sem persistência (`sessionStorage`) — é um contador simples que reseta ao recarregar a página, conforme decidido com o usuário.
- Conteúdo da página de detalhe é genérico e reaproveitado entre os 24 produtos (descrição, selos "45 Horas"/"Fios Nobres"/"Sob Medida", referência) — só nome, preço, material, `productionMode` e `colorTones` vêm dos dados reais de cada produto.
- Parcelamento ("em até 6x...") é cálculo simples de exibição (`preço / 6`), não uma regra de negócio real de pagamento.
- Tamanhos (P/M/G/GG) são iguais para todo produto, sem dado real de estoque por tamanho.
- Sem fotos reais — miniaturas e imagem principal continuam com placeholder de imagem cinza genérico (`ImageIcon`), como já é o padrão do projeto.
- Coração de favorito no `ProductCard` continua fora do `Link` (não pode ficar `<button>` dentro de `<a>` — HTML inválido).
- Sem projeto de teste automatizado configurado — verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e `curl`. Interatividade real (trocar tamanho/cor, clicar "Adicionar à Sacola" e ver o contador do header mudar) depende de JavaScript no navegador — checagem manual, disclosed limitation como nas tasks anteriores.

---

### Task 1: Criar a store de carrinho

**Files:**
- Create: `src/store/use-cart-store.ts`

**Interfaces:**
- Produces: `useCartStore` (hook Zustand) exportado de `@/store/use-cart-store`, com shape `{ itemCount: number; addItems: (quantity: number) => void }` — usado pelas Tasks 2 e 4.

- [ ] **Step 1: Criar `src/store/use-cart-store.ts`**

```ts
import { create } from "zustand";

type CartState = {
  itemCount: number;
  addItems: (quantity: number) => void;
};

export const useCartStore = create<CartState>()((set) => ({
  itemCount: 0,
  addItems: (quantity) => set((state) => ({ itemCount: state.itemCount + quantity })),
}));
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/store/use-cart-store.ts
git commit -m "feat: cria store de carrinho compartilhada"
```

---

### Task 2: Mostrar a contagem real do carrinho no SiteHeader

**Files:**
- Modify: `src/components/site-header.tsx` (substitui todo o arquivo)

**Interfaces:**
- Consumes: `useCartStore` de `@/store/use-cart-store` (Task 1) — usa `itemCount`.

- [ ] **Step 1: Substituir o conteúdo de `src/components/site-header.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useSessionStore } from "@/store/use-session-store";
import { useCartStore } from "@/store/use-cart-store";

const NAV_LINKS = [
  { label: "Início", href: "/inicio" },
  { label: "Loja", href: "/loja" },
  { label: "Coleções", href: "/colecoes" },
  { label: "Sob Medida", href: "/sob-medida" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const profileHref = isAuthenticated ? "/home" : "/perfil";
  const cartItemCount = useCartStore((state) => state.itemCount);

  return (
    <header className="w-full">
      <div className="bg-secondary px-4 py-2 text-center text-xs font-medium tracking-wide text-secondary-foreground">
        FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 350 • PEÇAS FEITAS À MÃO SOB DEMANDA
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
        <Link href="/inicio" className="font-serif text-2xl italic text-primary">
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
              {cartItemCount}
            </span>
          </Link>
          <Link
            href={profileHref}
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label={isAuthenticated ? "Minha conta" : "Perfil"}
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

- [ ] **Step 3: Commit**

```bash
git add src/components/site-header.tsx
git commit -m "feat: header mostra contagem real do carrinho"
```

---

### Task 3: ProductCard linka para a página de detalhe

**Files:**
- Modify: `src/features/loja/components/ProductCard.tsx` (substitui todo o arquivo)

**Interfaces:**
- `ProductCard` continua com a mesma assinatura (`{ product: Product }`, sem mudança de props) — usado pela Task 4 do plano `2026-09-22-pagina-loja.md` (já implementada), sem necessidade de tocar em `LojaCatalog.tsx`.

- [ ] **Step 1: Substituir o conteúdo de `src/features/loja/components/ProductCard.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ImageIcon } from "lucide-react";
import { BADGE_STYLE_CLASS, COLOR_TONE_SWATCH_CLASS } from "@/features/loja/constants";
import type { Product } from "@/features/loja/types";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="relative flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setIsFavorited((current) => !current)}
        aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={isFavorited}
        className="absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-full bg-background"
      >
        <Heart
          className={isFavorited ? "size-4 text-primary" : "size-4 text-foreground"}
          aria-hidden="true"
          fill={isFavorited ? "currentColor" : "none"}
        />
      </button>
      <Link href={`/loja/${product.id}`} className="flex flex-col gap-2">
        <div className="relative flex aspect-square items-center justify-center rounded-lg bg-gray-100">
          {product.badge ? (
            <span
              className={`absolute top-2 left-2 rounded-full px-2 py-1 text-[10px] font-medium tracking-wide ${BADGE_STYLE_CLASS[product.badge]}`}
            >
              {product.badge.toUpperCase()}
            </span>
          ) : null}
          <ImageIcon className="size-8 text-gray-400" aria-hidden="true" />
        </div>
        <p className="text-xs text-muted-foreground">{product.fiberDescription}</p>
        <p className="text-sm font-medium text-primary">{product.name}</p>
        <p className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
      </Link>
      <div className="flex gap-1">
        {product.colorTones.map((tone) => (
          <span
            key={tone}
            className={`size-3 rounded-full ${COLOR_TONE_SWATCH_CLASS[tone]}`}
            title={tone}
          />
        ))}
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
git add src/features/loja/components/ProductCard.tsx
git commit -m "feat: ProductCard linka para a pagina de detalhe do produto"
```

---

### Task 4: Criar o ProductDetail

**Files:**
- Create: `src/features/loja/components/ProductDetail.tsx`

**Interfaces:**
- Consumes: `BADGE_STYLE_CLASS`, `COLOR_TONE_SWATCH_CLASS` de `@/features/loja/constants`; `PRODUCTS` de `@/features/loja/services/product-service`; tipos `Product`, `ProductColorTone` de `@/features/loja/types`; `useCartStore` de `@/store/use-cart-store` (Task 1).
- Produces: `export function ProductDetail({ product }: { product: Product }): JSX.Element` — usado pela Task 5.

- [ ] **Step 1: Criar `src/features/loja/components/ProductDetail.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Clock, Heart, ImageIcon, Ruler, Sparkles, ZoomIn } from "lucide-react";
import { BADGE_STYLE_CLASS, COLOR_TONE_SWATCH_CLASS } from "@/features/loja/constants";
import { PRODUCTS } from "@/features/loja/services/product-service";
import type { Product, ProductColorTone } from "@/features/loja/types";
import { useCartStore } from "@/store/use-cart-store";

type ProductDetailProps = {
  product: Product;
};

const SIZES = ["P", "M", "G", "GG"] as const;
const INSTALLMENTS = 6;
const GALLERY_THUMBNAIL_COUNT = 4;

const FEATURE_HIGHLIGHTS = [
  { Icon: Clock, label: "45 Horas", description: "Confecção manual" },
  { Icon: Sparkles, label: "Fios Nobres", description: "Algodão & Merino" },
  { Icon: Ruler, label: "Sob Medida", description: "Zero desperdício" },
];

function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ProductDetail({ product }: ProductDetailProps) {
  const addItemsToCart = useCartStore((state) => state.addItems);
  const productIndex = PRODUCTS.findIndex((item) => item.id === product.id);
  const referenceCode = `#AT-${8000 + productIndex}`;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTone, setSelectedTone] = useState<ProductColorTone>(product.colorTones[0]);
  const [selectedSize, setSelectedSize] = useState<(typeof SIZES)[number]>("M");
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [wasAdded, setWasAdded] = useState(false);

  const installmentValue = product.price / INSTALLMENTS;

  function handleAddToBag() {
    addItemsToCart(quantity);
    setWasAdded(true);
    setTimeout(() => setWasAdded(false), 2000);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-6 md:flex-row">
      <div className="flex flex-col gap-3 md:w-1/2 md:flex-row">
        <div className="flex gap-2 md:flex-col">
          {Array.from({ length: GALLERY_THUMBNAIL_COUNT }, (_, index) => index).map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-pressed={selectedImage === index}
              className={`flex size-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 ${
                selectedImage === index ? "ring-2 ring-primary" : ""
              }`}
            >
              <ImageIcon className="size-5 text-gray-400" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="relative flex aspect-square flex-1 items-center justify-center rounded-lg bg-gray-100">
          {product.badge ? (
            <span
              className={`absolute top-3 left-3 rounded-full px-2 py-1 text-[10px] font-medium tracking-wide ${BADGE_STYLE_CLASS[product.badge]}`}
            >
              {product.badge.toUpperCase()}
            </span>
          ) : null}
          <ImageIcon className="size-16 text-gray-400" aria-hidden="true" />
          <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-background">
            <ZoomIn className="size-4 text-foreground" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:w-1/2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Coleção Permanente •{" "}
          {product.productionMode === "pronta-entrega" ? "Pronta Entrega" : "Feito Sob Encomenda"} •
          Ref. {referenceCode}
        </p>
        <h1 className="font-serif text-3xl text-foreground">{product.name}</h1>
        <div>
          <p className="text-2xl font-semibold text-foreground">{formatPrice(product.price)}</p>
          <p className="text-sm text-muted-foreground">
            em até {INSTALLMENTS}x de {formatPrice(installmentValue)} sem juros
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {FEATURE_HIGHLIGHTS.map(({ Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-lg border border-border p-3 text-center"
            >
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <p className="text-xs font-semibold text-foreground">{label}</p>
              <p className="text-[10px] text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Concebida a partir de {product.material.toLowerCase()}, essa peça reúne a técnica artesanal
          do crochê à mão com o cuidado de uma confecção individual, sem produção em série. Cada ponto
          é feito por nossa artesã, garantindo textura, caimento e durabilidade únicos.
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-wide text-foreground uppercase">
            Tonalidade do fio:{" "}
            <span className="font-normal text-muted-foreground normal-case">{selectedTone}</span>
          </p>
          <div className="flex gap-2">
            {product.colorTones.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => setSelectedTone(tone)}
                aria-label={tone}
                aria-pressed={selectedTone === tone}
                className={`size-7 rounded-full ${COLOR_TONE_SWATCH_CLASS[tone]} ${
                  selectedTone === tone ? "ring-primary ring-2 ring-offset-2" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-wide text-foreground uppercase">
            Tamanho da peça
          </p>
          <div className="flex gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                className={`flex size-10 items-center justify-center rounded-md border text-sm font-medium ${
                  selectedSize === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-md border border-input">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              aria-label="Diminuir quantidade"
              className="flex size-9 items-center justify-center text-foreground"
            >
              −
            </button>
            <span className="w-8 text-center text-sm text-foreground">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((current) => current + 1)}
              aria-label="Aumentar quantidade"
              className="flex size-9 items-center justify-center text-foreground"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToBag}
            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {wasAdded ? "Adicionado à Sacola" : "Adicionar à Sacola"}
          </button>
          <button
            type="button"
            onClick={() => setIsFavorited((current) => !current)}
            aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={isFavorited}
            className="flex size-10 items-center justify-center rounded-md border border-input"
          >
            <Heart
              className={isFavorited ? "size-4 text-primary" : "size-4 text-foreground"}
              aria-hidden="true"
              fill={isFavorited ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros. (Componente ainda não é renderizado em nenhuma rota — verificação visual acontece na Task 5.)

- [ ] **Step 3: Commit**

```bash
git add src/features/loja/components/ProductDetail.tsx
git commit -m "feat: cria componente ProductDetail"
```

---

### Task 5: Criar a rota dinâmica /loja/[productId]

**Files:**
- Create: `src/app/loja/[productId]/page.tsx`

**Interfaces:**
- Consumes: `SiteHeader` de `@/components/site-header`; `ProductDetail` de `@/features/loja/components/ProductDetail` (Task 4); `PRODUCTS` de `@/features/loja/services/product-service`.

- [ ] **Step 1: Criar `src/app/loja/[productId]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProductDetail } from "@/features/loja/components/ProductDetail";
import { PRODUCTS } from "@/features/loja/services/product-service";

export default async function ProductPage({
  params,
}: PageProps<"/loja/[productId]">) {
  const { productId } = await params;
  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <ProductDetail product={product} />
    </div>
  );
}
```

Nota: `PageProps<"/loja/[productId]">` é o helper de tipos gerado automaticamente pelo Next.js (`next typegen`, já usado em `src/app/layout.tsx` via `LayoutProps<"/">`) — não precisa importar nada, é um tipo global. `params` é uma `Promise` (convenção do Next.js 16 para App Router) e precisa de `await`.

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Rodar o build de produção**

Run: `pnpm build`

Expected: build termina sem erros; a rota aparece como `/loja/[productId]` (rota dinâmica) na listagem.

- [ ] **Step 4: Verificar via curl**

Run: `pnpm dev` (background), aguardar o servidor responder em `http://localhost:3000`, então:

```bash
curl -s http://localhost:3000/loja/cardigan-aurora | grep -o "Cardigan Aurora"
curl -s http://localhost:3000/loja/cardigan-aurora | grep -o "Adicionar à Sacola"
curl -s http://localhost:3000/loja/cardigan-aurora | grep -o "45 Horas"
curl -s http://localhost:3000/loja/cardigan-aurora | grep -o "Tamanho da peça"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/loja/produto-que-nao-existe
```

Expected: os quatro primeiros comandos imprimem o texto buscado; o último deve retornar `404` (confirma que `notFound()` funciona para um id inválido). Parar o servidor depois.

Interatividade real (clicar numa miniatura, trocar tonalidade/tamanho, ajustar quantidade, clicar "Adicionar à Sacola" e ver o número do carrinho mudar no header) depende de JavaScript no navegador e não pode ser verificada por `curl` — limitação conhecida deste ambiente, não um defeito desta task. Registrar isso claramente no relatório.

- [ ] **Step 5: Commit**

```bash
git add src/app/loja/[productId]/page.tsx
git commit -m "feat: adiciona rota dinamica /loja/[productId]"
```

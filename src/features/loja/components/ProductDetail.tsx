"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Hourglass, Leaf, Ruler, ShoppingBag } from "lucide-react";
import { DeliveryCalculator } from "@/features/loja/components/DeliveryCalculator";
import { ProductGallery } from "@/features/loja/components/ProductGallery";
import { COLOR_TONE_SWATCH_CLASS } from "@/features/loja/constants";
import { PRODUCTS } from "@/features/loja/services/product-service";
import type { Product, ProductColorTone } from "@/features/loja/types";
import { useFavorite } from "@/hooks/use-favorite";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/use-cart-store";

type ProductDetailProps = {
  product: Product;
};

const SIZES = ["P", "M", "G", "GG"] as const;
const INSTALLMENTS = 6;

const FEATURE_HIGHLIGHTS = [
  { Icon: Hourglass, label: "45 Horas", description: "Confecção manual" },
  { Icon: Leaf, label: "Fios Nobres", description: "Algodão & Merino" },
  { Icon: Ruler, label: "Sob Medida", description: "Zero desperdício" },
];

export function ProductDetail({ product }: ProductDetailProps) {
  const addItemToCart = useCartStore((state) => state.addItem);
  const productIndex = PRODUCTS.findIndex((item) => item.id === product.id);
  const referenceCode = `#AT-${8000 + productIndex}`;

  const [selectedTone, setSelectedTone] = useState<ProductColorTone>(product.colorTones[0]);
  const [selectedSize, setSelectedSize] = useState<(typeof SIZES)[number]>("M");
  const [quantity, setQuantity] = useState(1);
  const { isFavorited, toggle: toggleFavorite } = useFavorite(product.id);
  const [wasAdded, setWasAdded] = useState(false);

  const installmentValue = product.price / INSTALLMENTS;

  function handleAddToBag() {
    addItemToCart(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        href: `/loja/${product.id}`,
        image: product.images?.[0],
        tone: selectedTone,
        size: selectedSize,
      },
      quantity,
    );
    setWasAdded(true);
    setTimeout(() => setWasAdded(false), 2000);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-12">
      <nav aria-label="Trilha de navegação" className="py-4 text-[10px] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/inicio" className="hover:text-primary">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/loja" className="hover:text-primary">
              Loja
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>{product.category}</li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
        <ProductGallery productName={product.name} images={product.images} badge={product.badge} />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Coleção Permanente •{" "}
              {product.productionMode === "pronta-entrega" ? "Pronta Entrega" : "Feito Sob Encomenda"}{" "}
              • Ref. {referenceCode}
            </p>
            <h1 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              {product.name}
            </h1>
            <p className="text-foreground">
              <span className="font-serif text-lg">{formatPrice(product.price)}</span>{" "}
              <span className="text-xs text-muted-foreground">
                em até {INSTALLMENTS}x de {formatPrice(installmentValue)} sem juros
              </span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {FEATURE_HIGHLIGHTS.map(({ Icon, label, description }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-0.5 rounded-sm border border-border bg-card px-2 py-3 text-center"
              >
                <Icon className="size-4 text-primary" aria-hidden="true" />
                <p className="mt-1 text-[10px] font-medium text-foreground">{label}</p>
                <p className="text-[9px] text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Concebida a partir de {product.fiberDescription.toLowerCase()}. Cada peça apresenta
            pontos relevados exclusivos inspirados nas dunas e ventos litorâneos, garantindo
            caimento fluido e acabamento esculpido à mão por nossas artesãs.
          </p>

          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-[10px] font-medium tracking-wider text-foreground uppercase">
              Tonalidade do fio
              <span className="font-normal tracking-normal text-muted-foreground normal-case">
                {selectedTone}
              </span>
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
                    selectedTone === tone ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-[10px] font-medium tracking-wider text-foreground uppercase">
              Tamanho da peça
              <span className="flex items-center gap-1 font-normal tracking-normal text-muted-foreground normal-case">
                <Ruler className="size-3" aria-hidden="true" />
                Guia de Medidas &amp; Modelagem
              </span>
            </p>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`h-10 rounded-sm border text-xs font-medium ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-stretch gap-2">
            <div className="flex items-center rounded-sm border border-border bg-card">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label="Diminuir quantidade"
                className="flex size-11 items-center justify-center text-sm text-foreground"
              >
                −
              </button>
              <span className="w-6 text-center text-xs text-foreground">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Aumentar quantidade"
                className="flex size-11 items-center justify-center text-sm text-foreground"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToBag}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-4 text-[10px] font-semibold tracking-wider text-primary-foreground uppercase transition-transform hover:bg-primary/90 active:scale-[0.98]"
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              {wasAdded ? "Adicionado à Sacola" : "Adicionar à Sacola"}
            </button>
            <button
              type="button"
              onClick={toggleFavorite}
              aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              aria-pressed={isFavorited}
              className="flex size-11 items-center justify-center rounded-sm border border-border bg-card"
            >
              <Heart
                className={isFavorited ? "size-4 text-primary" : "size-4 text-foreground"}
                aria-hidden="true"
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          </div>

          <DeliveryCalculator />
        </div>
      </div>
    </section>
  );
}

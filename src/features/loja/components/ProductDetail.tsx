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

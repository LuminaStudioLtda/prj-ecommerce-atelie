"use client";

import { useState } from "react";
import { Heart, ImageIcon } from "lucide-react";
import { COLOR_TONE_SWATCH_CLASS } from "../constants";
import type { Product } from "../types";

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
    <div className="flex flex-col gap-2">
      <div className="relative flex aspect-square items-center justify-center rounded-lg bg-gray-100">
        {product.badge ? (
          <span className="absolute top-2 left-2 rounded-full bg-background px-2 py-1 text-[10px] font-medium tracking-wide text-foreground">
            {product.badge.toUpperCase()}
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => setIsFavorited((current) => !current)}
          aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorited}
          className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-background"
        >
          <Heart
            className={isFavorited ? "size-4 text-primary" : "size-4 text-foreground"}
            aria-hidden="true"
            fill={isFavorited ? "currentColor" : "none"}
          />
        </button>
        <ImageIcon className="size-8 text-gray-400" aria-hidden="true" />
      </div>
      <p className="text-xs text-muted-foreground">{product.fiberDescription}</p>
      <p className="text-sm font-medium text-primary">{product.name}</p>
      <p className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
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

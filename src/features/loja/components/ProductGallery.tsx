"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, Timer, ZoomIn } from "lucide-react";
import type { ProductBadge } from "@/features/loja/types";

type ProductGalleryProps = {
  productName: string;
  images?: string[];
  badge?: ProductBadge;
};

const PLACEHOLDER_TINT_CLASSES = ["bg-primary/25", "bg-accent", "bg-secondary/30", "bg-ochre/25"];

export function ProductGallery({ productName, images, badge }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const slideCount = images?.length ?? PLACEHOLDER_TINT_CLASSES.length;
  const slides = Array.from({ length: slideCount }, (_, index) => ({
    src: images?.[index],
    tintClass: PLACEHOLDER_TINT_CLASSES[index % PLACEHOLDER_TINT_CLASSES.length],
  }));
  const current = slides[selectedImage];

  return (
    <div className="flex gap-3">
      <div className="flex w-12 shrink-0 flex-col gap-2 sm:w-16">
        {slides.map(({ src, tintClass }, index) => (
          <button
            key={src ?? tintClass}
            type="button"
            onClick={() => setSelectedImage(index)}
            aria-label={`Ver imagem ${index + 1} de ${productName}`}
            aria-pressed={selectedImage === index}
            className={`relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm border-2 ${tintClass} ${
              selectedImage === index ? "border-primary" : "border-transparent"
            }`}
          >
            {src ? (
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            ) : (
              <ImageIcon className="size-4 text-muted-foreground" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
      <div
        className={`relative flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-sm ${current.tintClass}`}
      >
        {current.src ? (
          <Image
            src={current.src}
            alt={`${productName} — imagem ${selectedImage + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        ) : (
          <ImageIcon className="size-16 text-muted-foreground" aria-hidden="true" />
        )}
        {badge ? (
          <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-[10px] font-medium text-foreground">
            <Timer className="size-3" aria-hidden="true" />
            {badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label="Ampliar imagem"
          className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-background text-foreground"
        >
          <ZoomIn className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Timer, X, ZoomIn } from "lucide-react";
import type { ProductBadge } from "@/features/loja/types";

type ProductGalleryProps = {
  productName: string;
  images?: string[];
  badge?: ProductBadge;
};

const PLACEHOLDER_TINT_CLASSES = ["bg-primary/25", "bg-accent", "bg-secondary/30", "bg-ochre/25"];

export function ProductGallery({ productName, images, badge }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) {
      return;
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsZoomed(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed]);

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
          onClick={() => setIsZoomed(true)}
          aria-label="Ampliar imagem"
          className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-background text-foreground"
        >
          <ZoomIn className="size-4" aria-hidden="true" />
        </button>
      </div>

      {isZoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} — imagem ampliada`}
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4"
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            aria-label="Fechar imagem ampliada"
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-background text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <div className="relative aspect-square w-full max-w-3xl overflow-hidden rounded-sm bg-accent">
            {current.src ? (
              <Image
                src={current.src}
                alt={`${productName} — imagem ${selectedImage + 1} ampliada`}
                fill
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-contain"
              />
            ) : (
              <ImageIcon className="m-auto size-16 text-muted-foreground" aria-hidden="true" />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

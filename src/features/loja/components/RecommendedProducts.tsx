import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RecommendedProductCard } from "@/features/loja/components/RecommendedProductCard";
import type { Product } from "@/features/loja/types";

type RecommendedProductsProps = {
  products: Product[];
};

export function RecommendedProducts({ products }: RecommendedProductsProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-14 md:px-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Harmonizações Recomendadas
          </p>
          <h2 className="font-serif text-2xl text-foreground">Complete o Visual Autoral</h2>
        </div>
        <Link
          href="/loja"
          className="flex shrink-0 items-center gap-1 text-[11px] text-foreground hover:text-primary"
        >
          Ver Coleção Completa
          <ArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {products.map((product) => (
          <RecommendedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

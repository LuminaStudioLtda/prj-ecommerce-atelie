import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { HomeProductCard } from "@/features/inicio/components/HomeProductCard";
import { FEATURED_PRODUCTS } from "@/features/inicio/constants";

export function BestSellers() {
  return (
    <section id="mais-amados" className="w-full bg-surface py-space-xl">
      <div className="mx-auto max-w-7xl px-margin">
        <div className="mb-space-xl flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div>
            <span className="text-label-sm font-semibold tracking-widest text-primary uppercase">Favoritos dos Clientes</span>
            <h2 className="mt-space-xs font-headline text-headline-lg font-normal text-on-surface">Os Mais Amados do Ateliê</h2>
          </div>
          <Link href="/loja" className="inline-flex items-center gap-space-xs text-label-md font-semibold text-primary hover:underline">
            <span>Ver catálogo completo</span>
            <MaterialIcon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <HomeProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

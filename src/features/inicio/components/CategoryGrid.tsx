import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { CATEGORIES } from "@/features/inicio/constants";

export function CategoryGrid() {
  return (
    <section id="categorias" className="w-full bg-surface py-space-xl">
      <div className="mx-auto max-w-7xl px-margin text-center">
        <div className="mb-space-xl flex flex-col items-center justify-center">
          <span className="mb-space-xs text-label-sm font-semibold tracking-widest text-secondary uppercase">Criações com Alma</span>
          <h2 className="font-headline text-headline-lg font-normal text-on-surface">Navegue por Categoria</h2>
          <div className="mt-space-sm h-0.5 w-12 rounded-[0.75rem] bg-primary" />
        </div>
        <div className="grid grid-cols-2 gap-gutter sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map(({ name, image, imageAlt }) => (
            <Link key={name} href="/loja" className="group flex flex-col items-center">
              <div className="size-28 overflow-hidden rounded-full bg-surface-container p-1 shadow-md transition-all duration-300 group-hover:shadow-lg sm:size-36">
                <div className="relative flex size-full items-center justify-center overflow-hidden rounded-full">
                  {image ? (
                    <Image
                      src={image}
                      alt={imageAlt ?? name}
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <MaterialIcon name="image" className="text-[32px] text-outline" />
                  )}
                </div>
              </div>
              <span className="mt-space-md text-label-md font-semibold text-on-surface transition-colors group-hover:text-primary">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

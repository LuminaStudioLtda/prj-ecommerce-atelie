import Image from "next/image";
import { MaterialIcon } from "@/components/MaterialIcon";
import { TESTIMONIALS } from "@/features/inicio/constants";

export function Testimonials() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="mx-auto max-w-7xl px-margin">
        <div className="mx-auto mb-space-xl max-w-xl text-center">
          <span className="text-label-sm font-semibold tracking-widest text-secondary uppercase">Comunidade Afetiva</span>
          <h2 className="mt-space-xs font-headline text-headline-lg font-normal text-on-surface">Na Casa de Quem Escolheu Afeto</h2>
          <p className="mt-space-xs text-body-sm text-on-surface-variant">
            Histórias reais de quem transformou a rotina através de peças com calor humano.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {TESTIMONIALS.map(({ name, location, quote, purchase, avatar, avatarAlt }) => (
            <div key={name} className="flex flex-col justify-between rounded-[0.5rem] bg-surface-container-lowest p-space-lg shadow-sm">
              <div>
                <div className="mb-space-md flex items-center gap-space-sm">
                  <div className="relative size-12 overflow-hidden rounded-[0.75rem] bg-surface-container">
                    <Image src={avatar} alt={avatarAlt} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-label-md font-bold text-on-surface">{name}</h4>
                    <div className="flex items-center gap-1 text-label-sm text-secondary">
                      <MaterialIcon name="verified" className="text-[14px]" />
                      <span>Compra verificada • {location}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-space-sm flex text-tertiary">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <MaterialIcon key={star} name="star" filled className="text-[18px]" />
                  ))}
                </div>
                <p className="text-body-md text-on-surface-variant italic">&ldquo;{quote}&rdquo;</p>
              </div>
              <div className="mt-space-md flex items-center gap-space-xs border-t border-surface-container pt-space-sm text-label-sm text-outline">
                <MaterialIcon name="local_mall" className="text-[16px]" />
                <span>Comprou: {purchase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

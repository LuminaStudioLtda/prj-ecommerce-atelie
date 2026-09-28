import { cn } from "@/lib/utils";

/**
 * Estados de estoque/pedido do admin. Mantenha este union como a única fonte de
 * verdade dos estados possíveis; novos domínios (pedidos, produção) estendem aqui,
 * nunca com cor solta em outra página (docs/DESIGN.md).
 */
export type Status = "ok" | "baixo" | "critico";

const ROTULO: Record<Status, string> = {
  ok: "Estável",
  baixo: "Alerta Baixo",
  critico: "Crítico",
};

const CLASSE: Record<Status, string> = {
  ok: "bg-sage/15 text-[#5c6b47]",
  baixo: "bg-ochre/20 text-[#8a5a1f]",
  critico: "bg-critical/10 text-critical",
};

type StatusBadgeProps = {
  status: Status;
  /** Sobrepõe o rótulo padrão do estado (ex.: "Seguro" em vez de "Estável"). */
  rotulo?: string;
  className?: string;
};

export function StatusBadge({ status, rotulo, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit shrink-0 items-center rounded-full px-2 text-xs font-semibold whitespace-nowrap",
        CLASSE[status],
        className,
      )}
    >
      {rotulo ?? ROTULO[status]}
    </span>
  );
}

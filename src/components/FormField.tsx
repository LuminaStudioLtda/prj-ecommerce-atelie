import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  obrigatorio?: boolean;
  erro?: string;
  dica?: string;
  className?: string;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  obrigatorio = false,
  erro,
  dica,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="text-xs font-semibold tracking-wider uppercase">
        {label}
        {obrigatorio ? (
          <>
            <span aria-hidden="true" className="text-critical">
              *
            </span>
            <span className="sr-only"> (obrigatório)</span>
          </>
        ) : null}
      </Label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} className="text-xs text-critical">
          {erro}
        </p>
      ) : dica ? (
        <p id={`${id}-dica`} className="text-xs text-muted-foreground">
          {dica}
        </p>
      ) : null}
    </div>
  );
}

/** Atributos de acessibilidade do controle, ligando-o ao erro ou à dica exibidos pelo campo. */
export function ariaDoCampo(id: string, erro?: string, dica?: string) {
  return {
    "aria-invalid": erro ? true : undefined,
    "aria-describedby": erro ? `${id}-erro` : dica ? `${id}-dica` : undefined,
  } as const;
}

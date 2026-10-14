"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import { formatCep, isValidCep } from "@/features/loja/services/delivery-service";

type DeliveryStatus = "idle" | "invalid" | "unavailable";

const STATUS_MESSAGE: Record<Exclude<DeliveryStatus, "idle">, string> = {
  invalid: "Informe um CEP válido com 8 dígitos.",
  unavailable: "O cálculo de frete para este CEP ainda não está disponível.",
};

export function DeliveryCalculator() {
  const [cep, setCep] = useState("");
  const [status, setStatus] = useState<DeliveryStatus>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(isValidCep(cep) ? "unavailable" : "invalid");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-sm border border-border bg-card p-4"
    >
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-2 font-medium text-foreground">
          <Truck className="size-4 text-muted-foreground" aria-hidden="true" />
          Cálculo de Entrega &amp; Produção
        </span>
        <span className="text-[10px] text-muted-foreground">Envio Assegurado</span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          aria-label="CEP de entrega"
          aria-invalid={status === "invalid"}
          value={cep}
          onChange={(event) => {
            setCep(formatCep(event.target.value));
            setStatus("idle");
          }}
          placeholder="Digite seu CEP (00000-000)"
          className="h-10 min-w-0 flex-1 rounded-sm border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none"
        />
        <button
          type="submit"
          className="h-10 rounded-sm bg-foreground px-4 text-[10px] font-semibold tracking-wider text-background uppercase transition-transform active:scale-[0.98]"
        >
          Calcular
        </button>
      </div>
      {status !== "idle" ? (
        <p role="status" className="text-xs text-critical">
          {STATUS_MESSAGE[status]}
        </p>
      ) : null}
    </form>
  );
}

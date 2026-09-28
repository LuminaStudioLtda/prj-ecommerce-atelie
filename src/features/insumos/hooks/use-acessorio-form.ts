import { useState, type FormEvent } from "react";
import {
  VALORES_INICIAIS_ACESSORIO,
  validarAcessorioForm,
} from "@/features/insumos/services/acessorio-form";
import type {
  AcessorioFormErrors,
  AcessorioFormValues,
  AcessorioInput,
} from "@/features/insumos/types";

type UseAcessorioFormOptions = {
  onSubmit: (acessorio: AcessorioInput) => void;
};

export function useAcessorioForm({ onSubmit }: UseAcessorioFormOptions) {
  const [valores, setValores] = useState<AcessorioFormValues>(VALORES_INICIAIS_ACESSORIO);
  const [erros, setErros] = useState<AcessorioFormErrors>({});

  function alterarCampo<Campo extends keyof AcessorioFormValues>(
    campo: Campo,
    valor: AcessorioFormValues[Campo],
  ) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => {
      const proximo = { ...atual };
      delete proximo[campo];
      return proximo;
    });
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const resultado = validarAcessorioForm(valores);

    if (!resultado.valido) {
      setErros(resultado.erros);
      requestAnimationFrame(() => {
        formulario.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setErros({});
    onSubmit(resultado.acessorio);
  }

  return { valores, erros, alterarCampo, enviar };
}

import { useState, type FormEvent } from "react";
import {
  VALORES_INICIAIS,
  calcularCustoDoFormulario,
  insumoParaValoresDoForm,
  validarInsumoForm,
} from "@/features/insumos/services/insumo-form";
import type {
  InsumoFormErrors,
  InsumoFormValues,
  InsumoInput,
} from "@/features/insumos/types";

type UseInsumoFormOptions = {
  insumoInicial?: InsumoInput;
  onSubmit: (insumo: InsumoInput) => void | Promise<void>;
};

const MENSAGEM_ERRO_ENVIO = "Não foi possível salvar o insumo. Tente novamente.";

export function useInsumoForm({ insumoInicial, onSubmit }: UseInsumoFormOptions) {
  const [valores, setValores] = useState<InsumoFormValues>(() =>
    insumoInicial ? insumoParaValoresDoForm(insumoInicial) : VALORES_INICIAIS,
  );
  const [erros, setErros] = useState<InsumoFormErrors>({});
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const custo = calcularCustoDoFormulario(valores);

  function alterarCampo<Campo extends keyof InsumoFormValues>(
    campo: Campo,
    valor: InsumoFormValues[Campo],
  ) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => {
      const proximo = { ...atual };
      delete proximo[campo];
      if (campo === "unidade") {
        delete proximo.pesoGramas;
        delete proximo.rendimentoMetros;
      }
      return proximo;
    });
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando) return;

    const formulario = evento.currentTarget;
    const resultado = validarInsumoForm(valores);

    if (!resultado.valido) {
      setErros(resultado.erros);
      setErroEnvio(null);
      requestAnimationFrame(() => {
        formulario.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setErros({});
    setErroEnvio(null);
    setEnviando(true);

    try {
      await onSubmit(resultado.insumo);
    } catch {
      setErroEnvio(MENSAGEM_ERRO_ENVIO);
    } finally {
      setEnviando(false);
    }
  }

  return { valores, erros, erroEnvio, enviando, custo, alterarCampo, enviar };
}

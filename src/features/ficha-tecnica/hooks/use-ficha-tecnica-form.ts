import { useState } from "react";
import { useFotosDoProduto } from "@/features/ficha-tecnica/hooks/use-fotos-do-produto";
import {
  VALORES_INICIAIS,
  calcularLinhasDaReceita,
  calcularPrecificacaoDoFormulario,
  calcularTempoEmMinutos,
  somarCustoDosInsumos,
  validarFichaTecnica,
} from "@/features/ficha-tecnica/services/ficha-tecnica-form";
import type { ConfiguracaoDePrecificacao } from "@/features/ficha-tecnica/services/precificacao";
import type {
  FichaTecnicaFormErrors,
  FichaTecnicaFormValues,
  ItemDoCatalogo,
} from "@/features/ficha-tecnica/types";

export type UltimaAcao = { tipo: "rascunho" | "publicado"; em: Date };

/**
 * Estado do formulário de ficha técnica. Persistir depende do cliente MySQL (Trilha 0):
 * até lá, "salvar" valida e registra a ação na sessão, sem gravar em lugar nenhum.
 */
export function useFichaTecnicaForm(
  catalogo: ItemDoCatalogo[],
  configuracao: ConfiguracaoDePrecificacao,
) {
  const [valores, setValores] = useState<FichaTecnicaFormValues>(VALORES_INICIAIS);
  const [erros, setErros] = useState<FichaTecnicaFormErrors>({});
  const [ultimaAcao, setUltimaAcao] = useState<UltimaAcao | null>(null);
  const fotos = useFotosDoProduto();

  const linhas = calcularLinhasDaReceita(valores.itens, catalogo);
  const precificacao = calcularPrecificacaoDoFormulario(valores, linhas, configuracao);
  const tempoMinutos = calcularTempoEmMinutos(valores.horas, valores.minutos);
  const custoInsumos = somarCustoDosInsumos(linhas);

  function alterarCampo<K extends keyof FichaTecnicaFormValues>(
    campo: K,
    valor: FichaTecnicaFormValues[K],
  ) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros({});
  }

  function adicionarItem(insumoId: string) {
    setValores((atual) =>
      atual.itens.some((item) => item.insumoId === insumoId)
        ? atual
        : { ...atual, itens: [...atual.itens, { insumoId, quantidade: "" }] },
    );
    setErros((atual) => ({ ...atual, itens: undefined }));
  }

  function alterarQuantidade(insumoId: string, quantidade: string) {
    setValores((atual) => ({
      ...atual,
      itens: atual.itens.map((item) => (item.insumoId === insumoId ? { ...item, quantidade } : item)),
    }));
    setErros((atual) => ({ ...atual, itens: undefined }));
  }

  function removerItem(insumoId: string) {
    setValores((atual) => ({
      ...atual,
      itens: atual.itens.filter((item) => item.insumoId !== insumoId),
    }));
  }

  /** Rascunho só exige o nome; a publicação exige a ficha completa. */
  function salvarRascunho() {
    if (!valores.nome.trim()) {
      setErros({ nome: "Dê um nome à peça para salvar o rascunho." });
      return;
    }
    setErros({});
    setUltimaAcao({ tipo: "rascunho", em: new Date() });
  }

  function publicar() {
    const encontrados = validarFichaTecnica(valores, linhas);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setValores((atual) => ({
      ...atual,
      status: atual.status === "rascunho" ? "ativo" : atual.status,
    }));
    setUltimaAcao({ tipo: "publicado", em: new Date() });
  }

  return {
    valores,
    erros,
    ultimaAcao,
    fotos,
    linhas,
    precificacao,
    tempoMinutos,
    custoInsumos,
    alterarCampo,
    adicionarItem,
    alterarQuantidade,
    removerItem,
    salvarRascunho,
    publicar,
  };
}

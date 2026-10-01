import { useState } from "react";
import type { FotoDoProduto } from "@/features/ficha-tecnica/types";

const TIPOS_ACEITOS = ["image/jpeg", "image/png"];
const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024;

/**
 * Fotos do produto em memória, só com pré-visualização local (URL de objeto do navegador).
 * O envio real depende do storage definido na Trilha 0/4; a primeira foto é sempre a capa.
 */
export function useFotosDoProduto() {
  const [fotos, setFotos] = useState<FotoDoProduto[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  function adicionar(arquivos: FileList | null) {
    if (!arquivos) return;

    const aceitos: FotoDoProduto[] = [];
    let rejeitados = 0;
    for (const arquivo of Array.from(arquivos)) {
      if (!TIPOS_ACEITOS.includes(arquivo.type) || arquivo.size > TAMANHO_MAXIMO_BYTES) {
        rejeitados += 1;
        continue;
      }
      aceitos.push({ id: crypto.randomUUID(), nome: arquivo.name, url: URL.createObjectURL(arquivo) });
    }

    setErro(
      rejeitados > 0
        ? `${rejeitados} arquivo(s) ignorado(s): use JPG ou PNG de até 10 MB.`
        : null,
    );
    if (aceitos.length > 0) setFotos((atual) => [...atual, ...aceitos]);
  }

  function remover(id: string) {
    setFotos((atual) => {
      const removida = atual.find((foto) => foto.id === id);
      if (removida) URL.revokeObjectURL(removida.url);
      return atual.filter((foto) => foto.id !== id);
    });
  }

  function definirCapa(id: string) {
    setFotos((atual) => {
      const escolhida = atual.find((foto) => foto.id === id);
      return escolhida ? [escolhida, ...atual.filter((foto) => foto.id !== id)] : atual;
    });
  }

  return { fotos, erro, adicionar, remover, definirCapa };
}

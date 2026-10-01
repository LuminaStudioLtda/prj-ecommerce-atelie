import type { Metadata } from "next";
import { FichaTecnicaView } from "@/features/ficha-tecnica/components/FichaTecnicaView";
import { listarItensDoCatalogo } from "@/features/ficha-tecnica/services/catalogo-de-insumos";
import { CONFIGURACAO_PADRAO } from "@/features/ficha-tecnica/services/precificacao";

export const metadata: Metadata = {
  title: "Receitas & Produtos | Admin",
};

export default function ReceitasEProdutosPage() {
  return <FichaTecnicaView catalogo={listarItensDoCatalogo()} configuracao={CONFIGURACAO_PADRAO} />;
}

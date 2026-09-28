import type { Metadata } from "next";
import { GestaoDeInsumosView } from "@/features/insumos/components/GestaoDeInsumosView";
import {
  listarAcessoriosDeEstoque,
  listarInsumosDeEstoque,
} from "@/features/insumos/services/insumo-estoque";

export const metadata: Metadata = {
  title: "Gestão de Insumos | Admin",
};

export default function GestaoDeInsumosPage() {
  return (
    <GestaoDeInsumosView
      insumosIniciais={listarInsumosDeEstoque()}
      acessoriosIniciais={listarAcessoriosDeEstoque()}
    />
  );
}

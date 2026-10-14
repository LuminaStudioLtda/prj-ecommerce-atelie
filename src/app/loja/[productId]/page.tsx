import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProductArtisan } from "@/features/loja/components/ProductArtisan";
import { ProductDetail } from "@/features/loja/components/ProductDetail";
import { ProductManifesto } from "@/features/loja/components/ProductManifesto";
import { RecommendedProducts } from "@/features/loja/components/RecommendedProducts";
import { PRODUCTS, getRecommendedProducts } from "@/features/loja/services/product-service";

const RECOMMENDED_COUNT = 4;

export default async function ProductPage({
  params,
}: PageProps<"/loja/[productId]">) {
  const { productId } = await params;
  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <ProductDetail product={product} />
        <ProductManifesto productName={product.name} fiberDescription={product.fiberDescription} />
        <ProductArtisan productName={product.name} />
        <RecommendedProducts products={getRecommendedProducts(product, RECOMMENDED_COUNT)} />
      </main>
      <SiteFooter />
    </div>
  );
}

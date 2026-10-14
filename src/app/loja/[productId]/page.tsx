import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProductDetail } from "@/features/loja/components/ProductDetail";
import { PRODUCTS } from "@/features/loja/services/product-service";

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
      <ProductDetail product={product} />
    </div>
  );
}

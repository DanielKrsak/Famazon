import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/prisma.db";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import AddToCartButton from "./components/AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface ProductDetailPage {
  params: {
    productId: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) notFound();

  return product;
});

export async function generateMetadata({
  params,
}: ProductDetailPage): Promise<Metadata> {
  const product = await getProduct(params.productId);

  return {
    title: product.name + " - Famazon",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

const ProductDetailPage = async ({ params }: ProductDetailPage) => {
  const product = await getProduct(params.productId);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-4">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;

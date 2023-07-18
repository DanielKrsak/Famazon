"use server";

import { createCart, getCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma.db";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.cartItems.find(
    (item) => item.productId === productId
  );

  if (articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        cartItems: {
          update: {
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        cartItems: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  }

  revalidatePath("/products/[productId]");
}

"use server";

import { createCart, getCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma.db";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.cartItems.find(
    (item) => item.productId === productId
  );

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          cartItems: {
            delete: {
              id: articleInCart.id,
            },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          cartItems: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          cartItems: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }

  revalidatePath("/cart");
}

import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/formatPrice";
import { setProductQuantity } from "./actions";
import CartEntry from "./components/CartEntry";

export const metadata = {
  title: "Your Cart - Famazon",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.cartItems.map((item) => (
        <CartEntry
          key={item.id}
          cartItem={item}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.cartItems.length && (
        <p>Your cart is empty. Add products to your cart!</p>
      )}
      <div className="flex flex-col items-end ">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;

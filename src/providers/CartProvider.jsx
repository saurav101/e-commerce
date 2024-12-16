import { createContext, useEffect, useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext(null);

export const useCart = () => {
  return useContext(CartContext);
};

const getValueFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(getValueFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCartIncrement = (index) => {
    cart[index].quantity++;
    setCart([...cart]);
  };
  const handleCartDecrement = (index) => {
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    setCart([...cart]);
  };
  const handleAddToCart = (product) => {
    const productExist = cart.find(({ _id }) => product._id === _id);
    if (productExist) {
      productExist.quantity++;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    setCart([...cart]);
  };
  const resetCart = () => setCart([]);
  return (
    <CartContext.Provider
      value={{
        cart,
        handleCartIncrement,
        handleCartDecrement,
        handleAddToCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const useCartActions = () => {
  const { fetchCartCount } = useContext(CartContext);

  const addToCart = async (productId) => {
    await axios.post("http://localhost:5000/api/cart", {
      productId,
      quantity: 1,
    });
    fetchCartCount(); // Updates navbar instantly
  };

  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    fetchCartCount();
  };

  return { addToCart, removeFromCart };
};

export default useCartActions;

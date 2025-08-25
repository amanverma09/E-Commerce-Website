import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Function to fetch cart count
  const fetchCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Error fetching cart count", err);
    }
  };

  const handleAddToCart = async (product, selectedSize) => {
    try {
      await axios.post("http://localhost:5000/api/cart", {
        productId: product._id,
        size: selectedSize,
        quantity: 1,
      }); 
      fetchCartCount();
      console.log(`Added to cart: ${product.name} (Size: ${selectedSize})`);
      alert("Item added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };
  // Fetch count on initial load
  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, fetchCartCount, handleAddToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

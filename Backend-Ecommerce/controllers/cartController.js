import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add Item to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    if (!productId || !size) {
      return res
        .status(400)
        .json({ message: "Product ID and Size are required" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if item already exists in cart for same size
    let cartItem = await Cart.findOne({ productId, size });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      cartItem.totalPrice = product.discountPrice * cartItem.quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ productId, size, quantity });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Cart Items
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Cart Item (Quantity)
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findById(id).populate("productId");
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.productId.discountPrice * quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cart Item
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem)
      return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Cart Item
export const getCartItemById = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id).populate("productId");
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

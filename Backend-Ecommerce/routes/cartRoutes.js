
import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  getCartItemById,
} from "../controllers/cartController.js";

const router = express.Router();

// Add to cart (No userId for now)
router.post("/", addToCart);

// Get all cart items (for now returns all items, later will filter by userId)
router.get("/", getCartItems);

// Update cart item
router.put("/update/:id", updateCartItem);

// Delete cart item
router.delete("/:id", deleteCartItem);

// GET Single Cart Item
router.get("/:id", getCartItemById);

export default router;

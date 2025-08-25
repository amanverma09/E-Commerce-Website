import Product from "../models/Product.js";
import fs from "fs";

// CREATE Product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discountPrice,
      discountPercentage,
      description1,
      description2,
      size,
      category,
    } = req.body;

    // Safely extract images
    const images = [];
    if (req.files?.image1) images.push(req.files.image1[0].filename);
    if (req.files?.image2) images.push(req.files.image2[0].filename);
    if (req.files?.image3) images.push(req.files.image3[0].filename);

    // Create product document
    const product = new Product({
      name,
      price,
      discountPrice,
      discountPercentage,
      description1,
      description2,
      size,
      category,
      images,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error); // Debugging
    res.status(500).json({ error: error.message });
  }
};

// GET All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// UPDATE Product Size
export const updateProductSize = async (req, res) => {
  try {
    const { size } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { size },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product size updated", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from server
    product.images.forEach((img) => {
      const path = `uploads/${img}`;
      if (fs.existsSync(path)) fs.unlinkSync(path);
    });

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

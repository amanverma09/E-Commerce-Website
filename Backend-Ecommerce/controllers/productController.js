import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// CREATE Product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
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

    // Calculate discount price
    let discountPrice = price;
    if (price && discountPercentage) {
      const discount =
        (parseFloat(price) * parseFloat(discountPercentage)) / 100;
      discountPrice = (parseFloat(price) - discount).toFixed(2);
    }
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

// UPDATE Product
// UPDATE Product (with image handling)
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discountPercentage,
      description1,
      description2,
      size,
      category,
      quantity,
    } = req.body;

    // Find the existing product first
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Process uploaded images - keep existing ones if new ones aren't uploaded
    let images = [...existingProduct.images];

    // Handle image updates if files are uploaded
    if (req.files) {
      // Delete old images that are being replaced
      if (req.files.image1 && images[0]) {
        const oldImagePath = path.join("uploads", images[0]);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        images[0] = req.files.image1[0].filename;
      }
      if (req.files.image2 && images[1]) {
        const oldImagePath = path.join("uploads", images[1]);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        images[1] = req.files.image2[0].filename;
      }
      if (req.files.image3 && images[2]) {
        const oldImagePath = path.join("uploads", images[2]);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        images[2] = req.files.image3[0].filename;
      }

      // Add new images if there's space (for cases where fewer than 3 images existed before)
      if (req.files.image1 && !images[0])
        images[0] = req.files.image1[0].filename;
      if (req.files.image2 && !images[1])
        images[1] = req.files.image2[0].filename;
      if (req.files.image3 && !images[2])
        images[2] = req.files.image3[0].filename;
    }

    // Calculate discount price
    let discountPrice = parseFloat(price || existingProduct.price);
    if (
      (price || existingProduct.price) &&
      (discountPercentage || existingProduct.discountPercentage)
    ) {
      const priceValue = parseFloat(price || existingProduct.price);
      const discountValue = parseFloat(
        discountPercentage || existingProduct.discountPercentage
      );
      const discount = (priceValue * discountValue) / 100;
      discountPrice = parseFloat((priceValue - discount).toFixed(2));
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name || existingProduct.name,
        price: parseFloat(price || existingProduct.price),
        discountPrice,
        discountPercentage: parseFloat(
          discountPercentage || existingProduct.discountPercentage
        ),
        description1: description1 || existingProduct.description1,
        description2: description2 || existingProduct.description2,
        size: size || existingProduct.size,
        category: category || existingProduct.category,
        quantity: parseInt(quantity || existingProduct.quantity),
        images,
      },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    // Clean up uploaded files if there was an error
    if (req.files) {
      Object.values(req.files).forEach((fileArray) => {
        fileArray.forEach((file) => {
          const filePath = path.join("uploads", file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      });
    }

    res.status(500).json({ error: error.message });
  }
};

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    discountPercentage: { type: Number },
    description1: { type: String },
    description2: { type: String },
    category: { type: String },
    size: { type: String },
    quantity: { type: Number, default: 1 },
    images: [String], // store image filenames
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

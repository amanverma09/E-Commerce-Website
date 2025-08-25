// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//   size: String,
//   quantity: { type: Number, default: 1 },
// });

// export default mongoose.model("Cart", cartSchema);

// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-calculate totalPrice before saving
cartSchema.pre("save", async function (next) {
  if (this.isModified("quantity") || this.isNew) {
    const Product = mongoose.model("Product");
    const product = await Product.findById(this.productId);
    if (product) {
      this.totalPrice = product.discountPrice * this.quantity;
    }
  }
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

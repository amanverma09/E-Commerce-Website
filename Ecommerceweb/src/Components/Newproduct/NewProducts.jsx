import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaShoppingCart,
  FaHeart,
  FaSearchPlus,
  FaShareAlt,
} from "react-icons/fa";
import "./NewProducts.css"; 
import image1 from "../../assets/slider-item-3.webp";
import image2 from "../../assets/slider-item-1.webp";
import image3 from "../../assets/slider-item-3.webp";

const productsData = [
  {
    id: 1,
    name: "Casual T-Shirt",
    price: 799,
    oldPrice: 999,
    discount: "20%",
    category: "Just Now",
    image: image1,
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 1599,
    oldPrice: 1999,
    discount: "20%",
    category: "New Arrival",
    image: image2,
  },
  {
    id: 3,
    name: "Sneakers",
    price: 2499,
    oldPrice: 2999,
    discount: "17%",
    category: "Top Sales",
    image: image3,
  },
  {
    id: 4,
    name: "Sports Watch",
    price: 1999,
    oldPrice: 2499,
    discount: "20%",
    category: "Best Rating",
    image: image1,
  },
  {
    id: 5,
    name: "Summer Dress",
    price: 1299,
    oldPrice: 1599,
    discount: "19%",
    category: "New Arrival",
    image: image2,
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 999,
    oldPrice: 1299,
    discount: "23%",
    category: "Top Sales",
    image: image3,
  },
  {
    id: 7,
    name: "Leather Wallet",
    price: 999,
    oldPrice: 1299,
    discount: "23%",
    category: "Top Sales",
    image: image3,
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 999,
    oldPrice: 1299,
    discount: "23%",
    category: "Top Sales",
    image: image3,
  },
  {
    id: 9,
    name: "Leather Wallet",
    price: 999,
    oldPrice: 1299,
    discount: "23%",
    category: "Top Sales",
    image: image3,
  },
  {
    id: 10,
    name: "Leather Wallet",
    price: 999,
    oldPrice: 1299,
    discount: "23%",
    category: "Top Sales",
    image: image3,
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 999,
    oldPrice: 1299,
    discount: "23%",
    category: "Top Sales",
    image: image3,
  },
  {
    id: 12,
    name: "Leather Wallet",
    price: 999,
    oldPrice: 1299,
    discount: "23%",
    category: "Top Sales",
    image: image3,
  },
];

const categories = [
  "All",
  "Just Now",
  "New Arrival",
  "Top Sales",
  "Best Rating",
];

export default function NewProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">New Products</h2>

      {/* Category Tabs */}
      <ul className="nav nav-pills justify-content-center mb-4">
        {categories.map((cat) => (
          <li key={cat} className="nav-item">
            <button
              className={`nav-link ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* Products Grid */}
      <div className="row g-5">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-6">
            <div className="product-card">
              <div className="product-img">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid"
                />
                <span className="discount-badge">{product.discount}</span>
                <div className="product-actions">
                  {/* <button>
                    <FaSearchPlus />
                  </button> */}
                  <button>
                    <FaShoppingCart />
                  </button>
                  <button>
                    <FaHeart />
                  </button>
                  <button>
                    <FaShareAlt />
                  </button>
                </div>
              </div>
              <div className="product-info text-center mt-3">
                <h5>{product.name}</h5>
                <p>
                  <span className="text-danger fw-bold">₹{product.price}</span>{" "}
                  <span className="text-muted text-decoration-line-through">
                    ₹{product.oldPrice}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

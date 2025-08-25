import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaHeart, FaShareAlt } from "react-icons/fa";
import "./NewProducts.css";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const categories = [
  "All",
  "Just Now",
  "New Arrival",
  "Top Sales",
  "Best Rating",
];

export default function NewProducts2() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const { handleAddToCart } = useContext(CartContext);

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
          <div key={product._id} className="col-md-3 col-sm-6">
            <NavLink
              to={`/product/${product._id}`}
              className="text-decoration-none"
            >
              <div className="product-card">
                <div className="product-img">
                  <div className="hover-img d-flex">
                    <img
                      src={`http://localhost:5000/uploads/${product.images[0]}`}
                      alt={product.name}
                      className="img-fluid img-1"
                    />
                    <img
                      src={`http://localhost:5000/uploads/${product.images[1]}`}
                      alt={product.name}
                      className="img-fluid img-2"
                    />
                  </div>
                  {product.discountPercentage && (
                    <span className="discount-badge">
                      {product.discountPercentage}%
                    </span>
                  )}
                  <div className="product-actions">
                    <button
                      onClick={() =>
                        handleAddToCart(product, (product.sizes = "S"))
                      }
                    >
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
                  <h5 className="text-dark ">{product.name}</h5>
                  <p>
                    <span className="text-danger fw-bold">
                      ₹{product.discountPrice}
                    </span>{" "}
                    {product.price && (
                      <span className="text-muted text-decoration-line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

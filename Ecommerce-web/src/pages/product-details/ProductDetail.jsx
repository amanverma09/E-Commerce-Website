import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ProductDetail = () => {
  const { fetchCartCount } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedSize(res.data.size);
        if (res.data.images?.length) {
          setMainImage(`http://localhost:5000/uploads/${res.data.images[0]}`);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSizeChange = async (size) => {
    setSelectedSize(size);
    try {
      await axios.put(`http://localhost:5000/api/products/${id}/size`, {
        size,
      });
      alert("Size updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update size!");
    }
  };
   const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart", {
        productId: product._id,
        size: selectedSize,
        quantity: 1,
      });
      fetchCartCount();
      alert("Item added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <section className="product-detail-section py-5">
      <div className="container">
        <div className="row">
          {/* Left: Images */}
          <div className="col-md-6">
            <div className="image-container">

            <img
              src={mainImage}
              alt="Product"
              className="img-fluid main-product-img shadow rounded"
            />
            </div>
            <div className="d-flex gap-2 mt-3 thumb-row">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`thumb-${i}`}
                  className={`thumb-img ${
                    mainImage.endsWith(img) ? "active" : ""
                  }`}
                  onClick={() =>
                    setMainImage(`http://localhost:5000/uploads/${img}`)
                  }
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="col-md-6">
            <h2 className="product-title mb-3">{product.name}</h2>
            <div className="mb-3">
              <span className="old-price me-2">${product.price}</span>
              <span className="price text-success fw-bold">
                ${product.discountPrice}
              </span>
            </div>

            <p className="text-muted mb-4">{product.description1}</p>

            {/* Static Size */}
            <div className="mb-3">
              <label className="fw-semibold mb-2">Size:</label>
              <div className="d-flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <label key={size} className="option-btn">
                    <input
                      type="radio"
                      checked={selectedSize === size}
                      name="size"
                      onClick={() => handleSizeChange(size)}
                    />{" "}
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Static Color */}
            <div className="mb-4">
              <label className="fw-semibold mb-2">Color:</label>
              <div className="d-flex gap-3">
                <span
                  className="color-swatch"
                  style={{ background: "#6c757d" }}
                ></span>
                <span
                  className="color-swatch"
                  style={{ background: "#d9534f" }}
                ></span>
                <span
                  className="color-swatch"
                  style={{ background: "#5cb85c" }}
                ></span>
                <span
                  className="color-swatch"
                  style={{ background: "#0275d8" }}
                ></span>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3">
              <button className="btn btn-dark px-4" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-success px-4">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="tabs-section mt-5">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "info" ? "active" : ""}`}
                onClick={() => setActiveTab("info")}
              >
                Additional Info
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (Static)
              </button>
            </li>
          </ul>

          <div className="tab-content border p-4 rounded-bottom">
            {activeTab === "description" && <p>{product.description2}</p>}
            {activeTab === "info" && (
              <ul>
                <li>Material: Solid Oak Wood</li>
                <li>Dimensions: 90cm x 60cm x 100cm</li>
                <li>Weight: 12kg</li>
                <li>Upholstery: Premium Cotton Fabric</li>
              </ul>
            )}
            {activeTab === "reviews" && (
              <div>
                <p>⭐⭐⭐⭐⭐ Excellent Product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

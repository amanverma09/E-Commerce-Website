import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

// ProductDetail Component for viewing product details
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-website-backend-9cwr.onrender.com/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to fetch product data");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mt-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="#"
              onClick={() => navigate(-1)}
              className="text-decoration-none"
            >
              Products
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Images */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div
              className="main-image-container"
              style={{ height: "400px", overflow: "hidden" }}
            >
              <img
                src={`https://e-commerce-website-backend-9cwr.onrender.com/uploads/${product.images[activeImage]}`}
                alt={product.name}
                className="img-fluid w-100 h-100 object-fit-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="p-3 bg-light">
              <div className="d-flex justify-content-center gap-2">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      index === activeImage ? "active" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    style={{
                      width: "60px",
                      height: "60px",
                      border:
                        index === activeImage
                          ? "3px solid #6f42c1"
                          : "1px solid #dee2e6",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <img
                      src={`https://e-commerce-website-backend-9cwr.onrender.com/uploads/${img}`}
                      alt={`${product.name} view ${index + 1}`}
                      className="img-fluid w-100 h-100 object-fit-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <div className="ps-md-4">
            <h1 className="fw-bold mb-2 text-gradient">{product.name}</h1>

            {/* Price Section */}
            <div className="d-flex align-items-center mb-3">
              <h2 className="text-primary fw-bold me-3">
                ${product.discountPrice || product.price}
              </h2>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-muted text-decoration-line-through me-2 fs-5">
                    ${product.price}
                  </span>
                  <span className="badge bg-success fs-6">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`badge ${
                  product.quantity > 0 ? "bg-success" : "bg-danger"
                } fs-6 p-2`}
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h4
                className="mb-3 border-bottom pb-2"
                style={{ color: "#6f42c1" }}
              >
                Description
              </h4>
              <p className="text-muted">{product.description1}</p>
              <p className="text-muted">{product.description2}</p>
            </div>

            {/* Product Details */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card bg-light border-0 rounded-3 p-3 mb-3">
                  <strong className="d-block text-primary">Category</strong>
                  <span>{product.category}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light border-0 rounded-3 p-3 mb-3">
                  <strong className="d-block text-primary">Size</strong>
                  <span>{product.size}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light border-0 rounded-3 p-3">
                  <strong className="d-block text-primary">
                    Quantity Available
                  </strong>
                  <span>{product.quantity}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3">
              <NavLink
                to={`/admin/updateProduct/${product._id}`}
                className="btn btn-primary px-4 py-2 rounded-pill fw-bold"
                style={{
                  background: "linear-gradient(45deg, #6f42c1, #e83e8c)",
                  border: "none",
                }}
              >
                <i className="bi bi-pencil me-2"></i>Edit Product
              </NavLink>
              <button
                className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold"
                 style={{
                  background: "linear-gradient(45deg, #46c142ff, #1c0b13ff)",
                  border: "none",
                }}
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left me-2"></i>Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// const ProductForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     discountPrice: "",
//     discountPercentage: "",
//     description1: "",
//     description2: "",
//     size: "",
//     category: "",
//     quantity: "",
//   });

//   const [images, setImages] = useState({
//     image1: null,
//     image2: null,
//     image3: null,
//   });

//   // Calculate discount price whenever price or discountPercentage changes
//   useEffect(() => {
//     if (formData.price && formData.discountPercentage) {
//       const discount =
//         (parseFloat(formData.price) * parseFloat(formData.discountPercentage)) /
//         100;
//       const finalPrice = (formData.price - discount).toFixed(2);
//       setFormData((prev) => ({ ...prev, discountPrice: finalPrice }));
//     } else {
//       setFormData((prev) => ({ ...prev, discountPrice: "" }));
//     }
//   }, [formData.price, formData.discountPercentage]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImages({ ...images, [e.target.name]: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//     Object.keys(images).forEach(
//       (key) => images[key] && data.append(key, images[key])
//     );

//     await axios.post("https://e-commerce-website-backend-9cwr.onrender.com/api/products", data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert("Product Added Successfully!");
//   };

//   return (
//     <div className="container mt-3">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="text-center mb-4">➕Add New Product</h3>
//         <NavLink to="/admin/manageProducts" className="border p-2 fw-bold">
//           Product Details
//         </NavLink>
//       </div>
//       <form onSubmit={handleSubmit} className="card shadow p-4">
//         <div className="mb-3">
//           <label className="form-label">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             className="form-control"
//             placeholder="Enter product name"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Price</label>
//             <input
//               type="number"
//               name="price"
//               className="form-control"
//               placeholder="Enter price"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Discount Price</label>
//             <input
//               type="number"
//               name="discountPrice"
//               className="form-control"
//               placeholder="Auto calculated"
//               value={formData.discountPrice}
//               readOnly
//             />
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Discount Percentage</label>
//           <input
//             type="number"
//             name="discountPercentage"
//             className="form-control"
//             placeholder="Enter discount %"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Description Fields */}
//         <div className="mb-3">
//           <label className="form-label">Description 1</label>
//           <textarea
//             name="description1"
//             className="form-control"
//             rows="2"
//             placeholder="Short description"
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Description 2</label>
//           <textarea
//             name="description2"
//             className="form-control"
//             rows="2"
//             placeholder="Additional details"
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         {/* Image Uploads */}
//         <div className="mb-3">
//           <label className="form-label">Upload Images</label>
//           <input
//             type="file"
//             name="image1"
//             className="form-control mb-2"
//             onChange={handleImageChange}
//           />
//           <input
//             type="file"
//             name="image2"
//             className="form-control mb-2"
//             onChange={handleImageChange}
//           />
//           <input
//             type="file"
//             name="image3"
//             className="form-control"
//             onChange={handleImageChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    discountPercentage: "",
    description1: "",
    description2: "",
    size: "",
    category: "",
    quantity: "",
  });

  const [images, setImages] = useState([null, null, null]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);

  // Fetch product if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `https://e-commerce-website-backend-9cwr.onrender.com/api/products/${id}`
          );
          const product = response.data;

          setFormData({
            name: product.name || "",
            price: product.price || "",
            discountPrice: product.discountPrice || "",
            discountPercentage: product.discountPercentage || "",
            description1: product.description1 || "",
            description2: product.description2 || "",
            size: product.size || "",
            category: product.category || "",
            quantity: product.quantity || "",
          });

          if (product.images) {
            setExistingImages(product.images);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          alert("Failed to fetch product data");
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode]);

  // Auto-calculate discount price
  useEffect(() => {
    if (formData.price && formData.discountPercentage) {
      const discount =
        (parseFloat(formData.price) * parseFloat(formData.discountPercentage)) /
        100;
      const finalPrice = (parseFloat(formData.price) - discount).toFixed(2);
      setFormData((prev) => ({ ...prev, discountPrice: finalPrice }));
    } else {
      setFormData((prev) => ({ ...prev, discountPrice: "" }));
    }
  }, [formData.price, formData.discountPercentage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = reader.result;
      setImagePreviews(newPreviews);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = null;
    setImagePreviews(newPreviews);

    // Clear file input
    document.getElementById(`image-${index}`).value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    // Append form data
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== ""
      ) {
        data.append(key, formData[key]);
      }
    });

    // Append images
    images.forEach((file, index) => {
      if (file) {
        data.append(`image${index + 1}`, file);
      }
    });

    try {
      if (isEditMode) {
        await axios.put(`https://e-commerce-website-backend-9cwr.onrender.com/api/products/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Updated Successfully!");
      } else {
        await axios.post("https://e-commerce-website-backend-9cwr.onrender.com/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Added Successfully!");
      }
      navigate("/admin/productTable");
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.error || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = ["men", "women", "kids", "accessories"];

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center mb-0">
          {isEditMode ? "✏️ Update Product" : "➕ Add New Product"}
        </h3>
        <NavLink to="/admin/productTable" className="btn btn-outline-primary">
          ← Back to Products
        </NavLink>
      </div>

      <form onSubmit={handleSubmit} className="card shadow p-4">
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price and Discount */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Price *</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Discount Percentage</label>
            <input
              type="number"
              name="discountPercentage"
              className="form-control"
              placeholder="Enter discount %"
              value={formData.discountPercentage}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              className="form-control"
              placeholder="Auto calculated"
              value={formData.discountPrice}
              readOnly
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description 1 *</label>
          <textarea
            name="description1"
            className="form-control"
            rows="3"
            placeholder="Short description"
            value={formData.description1}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Description 2</label>
          <textarea
            name="description2"
            className="form-control"
            rows="3"
            placeholder="Additional details"
            value={formData.description2}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Size, Category & Quantity */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Size *</label>
            <input
              type="text"
              name="size"
              className="form-control"
              placeholder="Enter size (e.g., S, M, L, XL)"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Category *</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Quantity *</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="form-label">
            Product Images {!isEditMode && "*"}
          </label>

          {isEditMode && existingImages.length > 0 && (
            <div className="mb-3">
              <p className="text-muted mb-2">Existing Images:</p>
              <div className="d-flex gap-2 flex-wrap mb-3">
                {existingImages.map((img, index) => (
                  <div
                    key={index}
                    className="position-relative"
                    style={{ width: "100px" }}
                  >
                    <img
                      src={`https://e-commerce-website-backend-9cwr.onrender.com/uploads/${img}`}
                      alt={`product-${index}`}
                      className="img-thumbnail"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="row">
            {[0, 1, 2].map((index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body text-center">
                    {imagePreviews[index] ||
                    (isEditMode && existingImages[index]) ? (
                      <>
                        <img
                          src={
                            imagePreviews[index] ||
                            `https://e-commerce-website-backend-9cwr.onrender.com/uploads/${existingImages[index]}`
                          }
                          alt={`preview-${index}`}
                          className="img-fluid mb-2"
                          style={{ maxHeight: "150px", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <div className="text-muted">
                        <i className="bi bi-image fs-1"></i>
                        <p className="mt-2">No image selected</p>
                      </div>
                    )}
                    <input
                      id={`image-${index}`}
                      type="file"
                      className="form-control mt-2"
                      onChange={(e) => handleImageChange(e, index)}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isEditMode && (
            <div className="form-text">
              At least one image is required. You can upload up to 3 images.
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              {isEditMode ? "Updating..." : "Adding..."}
            </>
          ) : isEditMode ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

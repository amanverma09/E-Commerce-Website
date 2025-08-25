import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = () => {
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

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  // Calculate discount price whenever price or discountPercentage changes
  useEffect(() => {
    if (formData.price && formData.discountPercentage) {
      const discount =
        (parseFloat(formData.price) *
          parseFloat(formData.discountPercentage)) /
        100;
      const finalPrice = (formData.price - discount).toFixed(2);
      setFormData((prev) => ({ ...prev, discountPrice: finalPrice }));
    } else {
      setFormData((prev) => ({ ...prev, discountPrice: "" }));
    }
  }, [formData.price, formData.discountPercentage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Object.keys(images).forEach(
      (key) => images[key] && data.append(key, images[key])
    );

    await axios.post("http://localhost:5000/api/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product Added Successfully!");
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Add New Product</h3>
      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter product name"
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Enter price"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
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

        <div className="mb-3">
          <label className="form-label">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            className="form-control"
            placeholder="Enter discount %"
            onChange={handleChange}
          />
        </div>

        {/* Description Fields */}
        <div className="mb-3">
          <label className="form-label">Description 1</label>
          <textarea
            name="description1"
            className="form-control"
            rows="2"
            placeholder="Short description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Description 2</label>
          <textarea
            name="description2"
            className="form-control"
            rows="2"
            placeholder="Additional details"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image Uploads */}
        <div className="mb-3">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            name="image1"
            className="form-control mb-2"
            onChange={handleImageChange}
          />
          <input
            type="file"
            name="image2"
            className="form-control mb-2"
            onChange={handleImageChange}
          />
          <input
            type="file"
            name="image3"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

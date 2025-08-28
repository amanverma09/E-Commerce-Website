// src/Admin/AdminProductTable.jsx
import React from "react";
import PropTypes from "prop-types";
import "./AdminProductTable.css";
import { NavLink } from "react-router-dom";

const AdminProductTable = ({ products, onDelete, onEdit, onView }) => {
  return (
    <div className="admin-table-wrapper">
      <h3 className="table-title">Product List</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>DiscountPrice</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <img
                      src={`http://localhost:5000/uploads/${product.images[0]}`}
                      alt={product.name}
                      className="product-thumb"
                    />
                    <img
                      src={`http://localhost:5000/uploads/${product.images[1]}`}
                      alt={product.name}
                      className="product-thumb"
                    />
                    <img
                      src={`http://localhost:5000/uploads/${product.images[2]}`}
                      alt={product.name}
                      className="product-thumb"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.discountPercentage}%</td>
                  <td>${product.discountPrice}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  {/* <td className="d-flex gap-2 justify-content-center align-items-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(product._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    <button className="btn btn-sm btn-primary"
                    onClick={() => onEdit(product._id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-info"
                    onClick={() => onView(product._id)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td> */}

                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => onView(product._id)}
                        title="View Details"
                      >
                        👁️ View
                      </button>
                      <NavLink
                        to={`/admin/updateProduct/${product._id}`}
                        className="btn btn-warning btn-sm"
                        title="Edit Product"
                      >
                        ✏️ Edit
                      </NavLink>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(product._id)}
                        title="Delete Product"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AdminProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminProductTable;

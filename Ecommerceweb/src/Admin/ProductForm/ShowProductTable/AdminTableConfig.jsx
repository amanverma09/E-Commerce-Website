// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminProductTable from "./AdminProductTable";

import axios from "axios";
import AdminProductTable from "./AdminProductTable";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// const AdminTableConfig = () => {
//   const [products, setProducts] = useState([]);

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching products", err);
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       fetchProducts(); // Refresh list
//     }
//   };
//     // Edit product
//     const handleEdit = (id) => {
//       // Navigate to edit page or open edit modal
//       console.log("Edit product with ID:", id);
//     };

//     // View product
//     const handleView = (id) => {
//       // Navigate to view page or open view modal
//       console.log("View product with ID:", id);
//     };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Admin Dashboard</h2>
//       <AdminProductTable products={products} onDelete={handleDelete} onEdit={handleEdit} onView={handleView} />
//     </div>
//   );
// };

// export default AdminTableConfig;

const AdminTableConfig = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <NavLink to="/admin/productAdd" className="btn btn-success">
          + Add New Product
        </NavLink>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <h4>No products found</h4>
          <p>Click the button above to add your first product.</p>
        </div>
      ) : (
        <AdminProductTable
          products={products}
          onDelete={handleDelete}
          onEdit={(id) => console.log("Edit:", id)}
          onView={(id) => (window.location.href = `/admin/viewProduct/${id}`)}
        />
      )}
    </div>
  );
};

export default AdminTableConfig;

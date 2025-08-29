import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AdminTableConfig = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-website-kappa-opal.vercel.app/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `https://e-commerce-website-kappa-opal.vercel.app/api/products/${id}`
        );
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

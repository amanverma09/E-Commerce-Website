import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Components/AppLayout";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import HomePage from "./Components/Home/HomePage";
import ProductDetail from "./pages/product-details/ProductDetail";
import ProductForm from "./Admin/ProductForm/CreateProducts/ProductForm";
import NewProducts2 from "./Components/Newproduct/NewProducts2";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import PaymentSuccess from "./pages/PaymentPage/PaymentSuccess";
import AdminDashboard from "./Admin/AdminDash/AdminDashboard";
import Dashboard from "./Admin/AdminDash/Dashboard";
import AdminTableConfig from "./Admin/ProductForm/ShowProductTable/AdminTableConfig";
import SingleProductDetail from "./Admin/ProductForm/GetSingleProduct/SingleProductDetail ";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/productShow",
          element: <NewProducts2 />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/paymentSuccess",
          element: <PaymentSuccess />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/admin",
          element: <Dashboard />,
        },
        {
          path: "/admin/productAdd",
          element: <ProductForm />,
        },
        {
          path: "/admin/productTable",
          element: <AdminTableConfig />,
        },
        {
          path: "/admin/updateProduct/:id",
          element: <ProductForm />,
        },
        {
          path: "/admin/viewProduct/:id",
          element: <SingleProductDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

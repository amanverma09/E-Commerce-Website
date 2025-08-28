import React from "react";
// import HomePage from "./Components/HomePage";
// import CategorySlider from "./Components/Category/CategorySlider";
// import NewProducts from "./Components/Newproduct/NewProducts";
// import Footer from "./Components/Footer/Footer";
// import NewProducts2 from "./Components/Newproduct/NewProducts2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Components/AppLayout";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import HomePage from "./Components/Home/HomePage";
import ProductDetail from "./pages/product-details/ProductDetail";
import ProductForm from "./Admin/ProductForm";
import NewProducts2 from "./Components/Newproduct/NewProducts2";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import PaymentSuccess from "./pages/PaymentPage/PaymentSuccess";
function App() {
  // return (
  //   <>
  //     <HomePage />
  //     <CategorySlider />
  //     <NewProducts />
  //     <Footer />
  //   </>
  // );
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
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
          path: "/productAdd",
          element: <ProductForm />,
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
  ]);
  return <RouterProvider router={routes} />;
}

export default App;

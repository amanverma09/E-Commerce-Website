import React from "react";

import { Outlet } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Footer from "./Footer/Footer";
import NavbarComponent from "./Navbar/NavbarComponent";

const AppLayout = () => {
  return (
    <div>
      {/* <HomePage /> */}
      <NavbarComponent />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;

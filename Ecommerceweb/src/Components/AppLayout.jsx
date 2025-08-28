import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarComponent from "./Navbar/NavbarComponent";

const AppLayout = () => {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;

import React from "react";
import anantLogo from "../../assets/anantlogo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaHeart, FaSearch, FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
const NavbarComponent = () => {
  const { cartCount } = useContext(CartContext);
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar py-3">
        <Container>
          <Navbar.Brand
            href="#"
            className="nav-logo fw-bold fs-3 text-dark d-flex align-items-center"
          >
            <img src={anantLogo} alt="logo" className=" logo-img" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-menu" />
          <Navbar.Collapse id="nav-menu" className="justify-content-center">
            <Nav className="fw-semibold gap-4">
              <NavLink className="nav-link" to="/">
                HOME
              </NavLink>
              <NavLink className="nav-link" to="/about">
                ABOUT
              </NavLink>
              <NavLink className="nav-link" to="#">
                SHOP
              </NavLink>
              <NavLink className="nav-link" to="/pages">
                PAGES
              </NavLink>
              <NavLink className="nav-link" to="/blog">
                BLOG
              </NavLink>
              <NavLink className="nav-link" to="/contact">
                CONTACT
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex align-items-center icon-section">
            <FaSearch className="me-3" />
            <FaHeart className="me-3" />
            <NavLink className="cart-icon" to="/cart">
              <FaShoppingCart />
              <span className="cart-badge">{cartCount}</span>
            </NavLink>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;

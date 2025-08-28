import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Checkout.css";
import bannerImage from "../../assets/apartment-1851201_1280.jpg";
import { motion } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-website-kappa-opal.vercel.app/api/cart")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error(err));
  }, []);
  // Calculate cart totals
  const calculateTotals = () => {
    const price = cartItems.reduce(
      (total, item) =>
        total +
        (item.productId.originalPrice || item.productId.discountPrice * 1.3) *
          item.quantity,
      0
    );

    const discountPrice = cartItems.reduce(
      (total, item) => total + item.productId.discountPrice * item.quantity,
      0
    );

    const discount = price - discountPrice;
    const protectPromiseFee = cartItems.length * 50;

    return {
      price: price.toFixed(2),
      discount: discount.toFixed(2),
      protectPromiseFee: protectPromiseFee.toFixed(2),
      totalAmount: (discountPrice + protectPromiseFee).toFixed(2),
      savings: discount.toFixed(2),
    };
  };

  const totals = calculateTotals();

  return (
    <>
      {/* Page Banner */}
      <div
        className="page-banner-section d-flex align-items-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="container">
          <div className="page-banner-content text-start">
            <h2 className="title">Checkout</h2>
            <ul className="breadcrumb list-inline">
              <li className="list-inline-item">
                <a href="/">Home /</a>
              </li>
              <li className="list-inline-item active">Checkout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* checkout page */}
      <section className="checkout-section py-5">
        <div className="container">
          <div className="row g-4">
            {/* Left Side - User Info + Address */}
            <div className="col-lg-7">
              {/* User Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="checkout-card mb-4"
              >
                <h4 className="section-title">User Information</h4>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value="John Doe"
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value="johndoe@example.com"
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Order ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value="ORD123456789"
                    readOnly
                  />
                </div>
              </motion.div>

              {/* Address Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="checkout-card"
              >
                <h4 className="section-title">Shipping Address</h4>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New York"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NY"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="USA"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="10001"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Price Details - Right Sidebar */}
            <div className="col-lg-4">
              <div className="price-details-card">
                <h6 className="price-details-title">PRICE DETAILS</h6>

                <div className="price-row">
                  <span>Price ({cartItems.length} items)</span>
                  <span>${totals.price}</span>
                </div>

                <div className="price-row">
                  <span>Protect Promise Fee</span>
                  <span>${totals.protectPromiseFee}</span>
                </div>

                <hr className="divider" />

                <div className="price-row total-amount">
                  <span>
                    <strong>Total Payable</strong>
                  </span>
                  <span>
                    <strong>${totals.totalAmount}</strong>
                  </span>
                </div>

                <div className="savings-text text-success">
                  You will save ${totals.savings} on this order
                </div>

                <div className="secure-payments">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="secureCheck"
                      checked
                      readOnly
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="secureCheck"
                    >
                      Safe and Secure Payments. Easy returns. 100% Authentic
                      products.
                    </label>
                  </div>
                </div>

                <NavLink
                  to="/paymentSuccess"
                  className="btn btn-warning place-order-btn w-100"
                >
                  PLACE ORDER
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;

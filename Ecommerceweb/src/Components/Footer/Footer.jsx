import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTumblr,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../../assets/anantlogo.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Top bar */}
      <div className="footer-top py-3">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          {/* Logo + Call */}
          <div className="img-div d-flex align-items-center gap-5">
            <motion.img
              src={logo}
              alt="logo"
              className="footer-logo"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
            <div>
              <FaPhoneAlt className="me-2 text-warning" />
              <strong>Call Us:</strong> <br /> <span>00 123 456 789</span>
            </div>
          </div>

          {/* Payment icons */}
          <div className="payment-icons d-flex gap-2">
            <img src="https://img.icons8.com/color/48/visa.png" alt="visa" />
            <img
              src="https://img.icons8.com/color/48/mastercard.png"
              alt="mastercard"
            />
            <img
              src="https://img.icons8.com/color/48/paypal.png"
              alt="paypal"
            />
            <img
              src="https://img.icons8.com/color/48/discover.png"
              alt="discover"
            />
          </div>

          {/* Subscribe */}
          <div className="subscribe-box d-flex">
            <input
              type="email"
              className="form-control"
              placeholder="Your Mail"
            />
            <motion.button
              className="btn btn-warning"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✈
            </motion.button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="footer-main py-5">
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-2 col-sm-6 mb-3">
              <h6>Customer Service</h6>
              <ul className="list-unstyled">
                <li>Payment Methods</li>
                <li>Money-back guarantee!</li>
                <li>Returns-Shipping</li>
                <li>Terms and conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="col-md-2 col-sm-6 mb-3">
              <h6>Information</h6>
              <ul className="list-unstyled">
                <li>About Furbar</li>
                <li>How to Shop</li>
                <li>FAQ</li>
                <li>Contact us</li>
                <li>Log in</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-md-2 col-sm-6 mb-3">
              <h6>My Account</h6>
              <ul className="list-unstyled">
                <li>Sign In</li>
                <li>View Cart</li>
                <li>My Wishlist</li>
                <li>Track My Order</li>
                <li>Help</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="col-md-2 col-sm-6 mb-3">
              <h6>Our Stores</h6>
              <ul className="list-unstyled">
                <li>New York</li>
                <li>London SF</li>
                <li>Cockfosters BP</li>
                <li>Los Angeles</li>
                <li>Chicago</li>
              </ul>
            </div>

            {/* Column 5 */}
            <div className="col-md-4 col-sm-12 mb-3">
              <h6>About Us</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="d-flex gap-3 social-icons">
                <FaTwitter />
                <FaTumblr />
                <FaFacebookF />
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom py-3 text-center">
        © 2023 <span className="brand-text">Furbar</span> Made with ❤️ by
        <span className="brand-text"> codecarnival</span>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5f7f7" }}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="p-5 shadow-lg rounded-4"
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        {/* Title */}
        <motion.h2
          className="mb-4 text-center fw-bold"
          style={{ color: "#2F4F4F" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Create Account ✨
        </motion.h2>

        {/* Input Fields */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control mb-3 py-2"
            placeholder="Enter your name"
            style={{ borderRadius: "10px", borderColor: "#97B8BD" }}
          />
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control mb-3 py-2"
            placeholder="Enter your email"
            style={{ borderRadius: "10px", borderColor: "#97B8BD" }}
          />
        </motion.div>

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control mb-3 py-2"
            placeholder="Enter your password"
            style={{ borderRadius: "10px", borderColor: "#97B8BD" }}
          />
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control mb-4 py-2"
            placeholder="Re-enter your password"
            style={{ borderRadius: "10px", borderColor: "#97B8BD" }}
          />
        </motion.div>

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn w-100 py-2 fw-bold"
          style={{
            backgroundColor: "#97B8BD",
            color: "#fff",
            borderRadius: "12px",
            letterSpacing: "1px",
          }}
        >
          Sign Up
        </motion.button>

        {/* Extra Links */}
        <motion.div
          className="text-center mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <p className="mt-2 mb-0">
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#2F4F4F", fontWeight: "600", textDecoration: "none" }}
            >
              Login
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    // or navigate("/") to go back to home
    // or navigate("/some-path") to go to a specific path
  };
  return (
    <div className="error-page">
      <div className="error-image-container">
        <img
          src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
          alt="404 Not Found"
          className="error-image"
        />
      </div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn’t exist or has been moved.</p>
      <button className="error-btn" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;

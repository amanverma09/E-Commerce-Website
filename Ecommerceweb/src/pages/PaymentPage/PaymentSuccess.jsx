import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const PaymentSuccess = () => {
  const [showMessage, setShowMessage] = useState(false);

  // Use useEffect to handle confetti animation on component mount
  useEffect(() => {
    // Dynamically load external CSS for Bootstrap and Font Awesome
    const bootstrapCss = document.createElement("link");
    bootstrapCss.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    bootstrapCss.rel = "stylesheet";
    document.head.appendChild(bootstrapCss);

    const fontAwesomeCss = document.createElement("link");
    fontAwesomeCss.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
    fontAwesomeCss.rel = "stylesheet";
    document.head.appendChild(fontAwesomeCss);

    // Confetti animation on page load
    const duration = 3 * 100;
    const end = Date.now() + duration;

    function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: [
          "#a855f7",
          "#6366f1",
          "#3b82f6",
          "#22c55e",
          "#ef4444",
          "#f97316",
          "#eab308",
        ],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: [
          "#a855f7",
          "#6366f1",
          "#3b82f6",
          "#22c55e",
          "#ef4444",
          "#f97316",
          "#eab308",
        ],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }
    frame();

    // Clean up on unmount
    return () => {
      document.head.removeChild(bootstrapCss);
      document.head.removeChild(fontAwesomeCss);
    };
  }, []);

  // Function to show a temporary message box instead of alert()
  const showRedirectMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      // You would typically redirect here
      // window.location.href = '/';
    }, 3000); // Hide after 3 seconds
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center text-white"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #9333ea)",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: `'Poppins', sans-serif`,
      }}
    >
      <style>
        {`
          .frosted-card {
            backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: transform 0.3s ease-in-out;
          }

          .frosted-card:hover {
            transform: scale(1.02);
          }

          @keyframes scaleIn {
            from { transform: scale(0) rotate(-180deg); opacity: 0; }
            to { transform: scale(1) rotate(0deg); opacity: 1; }
          }

          .icon-animation {
            animation: scaleIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .btn-custom {
            transition: all 0.3s ease;
          }

          .btn-custom:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>

      {/* Main Container for the Message Box */}
      {showMessage && (
        <div
          className="message-box fixed-top mx-auto"
          style={{
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050,
            maxWidth: "400px",
          }}
        >
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Redirecting to home...
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowMessage(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="container d-flex justify-content-center p-4">
        <div
          className="frosted-card rounded-5 shadow-lg p-5 text-center"
          style={{ maxWidth: "400px" }}
        >
          {/* Success Icon */}
          <div className="icon-animation">
            <i
              className="fas fa-check-circle text-success"
              style={{
                fontSize: "5rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            ></i>
          </div>

          <h2
            className="mt-4 fw-bold"
            style={{
              fontSize: "2.5rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Success!
          </h2>
          <p className="text-white-50 mt-2 fs-5">
            Your payment was completed successfully.
          </p>
          <p className="text-white-50">
            A confirmation email has been sent to your inbox.
          </p>

          {/* Action Button */}
          <button
            className="btn btn-light rounded-pill btn-custom w-100 mt-4 py-3 fw-bold"
            onClick={showRedirectMessage}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import bannerImage from "../../assets/page-banner.jpg"; 
import contact from "../../assets/contact-info.jpg"; 

const Contact = () => {
  return (
    <>
      {/* Page Banner */}
      <div
        className="page-banner-section d-flex align-items-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="container">
          <div className="page-banner-content text-start">
            <h2 className="title">Contact Us</h2>
            <ul className="breadcrumb list-inline">
              <li className="list-inline-item">
                <a href="/">Home</a>
              </li>
              <li className="list-inline-item active">Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
      {/* contact section */}
      <section className="contact-area py-5 ">
        <div className="container">
          <div className="row gx-0 shadow-sm">
            {/* Contact Info */}
            <div className="col-lg-4  contact-info-box p-4">
              <h4 className="fw-bold mb-3 border-start border-3 ps-2 border-warning">
                CONTACT INFO
              </h4>
              <p className="text-muted small">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                eiusmod.
              </p>

              <div className="mb-3 d-flex align-items-center">
                <i className="fa fa-phone me-2 text-warning"></i>
                <span>+00 125 458 222</span>
              </div>

              <div className="mb-3 d-flex align-items-center">
                <i className="fa fa-envelope me-2 text-warning"></i>
                <span>demo@yourmail.com</span>
              </div>

              <div className="mb-3 d-flex align-items-center">
                <i className="fa fa-map-marker me-2 text-warning"></i>
                <span>Your Address Goes Here</span>
              </div>

              {/* Social Icons */}
              <div className="d-flex gap-3 mt-4">
                <a href="#" className="social-icon">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>

              <img src={contact} alt="contact" className="img-fluid mt-4" />
            </div>

            {/* Contact Form */}
            <div className="col-lg-8 bg-light p-4">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name*"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email*"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone No"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Write your comments here"
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-dark px-4 py-2">
                      SUBMIT REVIEW
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import bannerImage from "../../assets/page-banner.jpg"; 
import image1 from "../../assets/image-1.jpg"; 
import image2 from "../../assets/image-2.jpg"; 
import image3 from "../../assets/image-3.jpg"; 
import image4 from "../../assets/image-4.jpg"; 
import TestimonialSection from "../../Components/Testimonal/TestimonialSection";

const About = () => {
  return (
    <>
      {/* Page Banner */}
      <div
        className="page-banner-section d-flex align-items-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="container">
          <div className="page-banner-content text-start">
            <h2 className="title">About Us</h2>
            <ul className="breadcrumb list-inline">
              <li className="list-inline-item">
                <a href="/">Home</a>
              </li>
              <li className="list-inline-item active">About Us</li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Content */}

      <div className="history-section py-5">
        <div className="container">
          {/* <!-- History content --> */}
          <div className="history-content text-center">
            <div className="section-title-03 mb-4">
              <h6 className="sub-title">Our History</h6>
              <h2 className="title">Furbar Furniture Shop</h2>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Sed
              ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>
          <div className="history-icon text-center mt-4">
            <img src="assets/images/icon/icon-5.jpg" alt="Icon" />
          </div>
        </div>
      </div>
      {/* gallary section */}
      <div className="section section-padding-02 gallery-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="image-gallery">
                <img src={image1} alt="gallery" className="img-fluid w-100" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="image-gallery">
                <img src={image2} alt="gallery" className="img-fluid w-100" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-gallery">
                <img src={image3} alt="gallery" className="img-fluid w-100" />
              </div>
            </div>
            <div className="col-lg-6">
              {/* <!-- Image Gallery --> */}
              <div className="image-gallery">
                <img src={image4} alt="gallery" className="img-fluid w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialSection />
    </>
  );
};

export default About;

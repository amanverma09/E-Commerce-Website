import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewProducts2 from "../Newproduct/NewProducts2";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
// import logo from "../assets/logo.webp";
// import { NavLink } from "react-router-dom";
import chair from "../../assets/slider-item-1.webp";
import slide from "../../assets/slider-item-2.webp";
import slide2 from "../../assets/slider-item-3.webp";
import sofa from "../../assets/sofa.jpg";
import CategorySlider from "../Category/CategorySlider";
import TestimonialSection from "../Testimonal/TestimonialSection";
function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      {/* Hero Carousel */}
      <Carousel
        fade
        interval={4000}
        indicators={true}
        controls={false}
        className="hero-carousel"
      >
        {/* Slide 1 */}
        <Carousel.Item>
          <section className="hero-section d-flex align-items-center">
            <Container>
              <Row className="align-items-center">
                <Col md={6}>
                  <h1 className="fw-bold display-5">
                    New Stylish <br /> Decore Furniture
                  </h1>
                  <p className="text-secondary fs-5">
                    Unique Furniture Style Design for Your Family
                  </p>
                  <Button variant="warning" size="lg" className="fw-bold">
                    PURCHASE NOW
                  </Button>
                </Col>
                <Col md={6} className="text-center">
                  <img
                    src={chair}
                    alt="chair"
                    className="img-fluid hero-image"
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <section className="hero-section d-flex align-items-center">
            <Container>
              <Row className="align-items-center">
                <Col md={6}>
                  <h1 className="fw-bold display-5">
                    Modern Wooden <br /> Sofa Collection
                  </h1>
                  <p className="text-secondary fs-5">
                    Crafted comfort with timeless style for your living space.
                  </p>
                  <Button variant="warning" size="lg" className="fw-bold">
                    SHOP NOW
                  </Button>
                </Col>
                <Col md={6} className="text-center">
                  <img
                    src={sofa}
                    alt="Modern Wooden Sofa"
                    className="img-fluid hero-image"
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <section className="hero-section d-flex align-items-center">
            <Container>
              <Row className="align-items-center">
                <Col md={6}>
                  <h1 className="fw-bold display-5">
                    Elegant Lamp <br /> Light Collection
                  </h1>
                  <p className="text-secondary fs-5">
                    Brighten your home with our stylish lighting options.
                  </p>
                  <Button variant="warning" size="lg" className="fw-bold">
                    EXPLORE NOW
                  </Button>
                </Col>
                <Col md={6} className="text-center">
                  <img
                    src={slide}
                    alt="Elegant Lamp"
                    className="img-fluid hero-image"
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </Carousel.Item>
      </Carousel>

      {/* Offers Section */}
      <section className="offers-section py-5">
        <Container>
          <Row className="g-4">
            <Col md={4} data-aos="fade-up">
              <div className="offer-card text-center p-3">
                <img src={slide} alt="slide" className="img-fluid mb-3" />
                <h5>New Ruben Teak Sideboard</h5>
                <p className="text-warning fw-bold">40% Off</p>
              </div>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <div className="offer-card text-center p-3">
                <img src={chair} alt="slide2" className="img-fluid mb-3" />
                <h5>New Reversible Sofa</h5>
                <p className="text-warning fw-bold">30% Off</p>
              </div>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="400">
              <div className="offer-card text-center p-3">
                <img src={slide2} alt="slide2" className="img-fluid mb-3" />
                <h5>New Lamp Light Collection</h5>
                <p className="text-warning fw-bold">60% Off</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <CategorySlider />
      <NewProducts2 />
      <TestimonialSection />
    </>
  );
}

export default App;

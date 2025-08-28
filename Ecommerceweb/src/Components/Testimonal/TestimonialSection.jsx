import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Testimonal.css";
import teddy from "../../assets/chota_teddy-1.avif";
import teddy2 from "../../assets/chota_teddy-3.avif";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. Ut enim ad minim veniam.",
    author: "Taelynn Thorpe",
    designation: "Customer",
    image: teddy,
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "John Smith",
    designation: "Customer",
    image: teddy2,
  },
  {
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Sarah Parker",
    designation: "Customer",
    image: teddy,
  },
];

export default function TestimonialSection() {
  return (
    <section className="testimonial-section bg-light py-5">
      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="single-testimonial text-center">
                <img
                  className="quote"
                  src={teddy}
                  alt="Quote"
                />
                <p>{t.text}</p>
                <img
                  className="author-thumb"
                  src={t.image}
                  alt={t.author}
                  width="100"
                  height="100"
                />
                <h6 className="name">{t.author}</h6>
                <span className="designation">{t.designation}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

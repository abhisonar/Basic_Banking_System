import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import './HeroSection.css'
import "bootstrap/dist/css/bootstrap.css";
function HeroSection() {
    return (
      <div>
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/image1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome to Sparks Bank of India</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/image2.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Basic Banking System</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
}

export default HeroSection


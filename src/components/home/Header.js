import React from "react";
// import { Navigation } from "../Navigation";
import Carousel from "react-bootstrap/Carousel";

export const Header = () => (
  <header className="pb-3">
    {/* <Navigation /> */}

    <div className="carousel-wrapper">
      <Carousel>
        <Carousel.Item>
          <img
            className="img-fluid"
            src="./assets/imgs/carousel-001.jpg"
            alt="product"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="img-fluid"
            src="./assets/imgs/carousel-002.jpg"
            alt="product"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="img-fluid"
            src="./assets/imgs/carousel-003.jpg"
            alt="product"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="img-fluid"
            src="./assets/imgs/carousel-004.jpg"
            alt="product"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  </header>
);

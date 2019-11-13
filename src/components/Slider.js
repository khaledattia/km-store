import React, { useState, useEffect } from "react";
import { usePrev } from "./Hooks";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ThumbItem } from "./product_details/ThumbItem";

export const Slider = ({ initGallery, initResponsive, dots = null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responsive] = useState(initResponsive);
  const [galleryItems, setGalleryItems] = useState(initGallery);

  // Get the previous value (was passed into hook on last render)
  const prevGallery = usePrev(initGallery);

  useEffect(() => {
    if (prevGallery !== initGallery) {
      setGalleryItems(initGallery);
    }
  }, [prevGallery, initGallery]);

  const slideTo = i => setCurrentIndex(i);

  const onSlideChanged = e => setCurrentIndex(e.item);

  const slideNext = () => setCurrentIndex(currentIndex + 1);

  const slidePrev = () => setCurrentIndex(currentIndex - 1);

  const thumbItem = (item, i) => (
    <span
      className={`thumb-wrapper ${currentIndex === i ? "active" : ""}`}
      key={i}
      onClick={() => slideTo(i)}
    >
      <ThumbItem img={item} />
    </span>
  );

  return (
    <div className="container">
      <div className="carousel-wrapper" style={{ position: "relative" }}>
        <AliceCarousel
          items={galleryItems}
          responsive={responsive}
          slideToIndex={currentIndex}
          onSlideChanged={onSlideChanged}
          dotsDisabled={true}
          buttonsDisabled={true}
          mouseDragEnabled={true}
          startIndex={currentIndex}
        />
        <button className="prev-btn" onClick={() => slidePrev()}>
          <FaAngleLeft />
        </button>
        <button className="next-btn" onClick={() => slideNext()}>
          <FaAngleRight />
        </button>
      </div>

      {dots && (
        <ul className="thumb-items d-flex flex-wrap justify-content-center">
          {dots.map(thumbItem)}
        </ul>
      )}
    </div>
  );
};

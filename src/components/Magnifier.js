import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePrev } from "./Hooks";
export const Magnifier = ({ src, controlModule, location, id }) => {
  const [backgroundImg, setBackgroundImg] = useState(`url(${src})`);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  const prevSrc = usePrev(src);

  useEffect(() => {
    if (prevSrc !== src) {
      setBackgroundImg(`url(${src})`);
    }
  }, [prevSrc, src]);

  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <React.Fragment>
      {location !== `/details/id/${id}` ? (
        <Link to={`/details/id/${id}`}>
          <figure
            className="magnifier"
            onMouseMove={handleMouseMove}
            style={{
              backgroundImage: backgroundImg,
              backgroundPosition: backgroundPosition
            }}
            onClick={() => controlModule(false, src)}
          >
            <img className="img-fluid" src={src} alt="product" />
          </figure>
        </Link>
      ) : (
        <figure
          className="magnifier"
          onMouseMove={handleMouseMove}
          style={{
            backgroundImage: backgroundImg,
            backgroundPosition: backgroundPosition
          }}
          onClick={() => controlModule(true, src)}
        >
          <img className="img-fluid" src={src} alt="product" />
        </figure>
      )}
    </React.Fragment>
  );
};

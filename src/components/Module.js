import React, { useState } from "react";

import { useEscape } from "./Hooks";
import { Slider } from "./Slider";
import { ProductDescription } from "./product_details/ProductDescription";
import { Magnifier } from "./Magnifier";
import { DataConsumer } from "./Context";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const test = (e, controlModule) => {
  if (e.target.classList.contains("closes")) {
    controlModule(false);
  }
};

const getProduct = (item, controlModule, location) => {
  return item.imgs.map((img, i) => (
    <Magnifier
      id={item.id}
      location={location}
      src={img}
      key={i}
      controlModule={controlModule}
    />
  ));
};

export const Module = ({ controlModule, src, location }) => {
  const [zoom, setZoom] = useState(false);

  useEscape(() => controlModule(false));

  return (
    <DataConsumer>
      {value => (
        <div className="_module closes" onClick={e => test(e, controlModule)}>
          <button
            className="text-white close-module"
            onClick={() => controlModule(false)}
          >
            <MdClear />
          </button>
          <React.Fragment></React.Fragment>
          {src ? (
            <div className="container closes">
              <div className="img-wrapper closes">
                <div
                  style={{
                    position: "absolute",
                    left: "3px",
                    top: "3px",
                    zIndex: "100"
                  }}
                >
                  {!zoom ? (
                    <button
                      className="text-uppercase btn bg-warning text-light"
                      onClick={() => setZoom(!zoom)}
                    >
                      zoom-in <FaSearchPlus />
                    </button>
                  ) : (
                    <button
                      className="text-uppercase btn bg-warning text-light"
                      onClick={() => setZoom(!zoom)}
                    >
                      zoom-out <FaSearchMinus />
                    </button>
                  )}
                </div>
                <img
                  onClick={() => setZoom(!zoom)}
                  className="img-fluid module-content"
                  src={src}
                  alt="product"
                  style={
                    zoom
                      ? {
                          transform: "scale(1.3)",
                          transformOrigin: "top",
                          cursor: "zoom-out"
                        }
                      : { cursor: "zoom-in" }
                  }
                />
              </div>
            </div>
          ) : (
            <div
              className="container py-5"
              style={{ background: "rgb(255, 255, 255)" }}
            >
              <div className="row">
                <div className="col-lg-3 col-12 text-center preview">
                  {value.quickView && (
                    <Slider
                      initGallery={getProduct(
                        value.getItem(value.quickView),
                        controlModule,
                        location
                      )}
                      dots={value.getItem(value.quickView).imgs}
                    />
                  )}
                </div>
                <div className="col-lg-9 col-12">
                  {value.quickView && (
                    <ProductDescription
                      {...value.getItem(value.quickView)}
                      cart={value.cart}
                      addToCart={value.addToCart}
                      getFromCart={value.getFromCart}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </DataConsumer>
  );
};

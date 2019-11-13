import React from "react";
import { useTitle } from "../Hooks";
import { Header } from "./Header";
import { About } from "./About";
import { Title } from "../Title";
import { Slider } from "../Slider";
import { Ad } from "../Ad";
import { SlideProduct } from "../SlideProduct";
import { LoadingSpinner } from "../Loading";
import { DataConsumer } from "../Context";

const responsive = {
  768: { items: 2 },
  1024: { items: 4 }
};

const getProducts = (
  items,
  cart,
  addToCart,
  getFromCart,
  addToQuickView,
  controlModule
) => {
  return items.map((item, i) => (
    <SlideProduct
      key={i}
      {...item}
      cart={cart}
      controlModule={controlModule}
      addToCart={addToCart}
      addToQuickView={addToQuickView}
      getFromCart={getFromCart}
    />
  ));
};

export const Home = ({ controlModule }) => {
  useTitle();

  return (
    <DataConsumer>
      {value => (
        <React.Fragment>
          <Header />
          {/* ---Offers Section--- */}
          <Title value="Offers" />
          {value.products.length ? (
            <Slider
              initGallery={getProducts(
                value.products,
                value.cart,
                value.addToCart,
                value.getFromCart,
                value.addToQuickView,
                controlModule
              )}
              initResponsive={responsive}
            />
          ) : (
            <LoadingSpinner />
          )}
          {/* ---Recommended Section--- */}
          <Title value="recommended" />
          {value.products.length ? (
            <Slider
              initGallery={getProducts(
                value.products,
                value.cart,
                value.addToCart,
                value.getFromCart,
                value.addToQuickView,
                controlModule
              )}
              initResponsive={responsive}
            />
          ) : (
            <LoadingSpinner />
          )}
          <Ad />
          <Title value="about" />
          <About />
        </React.Fragment>
      )}
    </DataConsumer>
  );
};

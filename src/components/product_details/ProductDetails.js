import React from "react";
import { useTitle } from "../Hooks";
import { Slider } from "../Slider";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Title } from "../Title";
import { SlideProduct } from "../SlideProduct";
import { ProductDescription } from "./ProductDescription";
import { Magnifier } from "../Magnifier";
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

// match.params.id
const getProduct = (item, controlModule, location) => {
  return item.imgs.map((img, i) => (
    <Magnifier
      id={item.id}
      src={img}
      key={i}
      controlModule={controlModule}
      location={location}
    />
  ));
};

export const ProductDetails = ({ controlModule, match }) => {
  useTitle("Product Details");

  return (
    <DataConsumer>
      {value => (
        <div className="container py-5">
          {value.products.length ? (
            <React.Fragment>
              <div className="row">
                <div className="col-lg-4 col-12 text-center preview">
                  <Slider
                    initGallery={getProduct(
                      value.getItem(match.params.id),
                      controlModule,
                      match.url
                    )}
                    dots={value.getItem(match.params.id).imgs}
                  />
                </div>

                <div className="col-lg-8 col-12">
                  <ProductDescription
                    {...value.getItem(match.params.id)}
                    cart={value.cart}
                    addToCart={value.addToCart}
                    getFromCart={value.getFromCart}
                    location={match.url}
                  />
                </div>

                <div className="col-12 tabs-wrapper mt-5">
                  <Tabs defaultActiveKey="details" id="noanim-tab-example">
                    <Tab eventKey="details" title="Details">
                      Dolore eu feugiat nulla facilisis at vero eros et accumsan
                      et iusto odio dignissim qui blandit praesent luptatum
                      zzril delenit augue duis dolore te feugait nulla facilisi.
                      Nam liber tempor cum soluta nobis eleifend option into
                      nihil imperdiet doming id quod mazim placerat facer possim
                      assum est notare.
                    </Tab>
                    <Tab eventKey="more_information" title="More Information">
                      asd
                    </Tab>
                    <Tab eventKey="reviews" title="Reviews">
                      sdfgreqid quod mazim placerat facer possim assum est
                      notare.
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <LoadingSpinner />
          )}
          <div className="row">
            <section className="col-12">
              <Title value="related products" />
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
            </section>
          </div>
          {/* --- row --- */}
        </div>
      )}
    </DataConsumer>
  );
};

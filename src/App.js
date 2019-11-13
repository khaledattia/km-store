import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/home/Home";
import { ProductDetails } from "./components/product_details/ProductDetails";
import { Module } from "./components/Module";
import { Cart } from "./components/cart/Cart";

function App(props) {
  const [module, setModule] = useState(false);
  const [src, setSrc] = useState(null);

  const controlModule = (bool, src = null) => {
    setModule(bool);
    setSrc(src);
    document.querySelector("body").style.overflow = bool ? "hidden" : "auto";
  };

  return (
    <React.Fragment>
      {module && (
        <Module
          location={props.match.params["0"]}
          controlModule={controlModule}
          src={src}
        />
      )}
      <Navigation />
      <Switch>
        <Route
          path="/"
          render={props => <Home {...props} controlModule={controlModule} />}
          exact
        />
        <Route
          path="/details/id/:id"
          render={props => (
            <ProductDetails {...props} controlModule={controlModule} />
          )}
          exact
        />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </React.Fragment>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DataProvider } from "./components/Context";
import ScrollToTop from "./components/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <DataProvider>
    <Router>
      <ScrollToTop>
        <Route path="*" render={props => <App {...props} />} />
      </ScrollToTop>
    </Router>
  </DataProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";

export const Title = ({ value = "headline" }) => (
  <h3 className="title text-capitalize text-center pt-5 pb-3">
    <span className="value-wrapper">{value}</span>
  </h3>
);

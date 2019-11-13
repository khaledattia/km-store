import React, { useState } from "react";
import { LoadingSpinner } from "../Loading";
export const ThumbItem = ({ img }) => {
  const [isLoading, setIsLoading] = useState(true);

  const imgLoading = e => {
    setIsLoading(false);
    console.log("img loaded");
  };

  return (
    <div className={`thumb-item mr-2 mb-2 ${isLoading ? "img-loading" : ""}`}>
      {isLoading ? <LoadingSpinner /> : ""}
      <img className="img-fluid" src={img} onLoad={imgLoading} alt="product" />
    </div>
  );
};

import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

export const LoadingGrow = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 4) {
      setTimeout(() => setCount(count + 1), 700);
    } else if (count > 3) {
      setCount(0);
    }
  }, [count, setCount]);

  return (
    <div className=" d-flex align-items-center justify-content-center">
      <Spinner animation="grow" />
      <span>
        Loading
        {count
          ? count === 1
            ? " ."
            : count === 2
            ? " . ."
            : count === 3
            ? " . . ."
            : ""
          : ""}
      </span>
    </div>
  );
};

export const LoadingSpinner = ({ color = "warning" }) => (
  <div className="Spinner d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant={color} />
  </div>
);

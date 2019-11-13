import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Qty } from "./Qty";

export const ProductDescription = ({
  id,
  title,
  description,
  reviews,
  price,
  max,
  min,
  discount,
  addToCart,
  getFromCart,
  location
}) => {
  return (
    <div className="row">
      <div className="col-12 col-lg-10 ml-lg-auto">
        <h5 className="product-title text-capitalize mb-1">
          {location !== `/details/id/${id}` ? (
            <Link className="closes" to={`/details/id/${id}`}>
              {title}
            </Link>
          ) : (
            `${title}`
          )}
        </h5>

        <div className="d-flex flex-wrap mb-1">
          <div className="mr-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className="mr-1 text-capitalize">{reviews.length} Review</div>
          <div className="mr-1">|</div>
          <div className="mr-1 text-capitalize">add your review</div>
        </div>

        <div className="text-uppercase mb-5">
          {discount ? <del className="text-danger mr-2">{price}EGP</del> : null}
          <span className="h5">{price - discount * price}EGP</span>
        </div>

        <div className="mb-4 text-justify text-sm-left">{description}</div>

        <div className="d-flex flex-wrap justify-content-lg-start justify-content-center align-items-center product-actions">
          {id && (
            <Qty
              id={id}
              max={max}
              min={min}
              location={location}
              addToCart={addToCart}
              getFromCart={getFromCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

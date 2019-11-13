import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaCartPlus,
  FaStar,
  FaStarHalf,
  FaCartArrowDown
} from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { LoadingSpinner } from "./Loading";

export const SlideProduct = ({
  id,
  title,
  price,
  imgs,
  discount,
  cart,
  controlModule,
  addToQuickView,
  addToCart,
  getFromCart
}) => {
  const [isImgLoading, setImageLoading] = useState(true);
  const loading = e => {
    setImageLoading(false);
  };

  return (
    <div
      className={`${
        getFromCart(id) ? "in-cart-border" : ""
      } carousel-product m-auto`}
    >
      <Link to={`/details/id/${id}`}>
        <div
          className={`position-relative ${isImgLoading ? "img-loading" : ""}`}
        >
          {discount ? (
            <span className="discount-badge badge">-{discount * 100}%</span>
          ) : null}
          <div className="module w-100 h-100">
            <button
              className="text-capitalize py-1 px-3 text-center"
              onClick={e => {
                e.preventDefault();
                addToQuickView(id);
                controlModule(true);
              }}
            >
              quick view
            </button>

            <div className="d-flex">
              <span className="trnasition-up">
                {(!cart.length || cart.length) && (
                  <span
                    className={`${getFromCart(id) ? "in-cart" : ""} icon`}
                    onClick={e => {
                      e.preventDefault();
                      addToCart(id);
                    }}
                  >
                    {getFromCart(id) ? <FaCartArrowDown /> : <FaCartPlus />}
                  </span>
                )}
              </span>

              <span className="trnasition-up">
                <span className="icon mx-4">
                  <FaHeart />
                </span>
              </span>

              <span className="trnasition-up">
                <span className="icon">
                  <MdCompareArrows />
                </span>
              </span>
            </div>
          </div>
          {isImgLoading ? <LoadingSpinner color="danger" /> : ""}
          <img
            className="img-fluid"
            src={imgs[0]}
            alt="product"
            onLoad={loading}
          />
        </div>
        <div>
          <h6 className="product-caption text-capitalize mt-2 mb-0">{title}</h6>

          <div style={{ color: "#f29f05" }}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div>
            {discount ? (
              <del className="text-danger mr-1">{price}EGP</del>
            ) : null}
            {price - price * discount}EGP
          </div>
        </div>
      </Link>
    </div>
  );
};

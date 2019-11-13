import React from "react";
import { Qty } from "../product_details/Qty";
import { GoTrashcan } from "react-icons/go";
import { Link } from "react-router-dom";

export const ItemInCart = ({
  location,
  id,
  max,
  min,
  title,
  discount,
  price,
  imgs,
  qty,
  total,
  removeFromCart,
  decreaseQty,
  increaseQty,
  handleInputQty
}) => (
  <div className="item p-4 border mb-3">
    <div className="d-flex">
      <div className="mr-4">
        <div className="img-item-incart" style={{ maxWidth: "6rem" }}>
          <Link to={`/details/id/${id}`}>
            <img className="img-fluid" src={imgs[0]} alt="product" />
          </Link>
        </div>
      </div>

      <div className="item-details">
        <div className="mb-1">
          <Link to={`/details/id/${id}`}>{title}</Link>
        </div>
        <div className="mb-3">
          {discount ? <del className="text-danger">{price}EGP</del> : null}{" "}
          {price - price * discount}EGP
        </div>
        <div className="product-actions">
          <Qty
            id={id}
            min={min}
            max={max}
            location={location.pathname}
            qty={qty}
            decreaseQty={decreaseQty}
            increaseQty={increaseQty}
            handleInputQty={handleInputQty}
          />
        </div>
      </div>
    </div>

    <hr />

    <div className="d-flex align-items-center">
      <div className="text-uppercase flex-grow-1">total: {total}EGP</div>
      <button
        className="trash-icon"
        style={{ background: "none", border: "none" }}
        onClick={e => removeFromCart(id)}
      >
        <GoTrashcan />
      </button>
    </div>
  </div>
);

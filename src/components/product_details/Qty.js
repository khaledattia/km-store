import React, { useState, useEffect } from "react";
import { usePrev } from "../Hooks";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

export const Qty = ({
  id,
  max,
  min,
  location,
  addToCart,
  getFromCart,
  decreaseQty,
  increaseQty,
  handleInputQty,
  qty = 0
}) => {
  const [count, setCount] = useState(min);
  const prevId = usePrev(id);

  useEffect(() => {
    if (prevId !== id) {
      setCount(min);
    }
  }, [prevId, id, min]);

  const handleInput = e => {
    if (isNaN(e.target.value)) {
      return false;
    }

    let tempCount = parseInt(e.target.value);
    if (tempCount > max) {
      setCount(max);
      e.target.setSelectionRange(0, e.target.value.length);

      return true;
    } else if (tempCount < min) {
      setCount(min);
      e.target.setSelectionRange(0, e.target.value.length);

      return true;
    }

    setCount(tempCount);
    e.target.setSelectionRange(0, e.target.value.length);
  };

  const increase = e => {
    let tempCount = count + 1;

    if (tempCount > max) {
      setCount(max);
      return true;
    }

    setCount(tempCount);
  };

  const decrease = () => {
    let tempCount = count - 1;

    if (tempCount < min) {
      setCount(min);
      return true;
    }

    setCount(tempCount);
  };

  return (
    <React.Fragment>
      <div className="mr-3 mb-2 mb-sm-0 d-flex align-items-center">
        <span className="text-capitalize">qty</span>
        <input
          className="mx-2 text-center"
          type="text"
          value={location !== "/cart" ? count : qty}
          onChange={e =>
            location !== "/cart" ? handleInput(e) : handleInputQty(id, e)
          }
          onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
        />
        <div>
          <button
            className="increase-qty d-flex justify-content-center align-items-center rounded-circle mb-2"
            onClick={e => (location !== "/cart" ? increase() : increaseQty(id))}
          >
            +
          </button>
          <button
            className="decrease-qty d-flex justify-content-center align-items-center rounded-circle"
            onClick={e => (location !== "/cart" ? decrease() : decreaseQty(id))}
          >
            -
          </button>
        </div>
      </div>

      {/* -- remove "Add", "Save for later" and "Compare" btns from cart page -- */}
      {location !== "/cart" ? (
        <div className="d-flex">
          <button
            className={`${getFromCart(id) &&
              "in-cart"} add-btn d-flex justify-content-center align-items-center text-capitalize`}
            onClick={e => addToCart(id, count)}
            disabled={getFromCart(id) ? true : false}
          >
            {!getFromCart(id) ? (
              <span>
                Add to cart <FaCartPlus />
              </span>
            ) : (
              <span className="mr-1 text-capitalize">in cart</span>
            )}
          </button>
          <button className="mx-3 p-3 d-flex justify-content-center align-items-center">
            <FaHeart />
          </button>
          <button className="p-3 d-flex justify-content-center align-items-center">
            <MdCompareArrows />
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

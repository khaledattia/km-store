import React from "react";
import { useTitle } from "../Hooks";
import { ItemInCart } from "./ItemInCart";
import { DataConsumer } from "../Context";
import { LoadingGrow } from "../Loading";

export const Cart = ({ location }) => {
  useTitle("Cart & Wish List");

  return (
    <DataConsumer>
      {value =>
        value.cart.length ? (
          <div className="text-capitalize pt-5">
            <div className="container">
              {value.products.length ? (
                <div className="row">
                  <div className="items col-md-5 col-10 mx-auto">
                    {value.cart.map(item => (
                      <ItemInCart
                        key={item.id}
                        {...item}
                        {...value.getItem(item.id)}
                        location={location}
                        removeFromCart={value.removeFromCart}
                        decreaseQty={value.decreaseQty}
                        increaseQty={value.increaseQty}
                        handleInputQty={value.handleInputQty}
                      />
                    ))}
                  </div>

                  <div className="col-md-7 col-12">
                    <div
                      className="checkout border p-4 ml-md-auto mx-auto"
                      style={{ maxWidth: "350px" }}
                    >
                      <div className="p-3 border mb-3">
                        <div className="text-capitalize">total:</div>
                        <h4 className="my-0">{value.total}EGP</h4>
                      </div>

                      <button className="text-capitalize text-center text-white p-2 btn-warning btn w-100">
                        proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <LoadingGrow />
              )}
            </div>
          </div>
        ) : (
          <div className="text-capitalize text-center py-5">
            The Cart is empty
          </div>
        )
      }
    </DataConsumer>
  );
};

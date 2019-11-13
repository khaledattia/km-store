import React from "react";
import { Link } from "react-router-dom";
import { FaHandshake, FaSyncAlt, FaHandHoldingUsd } from "react-icons/fa";
import { MdSearch, MdArrowDropUp, MdDehaze } from "react-icons/md";
import { Logo } from "./Logo";
import { CartIcon } from "./CartIcon";
import { DataConsumer } from "./Context";

export const Navigation = () => (
  <nav>
    {/* ---------- top --------- */}
    <div className="nav-top py-1 d-none d-md-block">
      <div className="container-fluid d-flex">
        <div className="flex-grow-1">
          <span className="mr-2">
            <FaHandshake />
            <span className="text-capitalize ml-1">daily deals</span>
          </span>

          <span className="mr-2">
            <FaSyncAlt />

            <span className="text-capitalize ml-1">free return</span>
          </span>

          <span className="mr-2">
            <FaHandHoldingUsd />
            <span className="text-capitalize ml-1">cash on delivery</span>
          </span>
        </div>

        <div>
          <span className="mr-3 text-capitalize">login</span>
          <span
            className="text-capitalize"
            style={{ backgroundColor: "#001623", padding: "3px 11px" }}
          >
            sign up
          </span>
        </div>
      </div>
    </div>
    {/* ---------- middle --------- */}
    <div className="nav-middle py-2 py-md-3">
      <div className="container d-flex align-items-center">
        <div>
          <div className="d-flex">
            <button className="mr-2 d-flex burger-menu d-md-none">
              <MdDehaze />
            </button>

            <div className="logo">
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </div>
        </div>

        <div className="forum-serch-wrapper flex-grow-1 d-none d-md-block">
          <form>
            <div className="search-input m-auto">
              <input type="text" className="w-100" />

              <button>
                <MdSearch />
              </button>
            </div>
          </form>
        </div>

        <div className=" flex-grow-1 d-block d-md-none text-right xs-srch-btn">
          <button>
            <MdSearch />
          </button>

          <div className="d-flex drop-up-arrow">
            <MdArrowDropUp />
          </div>
        </div>

        <div className="cart d-flex">
          <span className="d-none d-md-block" style={{ fontSize: ".7rem" }}>
            <div className="text-capitalize">call us now</div>
            <div>+201115869958</div>
          </span>

          <span
            className="mx-3"
            style={{ border: ".5px solid #000", height: "2rem" }}
          ></span>
          <DataConsumer>
            {value => (
              <Link to="/cart">
                <span style={{ position: "relative" }}>
                  <span className="badge items-in-cart d-flex justify-content-center align-items-center">
                    {value.cart.length < 10 ? value.cart.length : "+9"}
                  </span>
                  <CartIcon />
                </span>
              </Link>
            )}
          </DataConsumer>
        </div>
      </div>
    </div>
    {/* ---------- bottom --------- */}
    <div className="nav-bottom py-1">
      <div className="container">
        <ul className="d-flex list-unstyled">
          <li className="mr-2 text-capitalize">All Categories</li>
          <li className="mr-2 text-capitalize">New Arrival</li>
          <li className="mr-2 text-capitalize">Offers</li>
          <li className="mr-2 text-capitalize">Pages</li>
        </ul>

        <div className="forum flex-grow-1 d-block d-md-none">
          <div className="search-input m-auto">
            <input type="text" className="w-100" />

            <button>
              <MdSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

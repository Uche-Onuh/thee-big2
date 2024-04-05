import React, { useEffect } from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import Tr from "../components/UI/Tr";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title={"Cart"}>
      <CommonSection title={"Shopping Cart"} />
      <section>
        <div className="wrap">
          <Row>
            <Col lg="9" className="cart__scroll">
              {cartItems.length === 0 ? (
                <h2>No items in your cart</h2>
              ) : (
                <table className="table bordered" sx={{ overflowX: "scroll" }}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center gap-3">
                  Subtotal:
                  <span className="fs-1 fw-bold">
                    NGN {totalAmount.toLocaleString()}
                  </span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                Vat and shipping fee will be calculated at checkout
              </p>
              <div>
                <button
                  className="shop__btn w-100 cart__shop-btn"
                  onClick={() => navigate("/checkout")}
                  disabled={totalAmount === 0 ? true : false}
                >
                  Checkout
                </button>
                <button
                  className="shop__btn w-100 mt-3 cart__shop-btn"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Helmet>
  );
};

export default Cart;

import React, { useState } from "react";
import { Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatAmount } from "../constants/helperFunction";

import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";

import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pCode, setPCode] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const sendOrder = async () => {
    const orderData = {
      name,
      email,
      number,
      address,
      city,
      pCode,
      state,
      totalAmount,
      paymentId: "",
      orderStatus: "pending",
      orderItems: cartItems,
    };
    setLoading(true);

    try {
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      toast.success("Order made, redirecting to payment page");

      // Get the order ID from the document reference
      const orderId = orderRef.id;

      // Dispatch the clearCart action after a successful order
      dispatch(cartActions.clearCart());
      setLoading(false);

      // Navigate to the payment page with the order ID
      setTimeout(() => {
        navigate(`/payment/${orderId}`);
      }, [3000]);
    } catch (err) {
      toast.error(`Error making order: ${err.message}`);
      setLoading(false);
    } finally {
      setName("");
      setEmail("");
      setNumber("");
      setAddress("");
      setCity("");
      setPCode("");
      setState("");
    }

    // console.log(orderData);
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <div className="wrap">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row className="checkout__container">
              <Col lg="8">
                <h6 className="mb-4 fw-bold fs-1">Billing Information</h6>
                <Form className="billing__form">
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Phone number"
                      value={number}
                      required
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Street address"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={pCode}
                      required
                      onChange={(e) => setPCode(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </Col>

              <Col lg="4">
                <div className="checkout__cart">
                  <h6>
                    Total Qty : <span>{totalQty} items</span>
                  </h6>
                  <h6>
                    Subtotal :<span>NGN {formatAmount(totalAmount)}</span>
                  </h6>
                  <h6>
                    <span>
                      Shipping : <br />
                      free shipping
                    </span>
                    <span>NGN 0</span>
                  </h6>
                  <h6></h6>
                  <h4>
                    Total Cost : <span>NGN {formatAmount(totalAmount)}</span>
                  </h4>
                  <button
                    className="order__btn shop__btn  auth__btn w-100 cart__shop-btn"
                    onClick={sendOrder}
                  >
                    Place Order
                  </button>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </section>
    </Helmet>
  );
};

export default Checkout;

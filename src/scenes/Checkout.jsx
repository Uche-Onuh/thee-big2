import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/checkout.css";
import { useSelector } from "react-redux";

import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

const Checkout = () => {
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
      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order made");
      setLoading(false);
    } catch (err) {
      toast.error("Error making order");
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
        <Container>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row>
              <Col lg="8">
                <h6 className="mb-4 fw-bold">Billing Information</h6>
                <Form className="billing__form">
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Phone number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Street address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={pCode}
                      onChange={(e) => setPCode(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
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
                    Subtotal :
                    <span>NGN {Intl.NumberFormat().format(totalAmount)}</span>
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
                    Total Cost :{" "}
                    <span>NGN {Intl.NumberFormat().format(totalAmount)}</span>
                  </h4>
                  <button
                    className="shop__btn order__btn auth__btn w-100"
                    onClick={sendOrder}
                  >
                    Place Order
                  </button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;

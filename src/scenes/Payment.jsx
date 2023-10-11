import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import "../styles/payment.css";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { pay } from "../assets/images";

const apiKey = process.env.REACT_APP_PAYSTACK_API_KEY;

const Payment = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const docRef = doc(db, "orders", id);

  useEffect(() => {
    try {
      const getOrder = async () => {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder(docSnap.data());
          setLoading(false);
        } else {
          console.log("No order found");
        }
      };
      getOrder();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const config = {
    reference: new Date().getTime().toString(),
    email: order && order.email,
    name: order && order.name,
    amount: order && order.totalAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: apiKey,
  };

  const handlePaystackSuccessAction = async (reference) => {
    try {
      // Update the order in the database with the paymentId
      const orderRef = doc(db, "orders", id);

      await updateDoc(orderRef, { paymentId: reference.reference });

      setOrder((prevOrder) => ({
        ...prevOrder,
        paymentId: reference.reference,
      }));

      // Send receipt email with order items
      await sendReceiptEmail(order.orderItems); // Assuming order.items is an array of order items

      toast.success("Payment successful");

      // redirect
      setTimeout(() => {
        navigate("/");
      }, [3000]);
    } catch (error) {
      toast.error("Error updating order:", error);
    }
  };

  const sendReceiptEmail = async (orderItems) => {
    try {
      // Make an HTTP request to your server endpoint for sending receipt emails
      const response = await fetch("http://localhost:3000/send-receipt-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: id,
          userEmail: order.email,
          orderItems: orderItems,
          totalAmount: order.totalAmount,
          // Add any other relevant data needed for sending the receipt email
        }),
      });

      if (!response.ok) {
        console.error("Failed to send receipt email");
      } else {
        console.log("Receipt email sent successfully");
      }
    } catch (error) {
      console.error("Error sending receipt email:", error);
    }
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay Now",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <Helmet title="Payment">
      <CommonSection title="Payment" />

      <section>
        <Container>
          <Row>
            <Col lg="6">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="payment__container w-full">
                  <div>
                    <p>
                      Order name: <span>{order.name}</span>
                    </p>
                    <p>
                      Order email: <span>{order.email}</span>
                    </p>
                    <p>
                      Order contact number: <span>{order.number}</span>
                    </p>
                    <p>
                      Order id: <span>#{id}</span>
                    </p>
                    <p>
                      Total Price:{" "}
                      <span>
                        NGN {Intl.NumberFormat().format(order.totalAmount)}
                      </span>
                    </p>

                    <PaystackButton {...componentProps} className="shop__btn" />
                  </div>
                </div>
              )}
            </Col>
            <Col lg="6">
              <img src={pay} alt="pay illustration" height={"100%"}/>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Payment;

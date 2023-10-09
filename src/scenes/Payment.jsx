import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Payment = () => {
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
  console.log(order);

  return (
    <Helmet title="Payment">
      <CommonSection title="Payment" />

      <section>
        <Container>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Payment;

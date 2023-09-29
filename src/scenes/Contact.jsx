import React, { useEffect } from "react";
import "../styles/contact.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Helmet title="Contact us">
      <CommonSection title="Contact Us" />
      <section>
        <Container>
            <Row>
                <Col lg="12">
                    
                </Col>
            </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;

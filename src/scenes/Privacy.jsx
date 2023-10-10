import React, { useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/privacy.css";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="Terms of Service">
      <CommonSection title="Terms of Service" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="terms__box">
                <h2 className="mb-3">SHIPPING AND RETURNS</h2>
                <div className="terms">
                  <h5 className="mb-2">Domestic Shipping</h5>
                  <ul>
                    <li>
                      Delivery within Lagos takes 1-3 working days while
                      deliveries outside Lagos but within Nigeria take 3-5
                      working days.
                    </li>
                    <li>
                      All deliveries are sent by a third-party channel and are
                      weighed, the flat rate charge does not apply if the item
                      ordered is over 3kg. kindly speak to our customer care for
                      better clarification.
                    </li>
                  </ul>
                </div>

                <div className="terms">
                  <h5 className="mb-2">International Shipping</h5>
                  <ul>
                    <li>
                      All deliveries are sent by a third-party channel and are
                      weighed, the flat rate charge does not apply if the item
                      ordered is over 3kg. kindly speak to our customer care for
                      better clarification
                    </li>
                    <li>
                      Delivery time for international orders is 5-7 working days
                      after orders have been placed. All orders are trackable.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="terms__box">
                <h2 className="mb-3">RETURN POLICY</h2>
                <h5 className="mb-2">
                  Item(s) are subject to RETURN/EXCHANGE/REFUND if we receive
                  the item(s) within.
                </h5>
                <div className="terms">
                  <h5 className="mb-2">Timeline</h5>
                  <ul>
                    <li>
                      3 business days from date of delivery for orders placed
                      within Lagos
                    </li>
                    <li>
                      5 business days from date of delivery for orders placed
                      within Nigeria but outside Lagos
                    </li>
                    <li>
                      10 business days from date of delivery for orders placed
                      outside Nigeria
                    </li>
                    <li>
                      Items must be physically in our possession to qualify for
                      a refund. There will be no exceptions to this.
                    </li>
                  </ul>
                </div>

                <div className="terms">
                  <h5 className="mb-2">Exceptions</h5>
                  <ul>
                    <li>
                      Items purchased/picked up and fitted in the store cannot
                      be returned/exchanged/refunded.
                    </li>
                  </ul>
                </div>

                <div className="terms">
                  <h5 className="mb-2">Charges</h5>
                  <ul>
                    <li>
                      Customers is responsible for the cost of sending the
                      item(s) back to Us. For customers within Lagos, a pickup
                      service can be made available at a cost. The cost will be
                      same as the initial delivery price of the item(s)
                    </li>
                    <li>
                      Refunds are issued minus the cost of shipping via the same
                      channel used in the initial payment e.g Bank Transfer,
                      Paystack etc.
                    </li>
                  </ul>
                </div>

                <div className="terms">
                  <h5 className="mb-2">Product Condition</h5>
                  <ul>
                    <li>
                      All products must be returned unworn, undamaged,free from
                      blemishes and in the original packaging to qualify for
                      refund or exchange
                    </li>
                    <li>
                      In a case of the item(s) received damaged, a refund or
                      exchange will not be possible regardless of circumstances.
                      The customer will be responsible for any shipping cost
                      assocated with sending it back to them
                    </li>
                    <li>
                      Sales items or items bought with a discount code will not
                      be eligible for refund or exchange regardless of
                      circumstance. Only fully priced items qualify for refund
                      or exchange
                    </li>
                    <li>
                      In the case of exchange, the customer is required to pay
                      for any delivery fee required
                    </li>
                    <li>
                      The re-delivery fee will be the same cost as the initial
                      delivery fee
                    </li>
                    <li>
                      Once item(s) have been recieved by us, an exchange will be
                      shipped within 48hrs or a refund issued within 1-3
                      business days as the case may be
                    </li>
                    <li>
                      Finally, for a swift and seemless process, kindly make
                      sure that your return meets the above terms and
                      conditions.
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Privacy;

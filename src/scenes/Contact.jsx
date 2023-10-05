import React, { useEffect, useState } from "react";
import "../styles/contact.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);

    const messageData = {
      name,
      email,
      subject,
      message,
    };

    console.log(messageData);
  };

  return (
    <Helmet title="Contact us">
      <CommonSection title="Contact Us" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.862294462641!2d3.402277275729493!3d6.539068622980685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d3bf476106f%3A0x9decceed9082c911!2s16%20Oloruntoyin%20St%2C%20Oworosoki%20105102%2C%20Lagos!5e0!3m2!1sen!2sng!4v1696500189363!5m2!1sen!2sng"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="mb-4">
                <h2>Need some help?</h2>
                <p>
                  We are here to help and will respond to all enquiries in a
                  timely manner. Whether you have questions, need assistance
                  with orders, or require further information, please don't
                  hesitate to reach out.
                </p>
              </div>

              <Form onSubmit={sendMessage}>
                <div className="mb-4 d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-50 form__unset">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group w-50 form__unset">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                </div>
                <div className="mb-4 ">
                  <FormGroup className="form__group form__unset">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Enter your subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </FormGroup>
                </div>
                <div className="mb-2">
                  <FormGroup className="form__group form__unset">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows="7"
                      placeholder="Enter your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </FormGroup>
                </div>

                <button className="shop__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;

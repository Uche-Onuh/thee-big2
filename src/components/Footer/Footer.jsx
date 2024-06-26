import React from "react";
import "./footer.css";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { logowhite } from "../../assets/images";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div className="logo">
              <img src={logowhite} alt="logo" />
              <div>
                <h1 className="text-white">T H E E B I G</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              Elevate your style with T H E E B I G, where fashion meets comfort
              and elegance. Explore our handcrafted clothing and selection of
              quality footwears that redefine your wardrobe essentials.
            </p>
          </Col>
          <Col lg="3" className="mb-4" md="3">
            <div className="footer__quick-links">
              <h4 className="quick_links-title">Top Categories</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link>T-Shirts</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link>Face Caps</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link>Two piece</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link>Cargo pants</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" className="mb-4" md="3">
            <div className="footer__quick-links">
              <h4 className="quick_links-title">Useful Links</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/contact">Contact</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/terms-of-service">Terms of Service</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="4">
            <div className="footer__quick-links">
              <h4 className="quick_links-title">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>16, Oloruntoyin Street, Lagos, Nigeria</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <Link to="tel:0909090909">0909090909</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <Link to="mailto:onuhblaze@gmail.com">
                    onuhblaze@gmail.com
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
        </Row>

        <Row className="socials">
          <Col lg="6" className="footer__social-media">
            <Link
              to="https://instagram.com/theebigway.ng?igshid=MzRlODBiNWFlZA=="
              target="_blank"
            >
              <i className="ri-instagram-fill"></i>
            </Link>
            <Link to="https://twitter.com/" target="_blank">
              <i className="ri-twitter-fill"></i>
            </Link>
            <Link to="https://www.facebook.com/" target="_blank">
              <i className="ri-facebook-fill"></i>
            </Link>
            <Link
              to="https://wa.me/+2349060518086?text=From%20the%20big%20website"
              target="_blank"
            >
              <i className="ri-whatsapp-fill"></i>
            </Link>
          </Col>

          <Col lg="6">
            <p className="footer__copyright">
              Copyright {year} developed by{" "}
              <Link to="https://onuhuche.netlify.app/" target="_blank">
                Onuh Uche
              </Link>
              . All rights reserved
            </p>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Row, Col } from "reactstrap";
import { hero, counter } from "../assets/images";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/UI/ProductList";
import Clock from "../components/UI/Clock";
import { motion } from "framer-motion";
import useGetdata from "../hooks/useGetdata";
import CardSkeleton from "../components/UI/CardSkeleton";

const Home = () => {
  const { data: products, loading } = useGetdata("products");

  const [product, setProduct] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [wireless, setWireless] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter(
      (item) => item.category === "tshirt"
    );

    const filteredNewArrivals = products.filter(
      (item) => item.category === "cargo"
    );

    const filteredWireless = products.filter(
      (item) => item.category === "2piece"
    );

    const filteredBestSelling = products.filter(
      (item) => item.category === "caps"
    );

    setProduct(filteredProducts);
    setBestSelling(filteredBestSelling);
    setNewArrival(filteredNewArrivals);
    setWireless(filteredWireless);
  }, [products]);

  const navigate = useNavigate();
  return (
    <Helmet title="Elevate Your style">
      <section className="hero__section">
        <Row className="hero">
          <Col lg="12" md="12">
            <div className="hero__content">
              <h1>Elevate Your Style</h1>
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="shop__btn"
                onClick={() => navigate("/shop")}
              >
                SHOP NOW
              </motion.button>
            </div>
          </Col>
        </Row>
      </section>

      <section className="new__arrival">
        <div className="wrap">
          <Row>
            <Col lg="12" className="text-left">
              <h2 className="section__title" md="2">
                New Arrivals
              </h2>
            </Col>
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={newArrival} size={8} currentPage={1} />
            )}
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={wireless} size={8} currentPage={1} />
            )}
          </Row>
        </div>
      </section>

      <section>
        <Row className="cta">
          <Col lg="6" className="bespoke">
            <div className="bespoke__content">
              <h1>Order Custom Made Wears</h1>
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="shop__btn cta__btn"
                onClick={() => navigate("/contact")}
              >
                CONTACT US
              </motion.button>
            </div>
          </Col>
          <Col lg="6" className="shop__now">
            <div className="shop__now-content">
              <h1>Browse Our Catalogue</h1>
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="shop__btn cta__btn"
                onClick={() => navigate("/shop")}
              >
                SHOP NOW
              </motion.button>
            </div>
          </Col>
        </Row>
      </section>

      <section className="best__selling">
        <div className="wrap">
          <Row>
            <Col lg="12" className="text-left">
              <h2 className="section__title">Best Selling</h2>
            </Col>
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={bestSelling} size={8} currentPage={1} />
            )}
          </Row>
        </div>
      </section>

      <section className="timer__count">
        <div className="overlay"></div>
        <div className="wrap">
          <Row className="timer__content">
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white  mb-2 ">Holiday Sales</h4>
                <h3 className="text-white  mb-3">Limited Time offer</h3>
              </div>

              <Clock />
            </Col>

            <Col lg="6" md="12" className="text-center counter__img">
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="shop__btn store__btn"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                Visit Store
              </motion.button>
            </Col>
          </Row>
        </div>
      </section>

      <section className="trending__products">
        <div className="wrap">
          <Row>
            <Col lg="12" className="text-left">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={product} size={8} currentPage={1} />
            )}
          </Row>
        </div>
      </section>
    </Helmet>
  );
};

export default Home;

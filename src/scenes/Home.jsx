import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { hero, counter } from "../assets/images";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import Services from "../components/Services/Services";
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

  const year = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <Helmet title="Home">
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending Products in {year}</p>
                <h2>Make your Interior More Minimalist & Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  provident delectus inventore blanditiis rem quia neque
                  reprehenderit sapiente ea deserunt?
                </p>
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="shop__btn"
                  onClick={() => navigate("/shop")}
                >
                  SHOP NOW
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={hero} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={product} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best__selling">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Selling</h2>
            </Col>
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={bestSelling} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Time Offer</h4>
                <h3 className="text-white fs-5 mb-3">Quality Product</h3>
              </div>

              <Clock />

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

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counter} alt="counter " />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrival">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title" md="2">New Arrivals</h2>
            </Col>
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={newArrival} />
            )}
            {loading ? (
              <CardSkeleton cards={4} />
            ) : (
              <ProductList data={wireless} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;

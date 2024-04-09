import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import ProductList from "../components/UI/ProductList";
import DetailSkeleton from "../components/UI/DetailSkeleton";
import { formatAmount } from "../constants/helperFunction";

import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetdata from "../hooks/useGetdata";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("Select Size");
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data: products } = useGetdata("products");

  const docRef = doc(db, "products", id);

  // Function to handle the change in the select element
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  useEffect(() => {
    try {
      const getProduct = async () => {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
          setLoading(false);
        } else {
          console.log("No product found");
        }
      };
      getProduct();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const {
    imgUrl,
    title,
    price,
    // avgRating,
    // reviews,
    description,
    shortDescription,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      author: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    console.log(reviewObj);
    toast.success("Review sent successfully");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName: title,
        price,
        itemSize: selectedSize,
      })
    );

    toast.success("Product added to cart");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <>
      {loading ? (
        <DetailSkeleton />
      ) : (
        <Helmet title={title}>
          <CommonSection title={title} />

          <section className="pt-0">
            <div className="wrap">
              <Row>
                <Col lg="6" className="product__details-img">
                  <img src={imgUrl} alt={title} height="100%" />
                </Col>
                <Col lg="6">
                  <div className="product__details">
                    <h2>{title}</h2>
                    <div className="product__rating d-flex align-items-center gap-5 mb-3">
                      <div>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-half-s-line"></i>
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-5">
                      <span className="product__price">
                        NGN {formatAmount(price)}
                      </span>
                      <span>Category: {category.toUpperCase()}</span>
                    </div>
                    <p className="mt-3">{shortDescription}</p>

                    <div className="d-flex align-items-end gap-5">
                      <motion.button
                        whileTap={{ scale: 1.2 }}
                        className="shop__btn"
                        onClick={addToCart}
                      >
                        Add to Cart
                      </motion.button>

                      <select
                        name="size"
                        id="size"
                        className="size"
                        value={selectedSize}
                        onChange={handleSizeChange}
                      >
                        <option disabled>
                          Select Size
                        </option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          <section>
            <div className="wrap">
              <Row>
                <Col lg="12">
                  <div className="tab__wrapper d-flex align-items-center gap-5">
                    <h6
                      className={`${
                        tab === "description" ? "active__tab" : ""
                      }`}
                      onClick={() => {
                        setTab("description");
                      }}
                    >
                      Description
                    </h6>
                  </div>

                  {tab === "description" ? (
                    <div className="tab__content mt-5">
                      <p>{description}</p>
                    </div>
                  ) : (
                    <div className="product__review mt-5">
                      <div className="review__wrapper">
                        <div className="review__form">
                          <h4>Leave your experience</h4>
                          <form action="" onSubmit={submitHandler}>
                            <div className="form__group">
                              <input
                                type="text"
                                placeholder="Enter your name"
                                required
                                ref={reviewUser}
                              />
                            </div>
                            <div className="form__group d-flex align-items-center gap-5 rating__group">
                              <motion.span
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setRating(1)}
                              >
                                1<i className="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setRating(2)}
                              >
                                2<i className="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setRating(3)}
                              >
                                3<i className="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setRating(4)}
                              >
                                4<i className="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setRating(5)}
                              >
                                5<i className="ri-star-s-fill"></i>
                              </motion.span>
                              <span> : {rating} stars</span>
                            </div>
                            <div className="form__group">
                              <textarea
                                rows={4}
                                type="text"
                                placeholder="Review message..."
                                ref={reviewMsg}
                                required
                              />
                            </div>
                            <motion.button
                              whileTap={{ scale: 1.2 }}
                              className="shop__btn"
                              type="submit"
                            >
                              Submit
                            </motion.button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </Col>

                <Col lg="12">
                  <h2 className="related__title mt-5 mb-3 fs-1">
                    You might also like
                  </h2>
                </Col>

                <ProductList data={relatedProducts} size={8} currentPage={1} />
              </Row>
            </div>
          </section>
        </Helmet>
      )}
    </>
  );
};

export default ProductDetails;

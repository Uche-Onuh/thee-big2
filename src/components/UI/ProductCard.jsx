import React from "react";
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

import { toast } from "react-toastify";

const ProductCard = ({ id, name, category, price, img }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        productName: name,
        price: price,
        image: img,
      })
    );

    toast.success("Product added to cart");
  };

  return (
    <Col lg="3" md="4">
      <div className="product__item">
        <div
          className="product__img"
          onClick={() => {
            navigate(`/shop/${id}`);
          }}
        >
          <motion.img whileHover={{ scale: 0.9 }} src={img} alt="product1" />
        </div>
        <div className="p-2 product__info">
          <h3
            className="product__name"
            onClick={() => {
              navigate(`/shop/${id}`);
            }}
          >
            {name}
          </h3>
          <span>{category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">NGN {price.toLocaleString()}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;

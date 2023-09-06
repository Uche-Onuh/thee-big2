import React from "react";

import { Routes, Route } from "react-router-dom";

import {
  Home,
  Cart,
  Checkout,
  Login,
  ProductDetails,
  Shop,
  SignUp,
} from "../scenes";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;

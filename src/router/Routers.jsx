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
  Contact,
} from "../scenes";
import ProtectedRoute from "./ProtectedRoute";

import { AdminNav, AllProducts, AddProducts, Dashboard } from "../admin";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;

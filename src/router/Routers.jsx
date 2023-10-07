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
  Privacy,
} from "../scenes";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

import {
  AllProducts,
  AddProducts,
  Dashboard,
  Users,
  Orders,
  Enquiries,
  OrderDetail,
} from "../admin";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<Contact />} />
      <Route path="terms-of-service" element={<Privacy />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
      </Route>

      <Route path="/*" element={<AdminProtectedRoute />}>
        <Route path="admin" element={<Dashboard />} />
        <Route path="admin/all-products" element={<AllProducts />} />
        <Route path="admin/add-product" element={<AddProducts />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<Orders />} />
        <Route path="admin/order-details/:id" element={<OrderDetail />} />
        <Route path="admin/enquiries" element={<Enquiries />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;

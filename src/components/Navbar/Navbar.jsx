import React, { useRef, useEffect } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../../constants";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {  Row } from "reactstrap";

import { logo, userIcon } from "../../assets/images";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const Navbar = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = useAuth();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__nav");
      } else {
        headerRef.current.classList.remove("sticky__nav");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__menu");
  };

  const toggleProfileAction = () => {
    profileActionRef.current.classList.toggle("show__profileActions");
  };

  return (
    <header className="header" ref={headerRef}>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>T H E E B I G</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {navLinks.map((link) => (
                  <motion.li
                    whileHover={{ translateY: "-5px", scale: 1.1 }}
                    key={link.id}
                    className="nav__item"
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "nav__active" : ""
                      }
                    >
                      {link.display}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span
                className="cart__icon"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  onClick={toggleProfileAction}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileAction}
                >
                  {currentUser ? (
                    <span onClick={logout}>Log out</span>
                  ) : (
                    <div className="profile__actions-button">
                      <Link to="/signup">Create Account</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
    </header>
  );
};

export default Navbar;

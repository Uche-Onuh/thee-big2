import React, { useRef, useEffect } from "react";
import "./navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../../constants";

import { motion } from "framer-motion";

import { Container, Row } from "reactstrap";

import { logo, userIcon } from "../../assets/images";

const Navbar = () => {
  const location = useLocation();
  const headerRef = useRef(null);

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

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>T H E E B I G</h1>
              </div>
            </div>

            <div className="navigation">
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
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icon">
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">1</span>
              </span>

              <span>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={userIcon}
                  alt="user-icon"
                />
              </span>
            </div>

            <div className="mobile__menu">
              <span>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Navbar;

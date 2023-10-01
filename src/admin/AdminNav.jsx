import React, { useRef } from "react";
import { Container, Row } from "reactstrap";
import useAuth from "../hooks/useAuth";
import "../styles/admin-nav.css";
import { adminNav } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const AdminNav = () => {
  const currentUser = useAuth();
  const profileActionRef = useRef(null);
  const navigate = useNavigate();

  const toggleProfileAction = () => {
    profileActionRef.current.classList.toggle("show__profileActions");
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

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <NavLink to="/">
                  <h2>T H E E B I G</h2>
                </NavLink>
              </div>

              <div className="search__box">
                <input type="text" placeholder="Search...." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <div>
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser && currentUser.photoURL}
                    onClick={toggleProfileAction}
                  />
                  <div
                    className="profile__actions"
                    ref={profileActionRef}
                    onClick={toggleProfileAction}
                  >
                    <span onClick={logout}>Log out</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {adminNav.map((link, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "nav__active" : ""
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;

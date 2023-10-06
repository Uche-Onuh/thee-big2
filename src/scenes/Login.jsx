import React, { useState, useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passIcon, setPassIcon] = useState(false);
  const navigate = useNavigate();

  const passwordRef = useRef(null);

  const showPassword = () => {
    const passwordInput = passwordRef.current;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setPassIcon(true);
    } else {
      passwordInput.type = "password";
      setPassIcon(false);
    }
  };

  const signin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      let user = userCredential.user;

      // Fetch additional user data (e.g., permissions) from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userDocRef);
      const userData = docSnapshot.data();

      user = { ...user, ...userData };
      console.log("User Data after Merge:", user); // Log user object after merge

      setLoading(false);
      toast.success("Succesfully logged in");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <LoadingSpinner />
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>

                <Form className="auth__form" onSubmit={signin}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      required
                      ref={passwordRef}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={showPassword}>
                      {passIcon ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </span>
                  </FormGroup>

                  <button type="submit" className="shop__btn auth__btn ">
                    Login
                  </button>
                  <p>
                    Don't have an accout?{" "}
                    <Link to="/signup">Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;

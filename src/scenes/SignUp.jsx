import React, { useState, useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { userIcon } from "../assets/images";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [passIcon, setPassIcon] = useState(false);
  const [passConfIcon, setPassConfIcon] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();
  const passwordRef = useRef(null);
  const passwordConfRef = useRef(null);

  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordConf !== e.target.value) {
      setErr("Passwords do not match");
    } else {
      setErr("");
    }
  };

  const handlePasswordConfChange = (e) => {
    setPasswordConf(e.target.value);
    if (password !== e.target.value) {
      setErr("Passwords do not match");
    } else {
      setErr("");
    }
  };

  const showPassword = (ref) => {
    const passwordInput = ref.current;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + userName}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress or other snapshot events if needed
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          // Upload completed successfully, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update user profile
            await updateProfile(user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            // store user data in db
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: userName,
              email,
              permissions: 1,
              photoURL: downloadURL,
            });
          });
        }
      );

      // Send welcome email using Express server
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          userName: userName,
        }),
      });

      if (!response.ok) {
        throw new Error("Email sending failed");
      }

      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Create Account">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center ">
                <LoadingSpinner />
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Create Account</h3>
                <Form className="auth__form" onSubmit={signUp}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your user name"
                      value={userName}
                      required
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </FormGroup>
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
                      ref={passwordRef}
                      required
                      onChange={handlePasswordChange}
                    />
                    <span
                      onClick={() => {
                        showPassword(passwordRef);
                        setPassIcon((prev) => !prev);
                      }}
                    >
                      {passIcon ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </span>
                  </FormGroup>
                  {err && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {err}
                    </p>
                  )}
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={passwordConf}
                      ref={passwordConfRef}
                      required
                      onChange={handlePasswordConfChange}
                    />
                    <span
                      onClick={() => {
                        showPassword(passwordConfRef);
                        setPassConfIcon((prev) => !prev);
                      }}
                    >
                      {passConfIcon ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </span>
                  </FormGroup>
                  <FormGroup className="form__group upload_form">
                    <div className="upload">
                      {selectedImage ? (
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="upload"
                        />
                      ) : (
                        <img src={userIcon} alt="upload" />
                      )}
                    </div>
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleImageUpload(e);
                        values.img = e.target.files[0];
                      }}
                    />

                    <button
                      onClick={handleButtonClick}
                      className="upload__btn"
                      // style={{ display: selectedImage ? "none" : "block" }}
                    >
                      <i className="ri-file-upload-line"></i>
                    </button>
                  </FormGroup>

                  <button type="submit" className="shop__btn auth__btn ">
                    Create Account
                  </button>
                  <p>
                    Have an account? <Link to="/login">Login</Link>
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

export default SignUp;

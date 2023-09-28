import React, { useState, useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { userIcon } from "../assets/images";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();

  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
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
        (error) => {
          toast.error(error.message);
        },
        () => {
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
              permisions: "user",
              photoURL: downloadURL,
            });
          });
        }
      );
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
              <Col lg="12" className="text-center loading">
                <h5>Loading...</h5>
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
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={passwordConf}
                      onChange={(e) => setPasswordConf(e.target.value)}
                    />
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
                    Have an accout? <Link to="/login">Login</Link>
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

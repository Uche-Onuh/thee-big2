import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/add-products.css";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [cat, setCat] = useState("");
  const [prodImg, setProdImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    // add products to firebase
    try {
      const docRef = await collection(db, "products");

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + prodImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, prodImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          //handle succesfully upload
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              title: title,
              shortDescription: shortDesc,
              description: desc,
              price: price,
              category: cat,
              imgUrl: downloadURL,
            });
          });
          setLoading(false);
          toast.success("Product successfully added");
          navigate("/admin/all-products");
        }
      );
    } catch (err) {
      setLoading(false);
      toast.error("Product not added!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-4">Add Product</h4>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Form onSubmit={addProduct}>
                <div className="mb-4">
                  <FormGroup className="form__group form__unset">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                </div>
                <div className="mb-4">
                  <FormGroup className="form__group form__unset">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="lorem......"
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                </div>

                <div className="mb-4">
                  <FormGroup className="form__group form__unset">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description....."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-50 form__unset">
                    <span>Price(NGN)</span>
                    <input
                      type="number"
                      placeholder="NGN 10000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group w-50 form__unset">
                    <span>Category</span>
                    <br />
                    <select
                      className="w-100 p-2"
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                      required
                    >
                      <option value="chair">Chair</option>
                      <option value="sofa">Sofa</option>
                      <option value="mobile">Mobile</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </FormGroup>
                </div>
                <div>
                  <FormGroup className="form__group form__unset">
                    <span>Product Image</span>
                    <input
                      type="file"
                      onChange={(e) => setProdImg(e.target.files[0])}
                      required
                    />
                  </FormGroup>
                </div>

                <button className="shop__btn" type="submit">
                  Add Product
                </button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;

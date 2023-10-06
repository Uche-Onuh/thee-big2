import React from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetdata from "../hooks/useGetdata";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();
  const { data: productsData, loading } = useGetdata("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Product deleted!");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="flex__end">
              <button
                className="mb-5 shop__btn add__btn"
                onClick={() => {
                  navigate("/admin/add-product");
                }}
              >
                <i className="ri-add-line"></i>
              </button>
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt={item.title} />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>NGN {Intl.NumberFormat().format(item.price)}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;

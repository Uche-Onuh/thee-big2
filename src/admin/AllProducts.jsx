import React, { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = productsData.length;
  const pageSize = 10;
  const pages = Math.ceil(totalPosts / pageSize);

  const goToPrev = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
  };

  const goToNext = () => {
    const nextPage = Math.min(currentPage + 1, pages);
    setCurrentPage(nextPage);
  };

  const start = pageSize * (currentPage - 1);
  const end = pageSize * currentPage;
  const productPerPage = productsData.slice(start, end);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < pages;

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Product deleted!");
  };

  return (
    <>
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
                    {productPerPage.map((item) => (
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

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="pagination">
                <button
                  className="shop__btn"
                  onClick={goToPrev}
                  disabled={!canGoPrev}
                >
                  Prev
                </button>
                <p>
                  {currentPage} of {pages}
                </p>
                <button
                  className="shop__btn"
                  onClick={goToNext}
                  disabled={!canGoNext}
                >
                  Next
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AllProducts;

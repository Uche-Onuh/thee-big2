import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetdata from "../hooks/useGetdata";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/UI/ConfirmationModal";

const AllProducts = () => {
  const navigate = useNavigate();
  const { data: productsData, loading } = useGetdata("products");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const toggleDeleteModal = (productId = null) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteProduct = async () => {
    if (selectedProductId) {
      try {
        await deleteDoc(doc(db, "products", selectedProductId));
        toast.success("Product deleted!");
        toggleDeleteModal(); // Close the modal after successful deletion
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product. Please try again.");
      }
    }
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
                            onClick={() => toggleDeleteModal(item.id)}
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        toggle={() => toggleDeleteModal()}
        onDelete={deleteProduct}
        category="product"
      />
    </>
  );
};

export default AllProducts;

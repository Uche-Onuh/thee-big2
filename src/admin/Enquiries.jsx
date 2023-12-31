import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import useGetdata from "../hooks/useGetdata";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { doc, deleteDoc } from "firebase/firestore";
import DeleteConfirmationModal from "../components/UI/ConfirmationModal";

const Enquiries = () => {
  const { data: enquiriesData, loading } = useGetdata("enquiry");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const totalPosts = enquiriesData.length;
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
  const enquiriesPerPage = enquiriesData.slice(start, end);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < pages;

  // const deleteEnquiry = async (id) => {
  //   await deleteDoc(doc(db, "enquiry", id));
  //   toast.success("Enquiry deleted!");
  // };

  const toggleDeleteModal = (enquiryId = null) => {
    setSelectedEnquiryId(enquiryId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteEnquiry = async () => {
    if (selectedEnquiryId) {
      try {
        await deleteDoc(doc(db, "enquiry", selectedEnquiryId));
        toast.success("User enquiry!");
        toggleDeleteModal(); // Close the modal after successful deletion
      } catch (error) {
        console.error("Error deleting enquiry:", error);
        toast.error("Error deleting enquiry. Please try again.");
      }
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="fw-bold">Enquiries</h4>
            </Col>
            <Col lg="12" className="pt-5">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiriesPerPage.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td>{item.message}</td>
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
        category="enquiry"
        onDelete={deleteEnquiry}
      />
    </>
  );
};

export default Enquiries;

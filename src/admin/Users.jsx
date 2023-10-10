import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import useGetdata from "../hooks/useGetdata";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import DeleteConfirmationModal from "../components/UI/ConfirmationModal";

const Users = () => {
  const { data: usersData, loading } = useGetdata("users");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const totalPosts = usersData.length;
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
  const usersPerPage = usersData.slice(start, end);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < pages;

  const toggleDeleteModal = (userId = null) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const deleteUser = async () => {
    if (selectedUserId) {
      try {
        await deleteDoc(doc(db, "users", selectedUserId));
        toast.success("User deleted!");
        toggleDeleteModal(); // Close the modal after successful deletion
      } catch (error) {
        console.error("Error deleting user:", error);
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
              <h4 className="fw-bold">Users</h4>
            </Col>
            <Col lg="12" className="pt-5">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersPerPage.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <img src={user.photoURL} alt={user.displayName} />
                        </td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>{user.permissions === 1 ? "user" : "admin"}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => toggleDeleteModal(user.id)}
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
        onDelete={deleteUser}
        category="user"
      />
    </>
  );
};

export default Users;

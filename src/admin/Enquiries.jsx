import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetdata from "../hooks/useGetdata";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { doc, deleteDoc } from "firebase/firestore";

const Enquiries = () => {
  const { data: enquiries, loading } = useGetdata("enquiry");

  const deleteEnquiry = async (id) => {
    await deleteDoc(doc(db, "enquiry", id));
    toast.success("Enquiry deleted!");
  };

  return (
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
                  {enquiries.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.subject}</td>
                      <td>{item.message}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteEnquiry(item.id);
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

export default Enquiries;

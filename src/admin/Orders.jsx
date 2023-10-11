import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Container, Row, Col } from "reactstrap";
import useGetdata from "../hooks/useGetdata";
import { Link } from "react-router-dom";

const Orders = () => {
  const { data: ordersData, loading } = useGetdata("orders");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = ordersData.length;
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
  const ordersPerPage = ordersData.slice(start, end);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < pages;

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="fw-bold">Orders</h4>
            </Col>
            <Col lg="12" className="pt-5">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Amount (NGN)</th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersPerPage.map((item) => (
                      <tr key={item.id}>
                        <td style={{ color: "red" }}>
                          <Link to={`/admin/order-details/${item.id}`}>
                            #{item.id}
                          </Link>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{Intl.NumberFormat().format(item.totalAmount)}</td>
                        <td style={{ textTransform: "uppercase" }}>
                          {item.orderStatus}
                        </td>
                        <td
                          style={{
                            textTransform: "uppercase",
                            fontWeight: 700,
                            color: item.paymentId === "" ? "red" : "",
                          }}
                        >
                          {item.paymentId === "" ? "Not paid" : "Paid"}
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

export default Orders;

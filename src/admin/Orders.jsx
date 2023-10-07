import React from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Container, Row, Col } from "reactstrap";
import useGetdata from "../hooks/useGetdata";
import { Link } from "react-router-dom";

const Orders = () => {
  const { data: ordersData, loading } = useGetdata("orders");

  return (
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
                    <th>Id</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Amount (NGN)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((item) => (
                    <tr key={item.id}>
                      <td style={{color: "green"}}>
                        <Link to={`/admin/order-details/${item.id}`}>
                          {item.id}
                        </Link>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{Intl.NumberFormat().format(item.totalAmount)}</td>
                      <td style={{ textTransform: "uppercase" }}>
                        {item.orderStatus}
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

export default Orders;

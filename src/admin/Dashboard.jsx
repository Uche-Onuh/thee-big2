import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useGetdata from "../hooks/useGetdata";

const Dashboard = () => {
  const { data: products } = useGetdata("products");
  const { data: users } = useGetdata("users");
  const { data: orders } = useGetdata("orders");
  const { data: enquiries } = useGetdata("enquiry");

  // Calculate the total sum of totalAmounts in orders
  const totalSales = orders
    ? orders.reduce((acc, order) => acc + order.totalAmount, 0)
    : 0;

  return (
    <>
      <section className="full__page">
        <Container>
          <Row>
            <Col className="lg-3">
              <div className="revenue__box box">
                <h5>Total Sales</h5>
                <span>NGN {Intl.NumberFormat().format(totalSales)}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="order__box box">
                <h5>Orders</h5>
                <span> {Intl.NumberFormat().format(orders.length)}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="products__box box">
                <h5>Total Products</h5>
                <span>{Intl.NumberFormat().format(products.length)}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="users__box box">
                <h5>Total Users</h5>
                <span>{Intl.NumberFormat().format(users.length)}</span>
              </div>
            </Col>
            
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;

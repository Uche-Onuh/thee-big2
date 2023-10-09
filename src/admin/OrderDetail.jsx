import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const OrderDetail = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const docRef = doc(db, "orders", id);

  useEffect(() => {
    try {
      const getOrder = async () => {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder(docSnap.data());
          setLoading(false);
        } else {
          console.log("No order found");
        }
      };
      getOrder();
    } catch (err) {
      console.log(err);
    }
  }, []);
  // console.log(order);

  return (
    <section>
      <Container>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Row>
            <Col lg="12">
              <h4 className="fw-bold mb-5">Order Details</h4>
            </Col>
            <Col lg="6">
              <h6 className="mb-3 fw-bold">Delivery Details</h6>
              <div className="col-md-12 mb-3">
                <label htmlFor="">Name</label>
                <div className="border p-2">{order.name}</div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="">Email</label>
                <div className="border p-2">{order.email}</div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="">Address</label>
                <div className="border p-2">{order.address}</div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="">Phone Number</label>
                <div className="border p-2">{order.number}</div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="">Postal Code</label>
                <div className="border p-2">{order.pCode}</div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="">City</label>
                <div className="border p-2">{order.city}</div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="">State</label>
                <div className="border p-2">{order.state}</div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="">Payment Id</label>
                <div className="border p-2">
                  {order.paymentId === "" ? "Not paid" : order.paymentId}
                </div>
              </div>
            </Col>
            <Col lg="6">
              <h6 className="mb-3 fw-bold">Order Items</h6>
              <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.image} alt={item.productName} />
                      </td>
                      <td>{item.productName}</td>
                      <td>{Intl.NumberFormat().format(item.price)}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr color="blue" />
              <h5>
                Total Price :{" "}
                <span className="float-end">
                  &#8358; {Intl.NumberFormat().format(order.totalAmount)}
                </span>
              </h5>
              <hr color="blue" />
              <h5>
                Payment Status :{" "}
                <span
                  className="float-end"
                  style={{ textTransform: "upperCase" }}
                >
                  {order.paymentId === "" ? "Not paid" : order.paymentId}
                </span>
              </h5>
              <hr color="blue" />
              <h5>
                Order Status :{" "}
                <span
                  className="float-end"
                  style={{ textTransform: "upperCase" }}
                >
                  {order.orderStatus}
                </span>
              </h5>
              <hr color="blue" />
              <h5>
                Edit Order Status :{" "}
                <button className="btn btn-primary float-end">
                  Order Completed
                </button>
              </h5>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default OrderDetail;

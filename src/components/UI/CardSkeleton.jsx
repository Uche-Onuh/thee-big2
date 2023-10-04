import React from "react";
import { Col } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "../../styles/skeleton.css";

const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <Col lg="3" md="4" key={i} className="card__skeleton">
        <div className="skeleton__top">
          <Skeleton width={"100%"} height={"100%"} />
        </div>
        <div className="skeleton__bottom">
          <Skeleton count={3} width={"100%"} height={"100%"} />
        </div>
      </Col>
    ));
};

export default CardSkeleton;

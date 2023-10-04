import React from "react";
import "../../styles/common-section.css";
import { Container } from "reactstrap";
import Skeleton from "react-loading-skeleton";

const CommonSectionSkeleton = () => {
  return (
    <section className="common__section">
      <Container className="text-center">
        <Skeleton width={"35%"} height="40px" />
      </Container>
    </section>
  );
};

export default CommonSectionSkeleton;

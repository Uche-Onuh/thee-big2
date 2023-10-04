import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../styles/skeleton.css";
import { Container } from "reactstrap";
import CommonSectionSkeleton from "./CommonSectionSkeleton";

const DetailSkeleton = () => {
  return (
    <>
      <CommonSectionSkeleton />
      <section>
        <Container>
          <div className="skeleton__box">
            <div className="left">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
            <div className="right skeleton__bottom">
              <Skeleton count={3} />
              <Skeleton width={"40%"} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DetailSkeleton;

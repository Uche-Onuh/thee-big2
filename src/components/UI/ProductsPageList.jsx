import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductsPageList = ({ data }) => {
  //   const start = pageSize * (currentPage - 1);
  //   const end = pageSize * currentPage;
  //   const productPerPage = data.slice(start, end);
  return (
    <>
      {data.map((item, index) => (
        <ProductCard
          key={index}
          name={item.title}
          id={item.id}
          category={item.category}
          price={item.price}
          img={item.imgUrl}
        />
      ))}
    </>
  );
};

export default ProductsPageList;

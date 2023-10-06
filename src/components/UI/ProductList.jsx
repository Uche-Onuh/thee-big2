import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data, size, currentPage }) => {
  const pageSize = size;
  const start = pageSize * (currentPage - 1);
  const end = pageSize * currentPage;
  const productPerPage = data.slice(start, end);

  return (
    <>
      {productPerPage.map((item) => (
        <ProductCard
          key={item.id}
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

export default ProductList;

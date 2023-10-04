import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data }) => {
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

export default ProductList;

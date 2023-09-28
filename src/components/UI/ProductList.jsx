import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <ProductCard
          key={index}
          name={item.productName}
          id={item.id}
          category={item.category}
          price={Intl.NumberFormat().format(item.price)}
          img={item.imgUrl}
        />
      ))}
    </>
  );
};

export default ProductList;

import React, { useState, useEffect } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import useGetdata from "../hooks/useGetdata";
import CardSkeleton from "../components/UI/CardSkeleton";

import ProductList from "../components/UI/ProductList";

const Shop = () => {
  const { data: products, loading } = useGetdata("products");

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const [productsData, setProductsData] = useState([]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if (filterValue) {
      const filteredProducts = products.filter(
        (item) => item.category === filterValue
      );

      setProductsData(filteredProducts);
    }
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;

    let sortedProducts;

    if (sortValue === "ascending") {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (sortValue === "descending") {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = [...products];
    }

    setProductsData(sortedProducts);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchProducts = products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchProducts);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter by Category</option>
                  <option value="tshirt">T-shirt</option>
                  <option value="cargo">Cargo Pant</option>
                  <option value="caps">Headwares</option>
                  <option value="2piece">Two piece</option>
                  <option value="footwares">Footwares</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select onChange={handleSort}>
                  <option>Sort by </option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search....."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {loading ? (
              <CardSkeleton cards={12} />
            ) : productsData.length === 0 ? (
              <h1 className="text-center fs-4">No products found!</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;

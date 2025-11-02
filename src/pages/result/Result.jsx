import React, { useEffect, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/endPoints";
import Product from "../../components/product/Product";
import ProductCard from "../../components/product/ProductCard";
import Classes from "./Result.module.css";

function Result() {
  const [results, setresults] = useState([]);
  const { categoryName } = useParams();
  useEffect(() => {
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        setresults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/ {categoryName}</p>
        <hr />
        <div className={Classes.products_container}>
          {results.map((Product) => (
            <ProductCard key={Product.id} product={Product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Result;

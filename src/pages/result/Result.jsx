import React, { useEffect, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/endPoints";
import Product from "../../components/product/Product";
import ProductCard from "../../components/product/ProductCard";
import Classes from "./Result.module.css";
import Loader from "../../components/loader/Loader";

function Result() {
  const [results, setresults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        setresults(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/ {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={Classes.products_container}>
            {results.map((Product) => (
              <ProductCard
                key={Product.id}
                product={Product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Result;

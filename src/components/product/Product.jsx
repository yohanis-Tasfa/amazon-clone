import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../loader/Loader";

function Product() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setproducts(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleproduct) => {
            return (
              <ProductCard
                product={singleproduct}
                key={singleproduct.id}
                renderAdd={true}
              />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;

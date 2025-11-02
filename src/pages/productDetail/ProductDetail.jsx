import React, { useEffect, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/endPoints";
import ProductCard from "../../components/product/ProductCard";
import Loader from "../../components/loader/Loader";

function ProductDetail() {
  const { productid } = useParams();
  const [product, setproduct] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${producturl}/products/${productid}`)
      .then((res) => {
        setproduct(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [productid]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard product={product} flex={true} renderDesc={true} />
      )}
    </Layout>
  );
}

export default ProductDetail;

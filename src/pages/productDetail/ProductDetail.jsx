import React, { useEffect, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { producturl } from "../../Api/endPoints";
import ProductCard from "../../components/product/ProductCard";
import Loader from "../../components/loader/Loader";
import Classes from "./ProductDetail.module.css"; // Import the CSS module

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
        <div className={Classes.loader}>
          <Loader />
        </div>
      ) : (
        <div className={Classes.productCard}>
          <img
            src={product.image}
            alt={product.title}
            className={Classes.productImage}
          />
          <div className={Classes.product_details}>
            <h3>{product.title}</h3>
            <div className={Classes.product_rating}>
              <span>⭐ {product.rating?.rate || 0}</span>
              <span>({product.rating?.count || 0} reviews)</span>
            </div>
            <div className={Classes.product_price}>${product.price}</div>
            <p>{product.description}</p>
            <button className={Classes.add_to_cart_btn}>Add to Cart</button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ProductDetail;

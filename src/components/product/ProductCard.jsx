import React from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../currencyformat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product, flex, renderDesc }) {
  const { image, title, id, rating, price, description } = product;
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flex : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "600px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating} precision={0.1} />
          {/* count */}
          <small>{Rating.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;

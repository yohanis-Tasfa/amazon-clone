import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../currencyformat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../dataprovider/DataProvider";
import { type } from "../../utility/action.type";

function ProductCard({ product, flex, renderDesc }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  //  add to cart

  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
    console.log(`Added ${title} to cart`);
  };

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
          <Rating value={rating?.rate || rating} precision={0.1} />
          {/* count */}
          <small>{rating?.count || 0}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button} onClick={addToCart}>
          add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

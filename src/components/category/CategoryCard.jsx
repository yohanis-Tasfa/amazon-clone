import React from "react";
import classes from "./category.module.css";
import { Link } from "react-router-dom";
function CategoryCard({ data }) {
  // Destructure here for easier access
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.name}</h2>
        </span>
        <img src={data.image} alt="card img" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;

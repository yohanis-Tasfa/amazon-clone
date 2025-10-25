import React from "react";
import classes from "./category.module.css";
function CategoryCard({ data }) {
  // Destructure here for easier access
  return (
    <div className={classes.category}>
      <a href="">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt="nama yartuu" />
        <p>shop now</p>
      </a>
    </div>
  );
}

export default CategoryCard;

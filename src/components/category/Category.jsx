import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryfullinfo } from "./CategoryFullinfo";
import classes from "./category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryfullinfo.map((infos) => (
        <CategoryCard key={infos.id} data={infos} />
      ))}
    </section>
  );
}

export default Category;

import React from "react";
import Layout from "../../components/LayOut/Layout";
import CarouselEffect from "../../components/carousel/CarouselEffect";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";

function Landing() {
  return (
    <Layout>
      <main className="main_content">
        <CarouselEffect />
        <Category />
        <Product />
      </main>
    </Layout>
  );
}

export default Landing;

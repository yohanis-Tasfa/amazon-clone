import { useState } from "react";
import Header from "./components/header/Header";
import Category from "./components/category/Category";
import CarouselEffect from "./components/carousel/CarouselEffect";
import Product from "./components/product/Product";

// import { Carousel } from "react-responsive-carousel";

function App() {
  return (
    <>
      <Header />
      <CarouselEffect />
      <Category />
      <Product />
    </>
  );
}

export default App;

import { useState } from "react";
import Header from "./components/header/Header";
import Carousel from "./components/carousel/Carousel";
import Category from "./components/category/Category";

function App() {
  return (
    <>
      <Header />
      <Carousel />
      <Category />
    </>
  );
}

export default App;

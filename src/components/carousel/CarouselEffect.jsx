import { Carousel } from "react-responsive-carousel";
import { img } from "./image/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./carousel.module.css";

function CarouselEffect() {
  return (
    <div className={classes.carousel_wrapper}>
      <Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={false}>
        {img.map((image, index) => (
          <img key={index} src={image} alt={`carousel-${index}`} />
        ))}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;

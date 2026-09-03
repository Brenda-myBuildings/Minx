import Splide from "@splidejs/splide";
import AOS from "aos";
import { screenWidth } from "../helpers";

const initSlider = () => {
  // Header Slider
  var splides = document.querySelectorAll(".splide.headerSlider");

  if (splides.length) {
    for (var i = 0; i < splides.length; i++) {
      var splideElement = splides[i];
      var splide = new Splide(splideElement, {
        type: "loop",
        perPage: 1,
        autoHeight: false,
        autoplay: true,
        pagination: true,
        arrows: false,
        perMove: 1,
        speed: 600,
        pauseOnHover: false,
        pauseOnFocus: false,
      });

      splide.mount();
      AOS.refresh();
    }
  }

  // Content Slider
  var splides = document.querySelectorAll(".splide.contentSlider");

  if (splides.length) {
    for (var i = 0; i < splides.length; i++) {
      var splideElement = splides[i];
      var splide = new Splide(splideElement, {
        type: "loop",
        perPage: 4,
        autoHeight: false,
        autoplay: true,
        pagination: true,
        arrows: false,
        perMove: 1,
        speed: 600,
        gap: "30px",
        pauseOnHover: true,
        pauseOnFocus: true,
        breakpoints: {
          991: {
            perPage: 2,
          },

          575: {
            perPage: 1,
          },
        },
      });

      splide.mount();
      AOS.refresh();
    }
  }
};

export default initSlider;

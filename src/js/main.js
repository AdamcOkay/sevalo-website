import "../scss/main.scss";
import Swiper, { Navigation, Pagination } from "swiper";

const mainSlider = new Swiper(".swiper", {
  loop: true,
  centeredSlides: true,
  spaceBetween: 0,
  slidesPerView: "auto",
  preventClicksPropagation: false,
  threshold: 10,
  modules: [Navigation, Pagination],
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});

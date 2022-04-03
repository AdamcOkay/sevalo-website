import "../scss/main.scss";
import Swiper, { Navigation, Pagination } from "swiper";

document.addEventListener("DOMContentLoaded", () => {
  // Слайдер на главной странице
  const mainSlider = new Swiper(".main-slider", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 0,
    slidesPerView: "auto",
    preventClicksPropagation: false,
    threshold: 10,
    modules: [Navigation, Pagination],
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  // Липкий элемент на странице продукта
  const productFixed = document.querySelector(".product-fixed");
  const footer = document.querySelector(".page-footer");

  const getRectTop = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top;
  };

  const checkOffset = () => {
    if (!productFixed) return;
    if (
      getRectTop(productFixed) +
        document.body.scrollTop +
        productFixed.offsetHeight >=
      getRectTop(footer) + document.body.scrollTop - 10
    ) {
      productFixed.style.position = "absolute";
      productFixed.style.bottom = "100px";
    }

    if (
      document.body.scrollTop + window.innerHeight <
      getRectTop(footer) + document.body.scrollTop
    ) {
      productFixed.style.position = "fixed";
      productFixed.style.bottom = "unset";
    }
  };

  document.addEventListener("scroll", function () {
    if (window.innerWidth > 992) {
      checkOffset();
    }
  });
});

import "../scss/main.scss";
import Swiper, { FreeMode, Pagination, Thumbs, Navigation } from "swiper";
import IMask from "imask";

document.addEventListener("DOMContentLoaded", () => {
  // Скрипт вызова/скрытия меню
  const body = document.querySelector("body"),
    hamburger = document.querySelector(".js-hamburger"),
    mainMenu = document.querySelector(".js-main-menu"),
    hasSubMenu = mainMenu.querySelectorAll(".js-has-sub-menu");

  if (mainMenu) {
    hamburger.addEventListener("click", (e) => {
      const target = e.currentTarget;

      body.classList.toggle("no-scroll");
      target.classList.toggle("hamburger--active");
      mainMenu.classList.toggle("menu--opened");
    });

    if (window.innerWidth < 1200) {
      hasSubMenu.forEach((item) => {
        item.addEventListener("click", () => {
          const subMenu = item.querySelector(".js-sub-menu");

          if (item.classList.contains("has-sub-menu--opened")) {
            item.classList.remove("has-sub-menu--opened");
            slideUp(subMenu, 300);
          } else {
            item.classList.add("has-sub-menu--opened");
            slideDown(subMenu, 300);
          }
        });
      });
    }
  }

  // Слайдер на главной странице
  const mainSlider = new Swiper(".main-slider", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 0,
    slidesPerView: "auto",
    preventClicksPropagation: false,
    threshold: 10,
    modules: [Pagination],
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  // Слайдер на странице о компании
  const aboutSlider = new Swiper(".about-slider", {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 1,
    preventClicksPropagation: false,
    threshold: 10,
    modules: [Navigation, Pagination],
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Слайдер на странице продукта

  const thumbnailsContainer = document.querySelector(
      ".js-thumbnails-container"
    ),
    thumbnailsWrapper = document.querySelector(".js-thumbnails-wrapper");

  if (thumbnailsContainer) {
    let slidesAmount = 6;

    // Меняем верстку, если больше 6 слайдов
    if (thumbnailsWrapper.children.length > 6) {
      slidesAmount = 5;
      thumbnailsContainer.classList.add("thumbnails-container--arrows");
    }

    const thumbSlider = new Swiper(".thumbnails-slider", {
      spaceBetween: 10,
      slidesPerView: slidesAmount,
      preventClicksPropagation: false,
      threshold: 10,
      modules: [Navigation],
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    const productSlider = new Swiper(".product-preview", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 1,
      preventClicksPropagation: false,
      threshold: 10,
      modules: [Thumbs],
      thumbs: {
        swiper: thumbSlider,
      },
    });
  }

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
    if (window.innerWidth >= 1200) {
      checkOffset();
    }
  });

  // маска телефона
  const phoneInputs = document.querySelectorAll(".phone-input");

  const maskOptions = {
    mask: "+{7} (000) 000-00-00",
  };

  phoneInputs.forEach((input) => {
    if (input) {
      const mask = IMask(input, maskOptions);
    }
  });

  // аккордеоны
  const accordionButtons = document.querySelectorAll(".accordion__text");

  function slideDown(target, duration = 500) {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;

    if (display === "none") {
      display = "block";
    }
    target.style.display = display;

    let height = target.offsetHeight;

    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");

    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  }

  function slideUp(target, duration = 500) {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";

    window.setTimeout(() => {
      target.style.display = "none";
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  }

  accordionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let target = e.currentTarget;
      let accordion = target.parentNode;

      if (!accordion) return;
      accordion.classList.toggle("accordion-active");

      let panel = target.nextElementSibling;

      if (!panel) return;

      if (accordion.classList.contains("accordion-active")) {
        slideDown(panel, 300);
      } else {
        slideUp(panel, 300);
      }
    });
  });

  // Модалки
  const closeModal = (modalName) => {
    const body = document.querySelector("body"),
      modal = document.querySelector(`[data-modal="${modalName}"]`);

    if (!modal) return;

    modal.classList.remove("ui-modal--active");
    body.classList.remove("no-scroll");

    // Нужно, чтобы видео не проигрывалось после закрытия модалки
    if (modalName === "videoModal") {
      const framebox = modal.querySelector(".js-frame-box"),
        iframe = framebox.innerHTML;

      framebox.innerHTML = "";
      framebox.innerHTML = iframe;
    }
  };

  const callModal = (modalName) => {
    const body = document.querySelector("body"),
      modal = document.querySelector(`[data-modal="${modalName}"]`);

    if (!modal) return;

    modal.classList.add("ui-modal--active");
    body.classList.add("no-scroll");

    modal.addEventListener("click", (e) => {
      const target = e.target;

      if (target.getAttribute("data-modal-setting") === "closeModal") {
        closeModal(modalName);
      }
    });
  };

  const modalButtons = document.querySelectorAll("[data-call]");

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      callModal(btn.dataset.call);
    });
  });

  const productAmount = document.querySelector(".js-product-amount"),
    controlButtons = document.querySelectorAll(".js-control-button");

  if (productAmount) {
    controlButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const decrementBtn = document.querySelector(
            '.js-control-button[data-behavior="decrement"]'
          ),
          behavior = btn.dataset.behavior,
          minVal = parseInt(productAmount.dataset.minValue);

        let curVal = parseInt(productAmount.value);

        if (behavior === "increment") {
          curVal++;
        }

        if (behavior === "decrement" && curVal > minVal) {
          curVal--;
        }

        if (curVal > minVal) {
          decrementBtn.disabled = false;
        } else {
          decrementBtn.disabled = true;
        }

        productAmount.value = curVal;
      });
    });
  }
});

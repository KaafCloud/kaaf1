
      function initializeSwiper(swiperElement) {
        const section = swiperElement.closest(".benefit-section");
        const slideNumberElement = section.querySelector(".slide-number");

        const swiper = new Swiper(swiperElement, {
          slidesPerView: "auto",
          spaceBetween: 0,
          centeredSlides: false,
          loop: false,
          freeMode: false,
          allowTouchMove: false,

          navigation: {
            nextEl: section.querySelector('[data-swiper-arrow="next-benefit"]'),
            prevEl: section.querySelector('[data-swiper-arrow="prev-benefit"]'),
          },

          pagination: {
            el: section.querySelector('[data-swiper-pagination="benefit"]'),
            type: "progressbar",
          },

          breakpoints: {
            320: {
              slidesPerView: "auto",
              spaceBetween: 0,
            },
            480: {
              spaceBetween: 0,
            },
            768: {
              spaceBetween: 0,
            },
            1000: {
              spaceBetween: 96,
            },
            1440: {
              spaceBetween: 96,
            },
          },

          on: {
            init: function () {
              this.slides[this.activeIndex].classList.add(
                "swiper-slide-active"
              );
              updateArrowVisibility(this, section);
              if (slideNumberElement) {
                updateSlideNumber(this, slideNumberElement);
                // Обновляем номер, если элемент есть
              }
            },
            slideChange: function () {
              this.slides.forEach((slide) =>
                slide.classList.remove("swiper-slide-active")
              );
              this.slides[this.activeIndex].classList.add(
                "swiper-slide-active"
              );
              updateArrowVisibility(this, section);
              if (slideNumberElement) {
                updateSlideNumber(this, slideNumberElement);
                // Обновляем номер, если элемент есть
              }
            },
          },
        });
      }

      // Функция для обновления номера слайда
      function updateSlideNumber(swiper, slideNumberElement) {
        const currentSlide = swiper.activeIndex + 1;
        slideNumberElement.textContent = currentSlide
          .toString()
          .padStart(2, "0");
      }

      // Функция для обновления видимости стрелок
      function updateArrowVisibility(swiper, section) {
        const prevArrow = section.querySelector(
          '[data-swiper-arrow="prev-benefit"]'
        );
        const nextArrow = section.querySelector(
          '[data-swiper-arrow="next-benefit"]'
        );
        const isFirstSlide = swiper.isBeginning;
        const isLastSlide = swiper.isEnd;

        if (isFirstSlide) {
          prevArrow.classList.add("hidden");
          nextArrow.classList.remove("hidden");
        } else if (isLastSlide) {
          prevArrow.classList.remove("hidden");
          nextArrow.classList.add("hidden");
        } else {
          prevArrow.classList.remove("hidden");
          nextArrow.classList.remove("hidden");
        }
      }

      // Инициализация всех слайдеров на странице
      document
        .querySelectorAll('[data-swiper="benefit"]')
        .forEach((swiperElement) => {
          initializeSwiper(swiperElement);
        });

      // Функция для обновления активного логотипа
      function updateActiveLogo(index) {
        console.log(`Updating active logo for index: ${index}`);
        const logos = document.querySelectorAll(".trust-logo");
        logos.forEach((logo) => logo.classList.remove("active"));
        const activeLogo = document.querySelector(
          `.trust-logo[data-slide-index="${index}"]`
        );
        if (activeLogo) {
          activeLogo.classList.add("active");
          console.log(`Active logo set for data-slide-index="${index}"`);
        } else {
          console.log(`No logo found for data-slide-index="${index}"`);
        }
      }

      // Инициализация слайдера
      document.addEventListener("DOMContentLoaded", () => {
        const swiperTrust = new Swiper('[data-swiper="trust"]', {
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: false,
          loop: true,
          freeMode: false,
          allowTouchMove: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },

          navigation: {
            nextEl: '[data-swiper-arrow="next-trust"]',
            prevEl: '[data-swiper-arrow="prev-trust"]',
          },

          pagination: {
            el: '[data-swiper-pagination="trust"]',
            type: "progressbar",
          },

          breakpoints: {
            320: {
              slidesPerView: "auto",
              spaceBetween: 0,
            },
            480: {
              spaceBetween: 0,
            },
            768: {
              spaceBetween: 0,
            },
            1000: {
              spaceBetween: 0,
            },
            1440: {
              spaceBetween: 0,
            },
          },

          on: {
            init: function () {
              console.log("Swiper initialized");
              updateActiveLogo(this.realIndex);
            },
            slideChange: function () {
              console.log("Slide changed to realIndex:", this.realIndex);
              updateActiveLogo(this.realIndex);
            },
          },
        });

        // Обработка кликов по логотипам
        document.querySelectorAll(".trust-logo").forEach((logo) => {
          logo.addEventListener("click", () => {
            const slideIndex = parseInt(
              logo.getAttribute("data-slide-index"),
              10
            );
            if (!isNaN(slideIndex)) {
              console.log(`Clicked logo with index: ${slideIndex}`);
              swiperTrust.slideToLoop(slideIndex);
              updateActiveLogo(slideIndex);
            } else {
              console.log("Invalid slide index for logo:", logo);
            }
          });
        });
      });

      const swiperPrograms = new Swiper('[data-swiper="programs"]', {
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: false,
        loop: true,
        freeMode: false,
        allowTouchMove: false,

        navigation: {
          nextEl: '[data-swiper-arrow="next-programs"]',
          prevEl: '[data-swiper-arrow="prev-programs"]',
        },

        pagination: {
          el: '[data-swiper-pagination="programs"]',
          type: "progressbar",
        },

        breakpoints: {
          320: {
            slidesPerView: "auto",
            spaceBetween: 0,
          },
          480: {
            spaceBetween: 0,
          },
          768: {
            spaceBetween: 0,
          },
          1000: {
            spaceBetween: 96,
          },
          1440: {
            spaceBetween: 96,
          },
        },
      });


    //  Up-scroll 
      document.addEventListener("DOMContentLoaded", function () {
        const scrollToTopButton = document.querySelector(".scroll-to-top");

        if (scrollToTopButton) {
          window.addEventListener("scroll", function () {
            const scrollPosition = window.scrollY;
            const windowHeight =
              document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / windowHeight) * 100;

            if (scrollPercentage >= 20) {
              scrollToTopButton.classList.add("visible");
            } else {
              scrollToTopButton.classList.remove("visible");
            }
          });

          scrollToTopButton.addEventListener("click", function () {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          });
        }
      });
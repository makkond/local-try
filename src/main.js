document.addEventListener('DOMContentLoaded', () => {
  // Инициализация Swiper с правильными настройками для mobile-first
  const swiper = new Swiper('.reviews-swiper', {
    // Начальные настройки для мобильных (по умолчанию)
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      enabled: false,
    },
    // Настройки для разных размеров экрана
    breakpoints: {
      // >= 768px (планшеты)
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // >= 1280px (десктоп)
      1280: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });

  // Настройка кнопок навигации
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  if (prevButton && nextButton) {
    // Обновляем состояние кнопок при инициализации
    updateButtonStates();

    prevButton.addEventListener('click', () => {
      swiper.slidePrev();
      updateButtonStates();
    });

    nextButton.addEventListener('click', () => {
      swiper.slideNext();
      updateButtonStates();
    });

    // Обновляем состояние кнопок при изменении слайда
    swiper.on('slideChange', () => {
      updateButtonStates();
    });
  }

  // Функция для обновления состояния кнопок
  function updateButtonStates() {
    if (swiper.isBeginning) {
      prevButton.classList.add('prev-button');
      prevButton.style.opacity = '0.5';
    } else {
      prevButton.classList.remove('prev-button');
      prevButton.style.opacity = '1';
    }

    if (swiper.isEnd) {
      nextButton.style.opacity = '0.5';
    } else {
      nextButton.style.opacity = '1';
    }
  }
});

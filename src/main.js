document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM загружен, инициализация Swiper...');

  // Определяем ширину экрана при загрузке
  const screenWidth = window.innerWidth;
  console.log('Ширина экрана при загрузке:', screenWidth);

  // Определяем количество слайдов в зависимости от ширины экрана
  let slidesPerView = 1;
  let spaceBetween = 20;

  if (screenWidth >= 1280) {
    slidesPerView = 2;
    spaceBetween = 30;
    console.log('Установлено 2 слайда для десктопа');
  } else if (screenWidth >= 768) {
    slidesPerView = 1;
    spaceBetween = 30;
    console.log('Установлен 1 слайд для планшетов');
  } else {
    console.log('Установлен 1 слайд для мобильных');
  }

  // Инициализация Swiper с фиксированными настройками вместо breakpoints
  const swiper = new Swiper('.reviews-swiper', {
    slidesPerView: slidesPerView,
    spaceBetween: spaceBetween,
    loop: true,
    navigation: {
      enabled: false,
    },
  });

  console.log('Swiper инициализирован с параметрами:', {
    slidesPerView,
    spaceBetween,
    loop: true,
  });

  // Настройка кнопок навигации
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  if (prevButton && nextButton) {
    console.log('Кнопки навигации найдены');

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
    // Если включен режим loop, то кнопки всегда должны быть активны
    if (swiper.params.loop) {
      prevButton.style.opacity = '1';
      nextButton.style.opacity = '1';
      return;
    }

    // Если loop выключен, проверяем начало и конец
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

  // Добавляем обработчик изменения размера окна
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    console.log('Изменение размера окна:', newWidth);

    // Пересчитываем количество слайдов
    let newSlidesPerView = 1;
    let newSpaceBetween = 20;

    if (newWidth >= 1280) {
      newSlidesPerView = 2;
      newSpaceBetween = 30;
    } else if (newWidth >= 768) {
      newSlidesPerView = 1;
      newSpaceBetween = 30;
    }

    // Если параметры изменились, обновляем Swiper
    if (
      newSlidesPerView !== swiper.params.slidesPerView ||
      newSpaceBetween !== swiper.params.spaceBetween
    ) {
      console.log('Обновление параметров Swiper:', {
        slidesPerView: newSlidesPerView,
        spaceBetween: newSpaceBetween,
      });

      // Обновляем параметры
      swiper.params.slidesPerView = newSlidesPerView;
      swiper.params.spaceBetween = newSpaceBetween;

      // Применяем изменения
      swiper.update();
    }
  });
});

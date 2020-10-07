import batmanList from './batman-list.js';

const refs = {
  galleryList: document.querySelector('.js-container'),
  modalContainer: document.querySelector('.js-lightbox'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
};

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryMarkup = createGalleryMarkup(batmanList);
refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(batmans) {
  return batmans
    .map(({ src, name, description }) => {
      return `
    <li class="container__item">
  <a
    class="container__link"
    href='${src}'
    >
    <img
      loading="lazy"
      class='container__image lazyload'
      data-src='${src}'
      alt='${name}'
      height='100'
      width='150'
    />
    <p class="image__name">'${name}'</p>
    <p class="image__description">
    '${description}'
    </p>
  </a>
</li>
    `;
    })
    .join('');
}

if ('loading' in HTMLImageElement.prototype) {
  console.log('Браузер поддерживает lazyload');
  addSrcAttrToLazyImages();
} else {
  console.log('Браузер НЕ поддерживает lazyload');
  addLazySizesScript();
}

function addLazySizesScript() {
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js';
  script.integrity =
    'sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==';
  script.crossOrigin = 'anonymous';

  document.body.appendChild(script);
}

function addSrcAttrToLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
}

refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  refs.modalContainer.classList.add('is-open');

  // Подмена значения атрибута src элемента img.lightbox__image.
  refs.modalImage.src = evt.target.dataset.src;
  refs.modalImage.alt = evt.target.alt;

  window.addEventListener('keydown', onCloseModalByEscape);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modalContainer.classList.remove('is-open');

  //   // Очистка значения атрибута src элемента img.lightbox__image.
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
  window.removeEventListener('keydown', onCloseModalByEscape);
}

// Закрытие модального окна по клику на div.lightbox__overlay.

refs.modalOverlay.addEventListener('click', onCloseModalByClickOverlay);

function onCloseModalByClickOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

// Закрытие модального окна по нажатию клавиши ESC.

function onCloseModalByEscape(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

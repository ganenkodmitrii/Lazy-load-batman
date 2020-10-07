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
    href="${src}"
  >
    <img
      class="container__image"
      src="${src}"
      data-source="${src}"
      alt="${name}"
    />
    <p  class="image__name">${name}</p>
    <p class="image__description">${description}</p>
  </a>
</li>
    `;
    })
    .join('');
}

refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  refs.modalContainer.classList.add('is-open');

  // Подмена значения атрибута src элемента img.lightbox__image.
  refs.modalImage.src = evt.target.dataset.source;
  refs.modalImage.alt = evt.target.alt;

  // window.addEventListener('keydown', onCloseModalByEscape);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modalContainer.classList.remove('is-open');

  // Очистка значения атрибута src элемента img.lightbox__image.
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
  window.removeEventListener('keydown', onCloseModalByEscape);
}

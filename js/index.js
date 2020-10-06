import bantmanList from './batman-list.js';

const refs = {
  // input: document.querySelector('#filter'),
  // button: document.querySelector('.btn'),
  listContainer: document.querySelector('.js-container'),
  modalContainer: document.querySelector('js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
};
// //elem.after(nodes) - добавляет nodes после узла elem

// // const titleList = document.createElement('h1');
// // titleList.classList.add('container__name');
// // titleList.textContent = 'Dark Knignt!';

// const createList = document.createElement('ul');
// createList.classList.add('container__list');

// refs.list.append(createList); //добавил узел

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// const containerList = document.querySelector('ul');
const galleryMarkup = createGalleryMarkup(bantmanList);
refs.listContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(batmans) {
  return batmans
    .map(({ src, name, description }) => {
      return `
    <li class="container__item">
  <a
    class="container__link"
    href=""
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

// Открытие модалки
refs.listContainer.addEventListener('click', onOpenModel);

function onOpenModel(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalContainer.classList.add('is-open');

  //Добавляем изображение на модалку
  refs.modalImage.src = e.target.dataset.sourse;
  refs.modalImage.alt = e.target.alt;
}

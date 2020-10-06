import bantmanList from './batman-list.js';

const refs = {
  input: document.querySelector('#filter'),
  button: document.querySelector('.btn'),
  list: document.querySelector('.js-container'),
};

const makeProductContainerList = () => {
  const titleList = document.createElement('h1');
  titleList.classList.add('container-name');
  titleList.textContent = 'Dark Knignt!';

  const createList = document.createElement('ul');
  createList.classList.add('container-list');

  refs.list.append(titleList, createList); //добавил узел
};

makeProductContainerList();

// const titleList = document.createElement('h1');
// titleList.classList.add('container-name');
// titleList.textContent = 'Dark Knignt!';

// const createList = document.createElement('ul');
// createList.classList.add('container-list');

// refs.list.append(titleList, createList);

const containerList = document.querySelector('ul');
const galleryMarkup = createGalleryMarkup(bantmanList);
containerList.insertAdjacentHTML('afterend', galleryMarkup);

function createGalleryMarkup(batmans) {
  return batmans
    .map(({ src, name, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href=""
  >
    <img
      class="gallery__image"
      src="${src}"
      data-source=""
      alt="${name}"
    />
    <p>${name}</p>
    <p>${description}</p>
  </a>
</li>
    `;
    })
    .join('');
}

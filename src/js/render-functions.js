import SimpleLightbox from 'simplelightbox';

let lightbox;

export const renderImages = (images) => {
  const gallery = document.querySelector('.gallery');
  
  const markup = images.map(image => `
      <li class="gallery-item">
          <a href="${image.largeImageURL}">
              <img src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
      </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  } else {
    lightbox.refresh();
  }
};

export const clearGallery = () => {
  document.querySelector('.gallery').innerHTML = '';
};

export const showLoader = () => {
  document.getElementById('loader').style.display = 'block';
};

export const hideLoader = () => {
  document.getElementById('loader').style.display = 'none';
};

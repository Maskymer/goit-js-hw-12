import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import { renderImages, showLoader, hideLoader, clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.getElementById('loader');

let searchText = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  searchText = event.target.elements['search-text'].value.trim();
  if (!searchText) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term.' });
    return;
  }

  page = 1;
  clearGallery();
  loadMoreBtn.style.display = 'none';
  showLoader();

  try {
    const { hits, totalHits: newTotalHits } = await fetchImages(searchText, page, perPage);
    
    if (hits.length === 0) {
      iziToast.warning({ title: 'No Results', message: 'No images found. Try again!' });
      return;
    }

    totalHits = newTotalHits;
    renderImages(hits);

    if (hits.length < perPage || page * perPage >= totalHits) {
      iziToast.info({ title: 'End', message: 'You have reached the end of the search results.' });
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }

  } catch (error) {
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching images.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  showLoader();
  
  try {
    const { hits } = await fetchImages(searchText, page, perPage);
    
    renderImages(hits);
    
    // Плавне прокручування вниз
    const { height } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });

    if (page * perPage >= totalHits) {
      iziToast.info({ title: 'End', message: 'You have reached the end of the search results.' });
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching images.' });
  } finally {
    hideLoader();
  }
});

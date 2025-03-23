import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import {  
  renderImages,  
  showLoader,  
  hideLoader,  
  clearGallery,  
  toggleLoadMoreBtn,  
  smoothScroll,  
} from './js/render-functions';

const form = document.querySelector('.form');  
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async (event) => {  
  event.preventDefault(); 
  currentQuery = event.target.elements['search-text'].value.trim(); 

  if (!currentQuery) {  
    iziToast.error({ title: 'Error', message: 'Please enter a search term.' });  
    return;
  }  

  currentPage = 1; 
  clearGallery();  
  toggleLoadMoreBtn(false);  
  showLoader();  

  try {  
    const { hits, totalHits: total } = await fetchImages(currentQuery, currentPage);
    totalHits = total;
    if (hits.length === 0) {
      iziToast.warning({ title: 'No Results', message: 'No images found. Try again!' });  
      return;  
    }  
    renderImages(hits);
    toggleLoadMoreBtn(hits.length < totalHits);
  } catch (error) {  
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching images.' });  
  } finally {  
    hideLoader();  
  }  
});  

loadMoreBtn.addEventListener('click', async () => {  
  currentPage += 1;  
  showLoader();  

  try {  
    const { hits } = await fetchImages(currentQuery, currentPage);
    renderImages(hits);
    smoothScroll();
    
    if ((currentPage * 15) >= totalHits) {
      toggleLoadMoreBtn(false);
      iziToast.info({ title: 'End of Results', message: 'Sorry, but you have reached the end of search results.' });
    }
  } catch (error) {  
    iziToast.error({ title: 'Error', message: 'An error occurred while fetching images.' });  
  } finally {  
    hideLoader();  
  }  
});
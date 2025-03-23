import SimpleLightbox from 'simplelightbox';  
import 'simplelightbox/dist/simple-lightbox.min.css';  

let lightbox;

export const renderImages = (images) => {  
    const gallery = document.querySelector('.gallery');  
    gallery.insertAdjacentHTML('beforeend', images.map(image => `  
        <li class="gallery-item">  
            <a href="${image.largeImageURL}">  
                <img src="${image.webformatURL}" alt="${image.tags}" />  
            </a>  
            <p>Likes: ${image.likes}</p>  
            <p>Views: ${image.views}</p>  
            <p>Comments: ${image.comments}</p>  
            <p>Downloads: ${image.downloads}</p>  
        </li>  
    `).join(''));  

    if (!lightbox) {  
        lightbox = new SimpleLightbox('.gallery a', {  
            captionsData: 'alt',  
            captionDelay: 250,  
        });  
    } else {
        lightbox.refresh();  
    }
};  

export const clearGallery = () => {  
    document.querySelector('.gallery').innerHTML = '';  
};  

export const showLoader = () => {  
    document.querySelector('.loader').style.display = 'block';  
};  

export const hideLoader = () => {  
    document.querySelector('.loader').style.display = 'none';  
};  

export const toggleLoadMoreBtn = (show) => {
    document.querySelector('.load-more').style.display = show ? 'block' : 'none';
};

export const smoothScroll = () => {
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
        const { height } = galleryItem.getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
};
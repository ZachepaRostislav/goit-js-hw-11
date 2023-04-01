import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
gallery.classList.add('gallery-opacity')

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

export function markup(images) {
  const markupImg = images.map(image => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = image;
    return `
            <a class="gallery-link" href="${largeImageURL}">    
                <div class="gallery-item">
                    <img class="gallery-item__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info__item">
                        <b class="info__item-name">Likes</b>
                        ${likes}
                        </p>
                        <p class="info__item">
                        <b class="info__item-name">Views</b>
                        ${views}
                        </p>
                        <p class="info__item">
                        <b class="info__item-name">Comments</b>
                        ${comments}
                        </p>
                        <p class="info__item">
                        <b class="info__item-name">Downloads</b>
                        ${downloads}
                        </p>
                    </div>
                </div>
            </a>
        `;
  })
    .join('');
  gallery.classList.remove('gallery-opacity')
  gallery.insertAdjacentHTML('beforeend', markupImg);
  lightbox.refresh()
}




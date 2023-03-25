import dataRequest from "./dataRequest";
import { markup } from "./markup";
import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  submitBtn: document.querySelector('.submitBtn'),
  loadMoreBtn: document.querySelector('.load-more'),
}

let search = '';
let page = 1;
let perPage = 40;

refs.form.addEventListener('submit', onFormSubmit)
refs.loadMoreBtn.addEventListener('click', loadMore)
refs.loadMoreBtn.classList.add('is-hidden')

function onFormSubmit(event) {
  event.preventDefault();
  search = event.target.searchQuery.value.trim();


  if (search === '') {
    return notificationOfWrongSearch()
  }

  dataRequest(search)
    .then(data => {
      if (data.hits.length === 0) {
        notificationOfWrongSearch()
      } else {
        markup(data.hits)
        notificaionQuantityOfImages(data)
      }
      if (data.totalHits > perPage) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      refs.form.reset()
    })

}

function loadMore() {
  page += 1;

  dataRequest(search, page, perPage)
    .then(data => {
      markup(data.hits);
      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        notificaionEndOfCollection();
      }
    })
    .catch(error => console.log(error.message));
}

// Если пользователь дошел до конца коллекции, пряч кнопку и выводи уведомление с текстом
function notificaionEndOfCollection() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
}

function notificaionQuantityOfImages(data) {
  if (data.totalHits === 0) {
    return
  }
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
}

// eсли бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
function notificationOfWrongSearch() {
  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

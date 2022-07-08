'use strict';

const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
const resultsList = document.querySelector('.js-listElements');
const resetButton = document.querySelector('.js-reset');
const favouritesList = document.querySelector('.js-favourites');

let heroes = [];
let favourites = [];

function validateInput() {
  if (inputSearch.value === '') {
    alert('Debes rellenar todos los campos');
  } else {
    getApiData();
  }
}

function getApiData() {
  fetch(
    `https://www.superheroapi.com/api.php/7559222877485453/search/${inputSearch.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      heroes = data.results;
      renderResults();
    });
}

function renderResults() {
  let html = '';
  if (heroes === undefined) {
    html = `nooooo`;
  } else {
    for (const heroe of heroes) {
      let classFavouriteBackground = '';
      const favouriteFoundIndex = favourites.findIndex((fav) => {
        return fav.id === heroe.id;
      });

      if (favouriteFoundIndex !== -1) {
        classFavouriteBackground = 'heroes__fav';
      } else {
        classFavouriteBackground = '';
      }

      html += `<div class="js-listresults  col-lg-3 col-md-3 col-xs-12 ${classFavouriteBackground}" id="${heroe.id}">`;
      html += `<div class="card">`;
      html += `<img class="card-img-top" src="${heroe.image.url}" alt="Superheroe profile pic"/>`;
      html += `<div class="card-body">`;
      html += `<p>${heroe.name}</p>`;
      html += `</div>`;
      html += `</div>`;
      html += `</div>`;
    }
  }
  resultsList.innerHTML = html;
  cardListener();
}
function cardListener() {
  const cardLi = document.querySelectorAll('.js-listresults');
  for (const card of cardLi) {
    card.addEventListener('click', addFavourites);
  }
}

function addFavourites(event) {
  const idCard = event.currentTarget.id;
  const favouriteFound = heroes.find((fav) => {
    return fav.id === idCard;
  });
  const favouriteFoundIndex = favourites.findIndex((fav) => {
    return fav.id === idCard;
  });
  if (favouriteFoundIndex === -1) {
    favourites.push(favouriteFound);
  } else {
    favourites.splice(favouriteFoundIndex, 1);
  }

  renderFavourites();
  renderResults();
}

function renderFavourites() {
  let html = '';
  for (const favourite of favourites) {
    html += `<div class="js-favourite_results col-3" id="${favourite.id}">`;
    html += `<img class="card_image" src="${favourite.image.url}" alt="Superheroe profile pic"/>`;
    html += `<div class="listresults__item--text">`;
    html += `<p>${favourite.name}</p>`;
    html += `</div>`;
    html += `</div>`;
  }
  favouritesList.innerHTML = html;
  favouritesListener();
}

function favouritesListener() {
  const favouriteLi = document.querySelectorAll('.js-favourite_results');
  for (const favourite of favouriteLi) {
    favourite.addEventListener('click', addFavourites);
  }
}

function resetResults() {
  heroes = [];
  resultsList.innerHTML = '';
  favouritesList.innerHTML = '';
  inputSearch.value === '';
}

function handleClickSearch(event) {
  event.preventDefault();
  validateInput();
}

buttonSearch.addEventListener('click', handleClickSearch);
resetButton.addEventListener('click', resetResults);

//# sourceMappingURL=main.js.map

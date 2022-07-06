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

      html += `<li class="js-listresults listresults__item ${classFavouriteBackground}" id="${heroe.id}">`;
      html += `<img class="listresults__item--img" src="${heroe.image.url}" alt="Superheroe profile pic"/>`;
      html += `<p  class="listresults__item--name" >${heroe.name}</p>`;
      html += `</li>`;
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
    html += `<li class="js-favourite_results listresults__item" id="${favourite.id}">`;
    html += `<img class="listresults__item--img" src="${favourite.image.url}" alt="Superheroe profile pic"/>`;
    html += `<p  class="listresults__item--name" >${favourite.name}</p>`;
    html += `</li>`;
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

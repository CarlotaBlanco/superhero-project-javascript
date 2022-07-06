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
      renderResults(heroes);
    });
}
function renderResults(heroes) {
  let html = '';
  if (heroes === undefined) {
    html = `nooooo`;
  } else {
    for (const heroe of heroes) {
      html += `<li class="js-listresults listresults__item" id="${heroe.id}">`;
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
  const favoriteFound = heroes.find((fav) => {
    return fav.id === idCard;
  });
  const favoriteFoundIndex = favourites.findIndex((fav) => {
    return fav.id === idCard;
  });
  if (favoriteFoundIndex === -1) {
    favourites.push(favoriteFound);
  } else {
    favourites.splice(favoriteFoundIndex, 1);
  }
  console.log(heroes);
  console.log(favourites);
  renderFavourites();
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

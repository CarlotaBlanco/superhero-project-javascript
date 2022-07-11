'use strict';

const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
const resultsList = document.querySelector('.js-listElements');
const resetButton = document.querySelector('.js-reset');
const favouriteList = document.querySelector('.js-favourite');

let heroes = [];
let favourite = {};

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
    html += `<div class='main__hero'>`;
    html += `<h4 class='display-6 text-center'>`;
    html += `<em>¡ERROR! Héroe no encontrado</em>`;
    html += `</h4>`;
    html += `</div>`;
  } else {
    for (const heroe of heroes) {
      html += `<div class="js-listresults  col-lg-3 col-md-3 col-xs-12" id="${heroe.id}">`;
      html += `<div class="card card_results">`;
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
    card.addEventListener('click', addfavourite);
  }
}

function addfavourite(event) {
  const idCard = event.currentTarget.id;
  const favouriteFound = heroes.find((fav) => {
    return fav.id === idCard;
  });
  favourite = favouriteFound;

  renderfavourite();
  renderResults();
}

function renderfavourite() {
  let html = '';

  if (Object.entries(favourite).length !== 0) {
    window.scrollTo(0, 0);

    html += `<div class="card">`;
    html += `<div class="row g-0">`;

    html += `<div class="js-favourite_results col-md-4 col-xs-12" id="${favourite.id}">`;

    html += `<img class="card_image" src="${favourite.image.url}" alt="Superheroe profile pic"/>`;
    html += `</div>`;
    html += `<div class="col-md-8 col-xs-12 card_info">`;
    html += `<h2 class="display-5">${favourite.name}</h2>`;
    html += `<h5>${favourite.biography['full-name']}</h5>`;
    html += `<p><em>${favourite.connections['group-affiliation']}</em></p>`;
    html += `<ul class="list-group list-group-flush">`;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">Inteligencia<span class="badge rounded-pill text-bg-primary">${favourite.powerstats.intelligence}</span></li>`;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">Fuerza<span class="badge rounded-pill text-bg-primary">${favourite.powerstats.strength}</span></li>`;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">Velocidad<span class="badge rounded-pill text-bg-primary">${favourite.powerstats.speed}</span></li>`;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">Durabilidad<span class="badge rounded-pill text-bg-primary">${favourite.powerstats.durability}</span></li>`;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">Poder<span class="badge rounded-pill text-bg-primary">${favourite.powerstats.power}</span></li>`;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">Combate<span class="badge rounded-pill text-bg-primary">${favourite.powerstats.combat}</span></li>`;
    html += `</ul>`;
    html += `<button type="button" class="btn btn-primary button_close js_button_close">Cerrar</button>`;
    html += `</div>`;
    html += `</div>`;
    html += `</div>`;
  }

  favouriteList.innerHTML = html;

  buttonListener();
}

function buttonListener() {
  const closeButton = document.querySelector('.js_button_close');
  if (closeButton !== null) {
    closeButton.addEventListener('click', closeInfoCard);
  }
}

function closeInfoCard() {
  favourite = {};
  renderfavourite();
  renderResults();
}

function resetResults() {
  let html = '';
  inputSearch.value = 'Busca a tu héroe';
  heroes = [];
  favouriteList.innerHTML = '';
  html += `<div class="main__hero">`;
  html += `<img src="./assets/images/superhero.png" alt="superheroe" />`;
  html += `<h4 class="display-6 text-center"><em>Busca a tu héroe y haz clic en él para ver sus estadísticas</em>
</h4>`;
  html += `</div>`;
  resultsList.innerHTML = html;
}

function handleClickSearch(event) {
  event.preventDefault();
  validateInput();
}

buttonSearch.addEventListener('click', handleClickSearch);
resetButton.addEventListener('click', resetResults);

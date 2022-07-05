'use strict';

const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
const resultsList = document.querySelector('.js-listElements');
const resetButton = document.querySelector('.js-reset');

let heroes = [];

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
      console.log(heroes);
    });
}
function renderResults(heroes) {
  let html = '';
  if (heroes === undefined) {
    console.log('entro');
    html = `nooooo`;
  } else {
    for (const heroe of heroes) {
      html += `<li>`;
      html += `<img src="${heroe.image.url}" alt="Superheroe profile pic"/>`;
      html += `</li>`;
      html += `<li>`;
      html += `<p>${heroe.name}</p>`;
      html += `</li>`;
    }
  }
  resultsList.innerHTML = html;
}

function resetResults() {
  heroes = [];
  resultsList.innerHTML = '';
  inputSearch.value === '';
}

function handleClickSearch(event) {
  event.preventDefault();
  validateInput();
}

buttonSearch.addEventListener('click', handleClickSearch);
resetButton.addEventListener('click', resetResults);

//# sourceMappingURL=main.js.map

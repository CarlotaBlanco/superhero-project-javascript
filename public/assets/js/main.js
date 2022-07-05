'use strict';

const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button');
let heroes = [];

function validateInput(event) {
  event.preventDefault();
  if (inputSearch.value === '') {
    alert('Debes rellenar todos los campos');
  } else {
    getApiData();
  }
}

function getApiData() {
  fetch(`https://www.superheroapi.com/api.php/7559222877485453/search/batman`)
    .then((response) => response.json())
    .then((data) => {
      heroes = data.results;
      console.log(heroes);
    });
}
buttonSearch.addEventListener('click', validateInput);

//# sourceMappingURL=main.js.map

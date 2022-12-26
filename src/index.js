import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const onInput = document.querySelector('#search-box');
const cntrList = document.querySelector('.country-list');
const cntrInfo = document.querySelector('.country-info');

onInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();

    let onSearch = onInput.value.trim();

    if (onSearch === "") {
        cntrList.innerHTML = "";
        cntrInfo.innerHTML = "";
    }

    fetchCountries(onSearch)
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            if (data.length > 1 && data.length <= 10) {
                renderAllCountries(data);
            }
            if (data.length === 1) {
                renderSingleCountry(data);
            }
        })
    
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
}

function renderAllCountries(country) {
    cntrList.style.listStyle = "none";
    const markup = country
        .map((el) => {
            return `<li><img src="${el.flags.svg}" alt="${el.name.official}" width="50"><b>${el.name.common}</b></li>`
        })
        .join("");
    cntrList.innerHTML = markup;
}

function renderSingleCountry(country) {
    const markup = country
    .map((el) => {
        return `<p><img src="${el.flags.svg}" alt="${el.name.official}" width="100"><h1>${el.name.official}</h1></p>
        <p><b>Capital: </b>${el.capital}</p>
        <p><b>Population: </b>${el.population}</p>
        <p><b>Languages: </b>${Object.values(el.languages)}</p>`
        })
        .join("");
    cntrList.innerHTML = markup;
}
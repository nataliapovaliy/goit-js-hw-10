import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const onInput = document.querySelector('#search-box');
const cntrList = document.querySelector('.country-list');
const cntrInfo = document.querySelector('.country-info');

onInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();

    let onSearch = onInput.value.trim();
    console.log(onSearch);
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
                Notiflix.Notify.success('Success all');
                renderAllCountries(data);
                console.log(data);
            }
            if (data.length === 1) {
                Notiflix.Notify.success('Success Single');
                renderSingleCountry(data);
                console.log(data);
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
            return `<li><img src="${el.flags.svg}" alt="${el.name.official}" width="60" height="60"><b><style="font-weight: 800">${el.name.common}</b></li>`
        })
        .join("");
    cntrList.innerHTML = markup;
}

function renderSingleCountry(country) {
    const markup = country
    .map((el) => {
        return `<p><img src="${el.flags.svg}" alt="${el.name.official}" width="100"><b>${el.name.official}</b></p>
        <p><b>Capital: </b>${el.capital}</p>
        <p><b>Population: </b>${el.population}</p>
        <p><b>Languages: </b>${Object.values(el.languages)}</p>`
        })
        .join("");
    cntrList.innerHTML = markup;
}
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages 
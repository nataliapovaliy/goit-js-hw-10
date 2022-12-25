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

    fetchCountries(onSearch)
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            if (data.length > 1 && data.length <= 10) {
                Notiflix.Notify.success('Success');
            }
        })
    
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
}
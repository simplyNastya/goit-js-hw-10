import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const formEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

function createMarkupMini(data) {
    return data.map(({ name, flags }) => {
        return `<li class="country-item">
            <div class="title-wrapper">
            <img src="${flags.svg}" alt="${name.official}" width=30 heigth=15 class="country-img">
            <h2 class="country-title-min">${name.official}</h2>
            </div>
        </li>`
    }).join('')
}

function createMarkupMax(data) {
    return data.map(({ name, flags, capital, population, languages }) => {
        return `<li class="country-item">
            <div class="title-wrapper">
            <img src="${flags.svg}" alt="${name.official}" width=30 heigth=15 class="country-img">
            <h2 class="country-title">${name.official}</h2>
            </div>
            <p class="country-capital"><span class="country-text">Capital:</span> ${capital}</p>
            <p class="country-population"><span class="country-text">Population:</span> ${population}</p>
            <p class="country-lang"><span class="country-text">Languages:</span> ${Object.values(languages)}</p>
        </li>`
    }).join('')
}

function handlerInput(event) {
    const inputValue = event.target.value;

    fetchCountries(inputValue)
    .then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        } else if (data.length < 2) {
            const markupMax = createMarkupMax(data);
            listEl.innerHTML = markupMax 
        } else if (data.length > 2 || data.length < 10) {
            const markupMini = createMarkupMini(data);
            listEl.innerHTML = markupMini
        }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'))
    // .finally(() => formEl.reset())
}

formEl.addEventListener('input', debounce(handlerInput, DEBOUNCE_DELAY))






import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTpl from './templates/country-card.hbs';
import countryFoundItemTpl from './templates/country-found-item.hbs';
import CountriesApiService from './js/countries-api-service';
import getRefs from './js/get-refs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
const countriesApiService = new CountriesApiService();
const errorNotificationOptions = {
  text: 'Too many matches found. Please enter a more specific query!',
};

refs.input.addEventListener('input', debounce(onSearch, 500));

// Функция с промисом классическим
/*function onSearch(e) {
  if (!e.target.value) {
    clearCountriesFoundList();
    return alert('Введи что-то нормальное');
  }

  countriesApiService.query = e.target.value;

  countriesApiService.fetchCountries().then(onFetchSuccess).catch(onFetchError);
}*/

// Функция с async/await
async function onSearch(e) {
  if (!e.target.value) {
    clearCountriesFoundList();
    return alert('Введи что-то нормальное');
  }

  countriesApiService.query = e.target.value;

  try {
    const countries = await countriesApiService.fetchCountries();

    onFetchSuccess(countries);
  } catch (error) {
    onFetchError(error);
  }
}

function onFetchSuccess(countries) {
  clearCardContainer();
  clearCountriesFoundList();

  if (countries.length > 10) return error(errorNotificationOptions);

  if (countries.length >= 2 && countries.length <= 10)
    return renderCountriesFoundList(countries);

  renderCountryCard(countries);

  refs.input.value = '';
}

function clearCountriesFoundList() {
  refs.countriesFoundList.innerHTML = '';
}

function clearCardContainer() {
  refs.cardContainer.innerHTML = '';
}

function renderCountriesFoundList(countries) {
  refs.countriesFoundList.innerHTML = countryFoundItemTpl(countries);
}

function renderCountryCard(countries) {
  refs.cardContainer.innerHTML = countryCardTpl(countries);
}

function onFetchError(error) {
  console.error('Error: ', error);

  alert(error);

  refs.input.value = '';
}

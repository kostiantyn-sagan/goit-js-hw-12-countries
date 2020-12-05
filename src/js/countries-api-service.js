const BASE_URL = 'https://restcountries.eu/rest/v2';

export default class CountriesApiService {
  constructor() {
    this.searchQuery = '';
  }

  // Функция с промисом классическим
  /*fetchCountries() {
    return fetch(`${BASE_URL}/name/${this.searchQuery}`).then(response => {
      if (response.ok) return response.json();

      throw new Error('Error fetching data');
    });
  }*/

  // Функция с async/await
  async fetchCountries() {
    const response = await fetch(`${BASE_URL}/name/${this.searchQuery}`);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error fetching data');
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

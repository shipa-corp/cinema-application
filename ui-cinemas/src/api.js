import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const URL_MOVIES = `http://${API_SERVER}/api/mov`;
const URL_CINEMAS = `http://${API_SERVER}/api/cin`;
const URL_BOOKING = `http://${API_SERVER}/api/book`;

function getErrorMessage(error, defaultText) {
  const { data, status, statusText } = error.response;
  const errorMsg = data || defaultText;
  console.error(`${errorMsg}. HTTP ${status}: ${statusText}`);

  return error;
}

export function fetchMovies() {
  return axios
    .get(`${URL_MOVIES}/movies`)
    .then(({ data }) => data)
    .catch((error) => {
      const errorMsg = getErrorMessage(
        error,
        "There was an error fetching the movies from the API"
      );
      throw new Error(errorMsg);
    });
}

export function fetchCinemasByCityId(cityId) {
  return axios
    .get(`${URL_CINEMAS}/cinemas?cityId=${cityId}`)
    .then(({ data }) => data)
    .catch((error) => {
      const errorMsg = getErrorMessage(
        error,
        "There was an error fetching the cinemas from the API"
      );
      throw new Error(errorMsg);
    });
}

export function fetchCinema(id) {
  return axios
    .get(`${URL_CINEMAS}/cinemas/${id}`)
    .then(({ data }) => data)
    .catch((error) => {
      const errorMsg = getErrorMessage(
        error,
        "There was an error fetching the cinema details from the API"
      );
      throw new Error(errorMsg);
    });
}

export function fetchCountries() {
  return axios
    .get(`${URL_CINEMAS}/countries`)
    .then(({ data }) => data)
    .catch((error) => {
      const errorMsg = getErrorMessage(
        error,
        "There was an error fetching the countries from the API"
      );
      throw new Error(errorMsg);
    });
}

export function fetchStates(countryId) {
  return axios
    .get(`${URL_CINEMAS}/countries/${countryId}`)
    .then(({ data }) => data)
    .catch((error) => {
      const errorMsg = getErrorMessage(
        error,
        "There was an error fetching the states from the API"
      );
      throw new Error(errorMsg);
    });
}

export function fetchCities(countryId, stateId) {
  return axios
    .get(`${URL_CINEMAS}/countries/${countryId}/${stateId}`)
    .then(({ data }) => data)
    .catch((error) => {
      const errorMsg = getErrorMessage(
        error,
        "There was an error fetching the cities from the API"
      );
      throw new Error(errorMsg);
    });
}

export function bookMovie(payload) {
  return axios
    .post(`${URL_BOOKING}/booking`, payload)
    .then(({ data }) => data)
    .catch((error) => {
      const errorMsg = getErrorMessage(
        error,
        "There was an error booking the selected movie from the API"
      );
      throw new Error(errorMsg);
    });
}

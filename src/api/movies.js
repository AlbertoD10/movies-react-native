import {API_HOST, API_KEY, LANG} from '../utils/constants';

export async function getNewMoviesApi() {
  const page = 1;
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  try {
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getAllGenresApi() {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  try {
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}
export async function getMovieGenreApi(idGenres) {
  // const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&lenguage=${LANG}`;
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&language=${LANG}&with_genres=${idGenres}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getPopularMovieApi(page) {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  try {
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getNewMovies(page) {
  const url = `${API_HOST}/movie/upcoming?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  try {
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getMovieVideo(id) {
  const url = `${API_HOST}/movie/${id}/videos?api_key=${API_KEY}&language=${LANG}`;

  try {
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}

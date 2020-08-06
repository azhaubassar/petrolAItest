export const GET_MOVIE_BY_ID_REQUEST = 'GET_MOVIE_BY_ID_REQUEST';
export const GET_MOVIE_BY_ID_SUCCESS = 'GET_MOVIE_BY_ID_SUCCESS';
export const GET_MOVIE_BY_ID_FAIL = 'GET_MOVIE_BY_ID_FAIL';

export const getMovieByIdRequest = id => {
  return {type: GET_MOVIE_BY_ID_REQUEST, payload: {id}};
};
export const getMovieByIdSuccess = data => {
  return {type: GET_MOVIE_BY_ID_SUCCESS, payload: {data}};
};
export const getMovieByIdFail = err => {
  return {type: GET_MOVIE_BY_ID_FAIL, payload: {err}};
};
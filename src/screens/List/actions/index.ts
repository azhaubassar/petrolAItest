export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAIL = 'GET_MOVIES_FAIL';

export const getMoviesRequest = () => {
  return {type: GET_MOVIES_REQUEST, payload: {}};
};
export const getMoviesSuccess = data => {
  return {type: GET_MOVIES_SUCCESS, payload: {data}};
};
export const getMoviesFail = err => {
  return {type: GET_MOVIES_FAIL, payload: {err}};
};
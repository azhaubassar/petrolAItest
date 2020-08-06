import {
    GET_MOVIE_BY_ID_REQUEST,
    GET_MOVIE_BY_ID_SUCCESS,
    GET_MOVIE_BY_ID_FAIL
  } from '../actions/index';
  
  const initialState = {fetching: false, data: null, err: null};
  
  export const getMovieByIdReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MOVIE_BY_ID_REQUEST:
        return {
          fetching: true,
          data: null,
          err: null,
        };
      case GET_MOVIE_BY_ID_SUCCESS:
        return {
          fetching: false,
          data: action.payload.data,
          err: null,
        };
      case GET_MOVIE_BY_ID_FAIL:
        return {
          fetching: false,
          data: null,
          err: action.payload.err,
        };
      default:
        return state;
    }
  };
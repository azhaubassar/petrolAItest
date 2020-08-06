import {
    GET_MOVIES_REQUEST,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_FAIL
  } from '../actions/index';
  
  const initialState = {fetching: false, data: null, err: null};
  
  export const getMoviesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MOVIES_REQUEST:
        return {
          fetching: true,
          data: null,
          err: null,
        };
      case GET_MOVIES_SUCCESS:
        return {
          fetching: false,
          data: action.payload.data,
          err: null,
        };
      case GET_MOVIES_FAIL:
        return {
          fetching: false,
          data: null,
          err: action.payload.err,
        };
      default:
        return state;
    }
  };
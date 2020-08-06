import { call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_MOVIES_REQUEST,
  getMoviesRequest,
  getMoviesFail,
  getMoviesSuccess,
} from '../actions/index';
import {getAllMovies} from '../../../api';

export function* watchGetMovies() {
  yield takeLatest(GET_MOVIES_REQUEST, handleGetMovies);
}

function* handleGetMovies(action) {
  // yield put(getMoviesRequest());
  try{
    const response = yield call(getAllMovies, action.payload) ;
    yield put(getMoviesSuccess(response));
    
  }catch(e){
    yield put(getMoviesFail(e.message));
  }
}
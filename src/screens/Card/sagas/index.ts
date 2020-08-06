import { call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_MOVIE_BY_ID_REQUEST,
  getMovieByIdRequest,
  getMovieByIdFail,
  getMovieByIdSuccess,
} from '../actions/index';
import { getMovieById } from '../../../api';

export function* watchGetMovieById() {
  yield takeLatest(GET_MOVIE_BY_ID_REQUEST, handleGetMovieById);
}

function* handleGetMovieById(action) {
  try{
    const { id } = action.payload;
    const response = yield call(getMovieById, id) ;
    yield put(getMovieByIdSuccess(response));
    
  }catch(e){
    yield put(getMovieByIdFail(e.message));
  }
}
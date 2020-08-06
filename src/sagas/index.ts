import {all} from 'redux-saga/effects';
import {watchGetMovies} from '../screens/List/sagas';
import {watchGetMovieById} from '../screens/Card/sagas';

export default function* rootSaga() {
  yield all([watchGetMovies(), watchGetMovieById()]);
}

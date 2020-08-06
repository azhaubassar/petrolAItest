import {combineReducers} from 'redux';
import {getMoviesReducer} from '../screens/List/reducers';
import {getMovieByIdReducer} from '../screens/Card/reducers';

const rootReducer = combineReducers({getMoviesReducer,getMovieByIdReducer});
export default rootReducer;
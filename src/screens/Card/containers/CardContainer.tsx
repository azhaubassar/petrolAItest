import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import CardView from '../views/CardView';
import { getMoviesSuccess} from '../../List/actions/index';
import { getMovieByIdRequest}  from '../actions';
import { IState } from '../../../types';

interface IProps {
    id: number;
    name: string;
    goBack: () => void;
    getMovieByIdRequest: (id:number) => void;
  }

const RATED_MOVIES = 'RATED_MOVIES';

class CardContainer extends Component<IProps> {
  state = {
    initialRating: 0
  }

  componentDidMount() {
    const {getMovieByIdRequest, id} = this.props;
    getMovieByIdRequest(id);
    this.getInitialRating(id)
  }

  getInitialRating = async(id: number) => {
    const movieList = await this.getMoviesList();
    const movieObj = movieList.find(item=> item.id===id);
    this.setState({initialRating: movieObj.rating})
  }

  ratingCompleted = async(rating:number)=> {
    const { id } = this.props;
    const ratedMovie = {id, rating};

    const moviesList = await this.getMoviesList()
    const isMovieRatedBefore = moviesList.length>0 && await this.checkMovieExistance(id, moviesList);
    if(isMovieRatedBefore){
      await this.deleteOldRatesAndAdd(ratedMovie, moviesList);
    }else{
      this.addToListOfMovies(ratedMovie, moviesList)
    }
  }

  getMoviesList = async() => {
    let listOfRatedMovies = await AsyncStorage.getItem(RATED_MOVIES, data=> data);
    listOfRatedMovies = listOfRatedMovies ?  JSON.parse(listOfRatedMovies): [] as  any;
    return listOfRatedMovies;
  }

  addToListOfMovies = async(movie: any, moviesList: any) => {
    moviesList.push(movie);
    const updatedListOfRatedMovies = moviesList;
    await AsyncStorage.setItem(RATED_MOVIES, JSON.stringify(updatedListOfRatedMovies))
    this.fetchReducers(updatedListOfRatedMovies);
  }

  checkMovieExistance = (id:number, moviesList:any) => {
      const movieFound = moviesList.some(item=>item.id===id);
      return movieFound;
  }

  deleteOldRatesAndAdd = async(ratedMovie:any, moviesList: any) => {
    const filteredMoviesList = moviesList.filter(item=> item.id!==ratedMovie.id);
    await AsyncStorage.setItem(RATED_MOVIES, JSON.stringify(filteredMoviesList));
    this.addToListOfMovies(ratedMovie, filteredMoviesList)
  }

  fetchReducers = (ratedMovies: any) => {
    const { getMoviesReducer} = this.props;

    let listFromReducer = getMoviesReducer.data;
    let modifiedMoviesList;

    listFromReducer && listFromReducer.map((item)=> {
      const ratedMovie = ratedMovies.find(item2=> item.id === item2.id);
      if(ratedMovie){
        modifiedMoviesList = listFromReducer.filter(item => item.id!==ratedMovie.id);

        const newItem = {
          ...item, 
          userRating: ratedMovie.rating
        }

        listFromReducer[item.id-1] = newItem;
        modifiedMoviesList.push(newItem);
      }
    })

    getMoviesSuccess(modifiedMoviesList);
  }

  render() {
    const { id, name, goBack, getMovieByIdReducer } = this.props;
    const { initialRating } = this.state
    
    return <CardView 
            id={id} 
            name={name} 
            goBack={goBack} 
            movieDetails={getMovieByIdReducer.data} 
            initialRating={initialRating}
            ratingCompleted={this.ratingCompleted}
            />;
  }
}

const mapStateToProps = (state: IState) => {
  const {getMovieByIdReducer,getMoviesReducer} = state;

  return {
    getMovieByIdReducer,
    getMoviesReducer
  }
};

const mapDispatchToProps = {
  getMovieByIdRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
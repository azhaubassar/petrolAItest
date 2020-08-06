import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { IState } from '../../../types';
import {getMoviesRequest} from '../actions/index';
import ListView from '../views/ListView';

interface IProps {
  getMoviesRequest: () => void;
  goToMovie: (id:number, name:string) => void;
  navigation: NavigationScreenProp<NavigationState>;
}
const RATED_MOVIES = 'RATED_MOVIES';

class ListContainer extends Component<IProps> {

  state = {
    ratedMoviesFromAsync: []
  }

  async componentDidMount(){
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.forceUpdate();
      }
    );
    const {getMoviesRequest} = this.props;
    getMoviesRequest();
    await this.getMoviesList();
  }

  getMoviesList = async() => {
    let ratedMoviesFromAsync = await AsyncStorage.getItem(RATED_MOVIES, data=> data);
    ratedMoviesFromAsync = ratedMoviesFromAsync ?  JSON.parse(ratedMoviesFromAsync): [] as  any;
    this.setState({ratedMoviesFromAsync})
  }

  render() {
    const { goToMovie, getMoviesReducer } = this.props;
    const { ratedMoviesFromAsync } = this.state;

    let listFromReducer = getMoviesReducer.data;
    let modifiedMoviesList ;
  
    listFromReducer && listFromReducer.map((item)=> {
      const ratedMovie = ratedMoviesFromAsync.find(item2=> item.id===item2.id);
      if(ratedMovie){
        modifiedMoviesList = listFromReducer.filter(item=> item.id!==ratedMovie.id);

        const newItem = {
          ...item, 
          userRating: ratedMovie.rating
        }
        listFromReducer[item.id-1] = newItem;
        modifiedMoviesList.push(newItem);
      }else{
        modifiedMoviesList = listFromReducer;
      }
    })
    console.log(modifiedMoviesList)

    return <ListView movies={modifiedMoviesList} goToMovie={goToMovie}/>
  }
}

const mapStateToProps = (state: IState) => {
  const { getMoviesReducer } = state;

  return {
    getMoviesReducer
  }
};

const mapDispatchToProps = {
  getMoviesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
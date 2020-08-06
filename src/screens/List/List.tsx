import React, { Component } from 'react';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import ListContainer from './containers/ListContainer';

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class List extends Component<IProps> {

    goToMovie = (id:number, name:string) => {
        const { navigate } = this.props.navigation;
        navigate('Card',{id, name})
    }
    
    render() {    
      return <ListContainer goToMovie={this.goToMovie} navigation={this.props.navigation}/>;
  }
}

export default List;

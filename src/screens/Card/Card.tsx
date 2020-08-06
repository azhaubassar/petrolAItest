import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import CardContainer from './containers/CardContainer';

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class Card extends Component<IProps> {

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { navigation }= this.props;
    const id = navigation.getParam('id');
    const name =  navigation.getParam('name');

    return <CardContainer id={id} name={name} goBack={this.goBack}/>;
  }
}

export default Card;

import React, { Component, Fragment } from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Card, CardItem, Thumbnail } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import styles from '../styles';

interface IProps {
    id: number;
    name: string;
    goBack: () => void;
    movieDetails: any;
    ratingCompleted: (rating:number)=>void;
    initialRating: number;
}

class CardView extends Component<IProps> {

  renderItem = ({item}) =>{
    return <Text>{item}</Text>
  }

  render() {
    const { name , goBack, movieDetails ,ratingCompleted, initialRating} = this.props;
    const { imageCard, loader } = styles;
    let descriptionSplitted = movieDetails ? movieDetails.summary.replace(/[<>bp/]/gi,''):'';

    return (
        <Fragment>
          <Container>
          <Header>
          <Left>
            <Button onPress={()=>goBack()} transparent>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>{name}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        {movieDetails ?
        <View>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: movieDetails.image.medium}} />
                  <Body>
                  <Text>{movieDetails.name}</Text>
                  <Text note>Genres:  {movieDetails.genres.map(item=>`${item} `)}
                  </Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                <Image source={{uri: movieDetails.image.medium}} style={imageCard}/>
                <Text>
                  {descriptionSplitted}
                </Text>
                </Body>
              </CardItem>
              <Card bordered>
              <CardItem style={{flexDirection:'column',justifyContent:'center'}}> 
                <Text>{initialRating !==0 ? 'Your rate': 'Please, rate movie:'}</Text>
              <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
                defaultRating={initialRating}
                size={25}
                onFinishRating={ratingCompleted}
              />
              </CardItem>
              </Card>
            </View>
        : <ActivityIndicator color="black" style={loader}/>
        }
        </Container>
    </Fragment>

    )
  }
}

export default CardView;
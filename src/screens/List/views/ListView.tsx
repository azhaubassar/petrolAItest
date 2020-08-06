import React, { Component,Fragment } from 'react';
import { FlatList, View , Image } from 'react-native';
import { Header, Left, Body, Right, Thumbnail, Text,Title, Card, CardItem, Button, Container } from 'native-base';

import styles from '../styles'

interface IProps {
  movies: any;
  goToMovie: ( id:number, name:string )=> void;
}

class ListView extends Component<IProps> {

  keyExtractor = (index: number): string =>`${index}`;

  renderItem = ({item}: any) => {
    const { goToMovie } = this.props;
    const { cardView, card, cardImage, leftCardView , leftCardViewText, leftCardViewText2 } = styles;
    
    let descriptionSplitted = item.summary.substring(0,200);
    descriptionSplitted = descriptionSplitted.replace(/[<>bp/]/gi,'')

    return (
      <View style={cardView} >
      <Card style={card}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: item.image.medium }} />
            <Body>
              <Text>{item.name}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image style={cardImage} source={{ uri: item.image.medium }} />
        </CardItem>
        <CardItem>
          <Text>{descriptionSplitted+'...'}</Text>
        </CardItem>
        <CardItem>
          <Left style={leftCardView}>
              <Text style={leftCardViewText}>Overall {item.rating.average}</Text>
              {item.userRating && <Text style={leftCardViewText2}>Your rate {item.userRating}</Text>}
          </Left>
          <Right>
            <Button onPress={()=>goToMovie(item.id, item.name)}>
              <Text>More</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
      </View>
    )
  }

  renderEmptyComponent = () => {
    const {emptyContentView} = styles;
    
    return(
      <View style={emptyContentView}>
        <Text>No films</Text>
      </View>
    )
  }

  render() {
    const { movies } = this.props;

    return (
      <Fragment>
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        {movies &&
          <FlatList
            keyExtractor={this.keyExtractor}
            data={movies}
            extraData={this.props}
            renderItem={this.renderItem}
            ListEmptyComponent={this.renderEmptyComponent}
          />
        }
      </Container>
      </Fragment>
    );
  }
}

export default ListView;
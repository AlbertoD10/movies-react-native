import React from 'react';
import {ScrollView, View, Image, StyleSheet, StatusBar} from 'react-native';
import {Title, Text, Caption} from 'react-native-paper';
import {BASE_PATH_IMG} from '../utils/constants';
import {AirbnbRating, Rating} from 'react-native-ratings';

export default function Movie(props) {
  const {
    route: {
      params: {item, genreName},
    },
  } = props;
  const imgPath = `${BASE_PATH_IMG}/w500${item.poster_path}`;

  console.log(props);
  return (
    <ScrollView>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
      <MovieImage imgPath={imgPath} />
      <MovieTitle title={item.title} genreName={genreName} />
      <RatingBar
        vote_average={item.vote_average}
        vote_count={item.vote_count}
      />
      <MovieReview overview={item.overview} date={item.release_date} />
    </ScrollView>
  );
}

function MovieImage(props) {
  return (
    <View style={styles.viewPoster}>
      <Image style={styles.imagePoster} source={{uri: props.imgPath}} />
    </View>
  );
}

function MovieTitle(props) {
  const {title, genreName} = props;
  return (
    <View style={styles.title}>
      <Title style={{color: 'black'}}> {title} </Title>
      <Caption style={{color: 'black'}}>{genreName}</Caption>
    </View>
  );
}

function RatingBar(props) {
  const {vote_average, vote_count} = props;
  let average = vote_average / 2;
  return (
    <View style={styles.ratingBar}>
      <Text>
        {/* <AirbnbRating
          defaultRating={average}
          size={30}
          showRating={false}
          isDisabled={true}
        /> */}
        <Rating imageSize={30} />
      </Text>
      <Text style={{color: 'black'}}> {average} valoración</Text>
    </View>
  );
}

function MovieReview(props) {
  return (
    <View style={styles.overview}>
      <Text style={{textAlign: 'justify', color: 'black'}}>
        {props.overview}
      </Text>
      <Text style={{color: 'black'}}> Fecha de lanzamiento: {props.date} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  imagePoster: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  title: {
    margin: 15,
    color: 'black',
  },
  overview: {
    marginTop: 0,
    margin: 15,
  },
  ratingBar: {
    marginTop: 0,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

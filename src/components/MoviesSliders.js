import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';
import {Title} from 'react-native-paper';
import {BASE_PATH_IMG} from '../utils/constants';
import Carousel from 'react-native-snap-carousel';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function MoviesSlider(props) {
  const {newMovies, genres, navigation} = props;

  const renderItem = ({item}) => {
    return <MovieItem item={item} genres={genres} navigation={navigation} />;
  };

  return (
    <SafeAreaView>
      <Carousel
        layout={'default'}
        data={newMovies}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
      />
    </SafeAreaView>
  );
}

function MovieItem(props) {
  const {item, genres, navigation} = props;
  const {poster_path, title, genre_ids} = item;
  const imgPath = `${BASE_PATH_IMG}/w500${poster_path}`;

  //Function to return the name of the movie genre
  const setGenre = (idGenre) => {
    const genreName = [];
    genres.forEach((genre) => {
      idGenre.forEach((id) => {
        if (id === genre.id) {
          genreName.push(`${genre.name}  `);
        }
      });
    });

    return genreName;
  };
  const genreName = setGenre(genre_ids);

  const onNavigate = () => {
    navigation.navigate('Movie', {item, genreName});
  };

  return (
    <Pressable onPress={onNavigate}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imgPath}} />
        <Title style={styles.movieTitle}>{title}</Title>
        <Text style={styles.movieGenre}>{genreName}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  movieGenre: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});

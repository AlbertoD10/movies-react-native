import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constants';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.4);

export default function MoviesSliderGenre(props) {
  const {moviesByGenre, navigation, genres} = props;

  const renderItem = ({item}) => {
    const {genre_ids} = item;
    const imgPath = `${BASE_PATH_IMG}/w500${item.poster_path}`;

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
          <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <Carousel
        layout={'default'}
        data={moviesByGenre}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        activeSlideAlignment="start"
        inactiveSlideOpacity={1}
      />
    </SafeAreaView>
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
    height: 200,
    borderRadius: 20,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
});

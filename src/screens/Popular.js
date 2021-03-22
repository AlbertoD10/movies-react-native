import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getPopularMovieApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import {Title} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import starLight from '../assets/icons/starLight.png';

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  //To get the initial movies
  useEffect(() => {
    getPopularMovieApi(page).then((response) => {
      setMovies(response.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //To get the movies by pagination
  useEffect(() => {
    getPopularMovieApi(page).then((response) => {
      const totalPages = response.total_pages;
      if (page <= totalPages) {
        setMovies([...movies, ...response.results]);
      } else {
        alert('No mas peliculas para mostrar');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMoreMovies = () => {
    setPage(page + 1);
  };

  const renderItem = ({item}) => {
    return <Movie item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreMovies}
      />
    </SafeAreaView>
  );
}

function Movie(props) {
  const {item} = props;
  const imageUrl = `${BASE_PATH_IMG}/w500${item.poster_path}`;
  const average = item.vote_average / 2;
  const count = item.vote_count;

  const onNavigate = () => {
    console.log('Tocaste ombeee');
  };

  return (
    <TouchableOpacity onPress={onNavigate} activeOpacity={0.4}>
      <View style={styles.item}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <View style={styles.description}>
          <Title style={styles.title}>{item.title}</Title>
          <Text>{item.release_date}</Text>
          <Rating
            type="custom"
            ratingImage={starLight}
            style={styles.ratingBar}
            imageSize={30}
            startingValue={average}
            readonly
          />
          <Text style={{fontSize: 14, color: '#8697a5', marginTop: 5}}>
            {count} votos
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: '40%',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  description: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    left: 5,
  },
  ratingBar: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

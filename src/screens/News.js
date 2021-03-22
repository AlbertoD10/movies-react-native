import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {getNewMovies, getAllGenresApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import {setGenre} from '../utils/functions';

export default function News(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const {navigation} = props;

  //To fetch the initial movies
  useEffect(() => {
    getNewMovies(page).then((result) => {
      setMovies(result.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //To fetch and update the movies
  useEffect(() => {
    getNewMovies(page).then((result) => {
      let totalPages = result.total_pages;
      let newMovies = result.results;
      if (page <= totalPages) {
        setMovies([...movies, ...newMovies]);
      } else {
        alert('No hay más peliculas');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderItem = ({item}) => {
    return <Movie item={item} navigation={navigation} />;
  };

  const loadMoreMovies = () => {
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreMovies}
      />
    </SafeAreaView>
  );
}

function Movie(props) {
  const {item, navigation} = props;
  const [genres, setGenres] = useState([]);
  const {genre_ids} = item;
  const imgUrl = `${BASE_PATH_IMG}/w500${item.poster_path}`;

  //Get the genres of the movies and save it to render
  useEffect(() => {
    getAllGenresApi().then((response) => {
      setGenres(response.genres);
    });
  }, []);

  const genreName = setGenre(genre_ids, genres);

  const onNavigate = () => {
    navigation.navigate('Movie', {item, genreName});
  };

  return (
    <View style={{flex: 1}}>
      <TouchableHighlight onPress={onNavigate}>
        <Image style={styles.imageMovie} source={{uri: imgUrl}} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageMovie: {
    height: 250,
    width: '100%',
  },
});

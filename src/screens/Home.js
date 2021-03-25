import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import {Title, Text} from 'react-native-paper';
import {
  getNewMoviesApi,
  getAllGenresApi,
  getMovieGenreApi,
} from '../api/movies';
import MoviesSlider from '../components/MoviesSliders';
import MoviesSliderGenre from '../components/MoviesSliderGenre';

export default function Home(props) {
  const {navigation} = props;

  const [newMovies, setNewMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [moviesByGenre, setMoviesByGenre] = useState([]);

  //Get the list of the new movies to render
  useEffect(() => {
    getNewMoviesApi().then((result) => {
      setNewMovies(result.results);
    });
  }, []);

  //Get the genres of the movies and save it to render
  useEffect(() => {
    getAllGenresApi().then((response) => {
      setGenres(response.genres);
    });
  }, []);

  useEffect(() => {
    getMovieGenreApi(genreSelected).then((result) => {
      setMoviesByGenre(result.results);
    });
  }, [genreSelected]);

  //Change the genre selected in the FlatList
  const onChangeGenre = (id) => {
    setGenreSelected(id);
  };

  return (
    <ScrollView>
      <View style={styles.newSection}>
        <Title style={styles.title}>Nuevas peliculas</Title>
        <MoviesSlider
          newMovies={newMovies}
          genres={genres}
          navigation={navigation}
        />
      </View>

      <View style={styles.newSection}>
        <Title style={styles.title}>Peliculas por género</Title>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={genres}
          renderItem={({item}) => (
            <Text
              style={[
                styles.genreList,
                {
                  color: item.id === genreSelected ? '#8697a5' : '#1f5357',
                },
              ]}
              onPress={() => onChangeGenre(item.id)}>
              {item.name}
            </Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={{marginLeft: 15}}>
          <MoviesSliderGenre
            moviesByGenre={moviesByGenre}
            genres={genres}
            navigation={navigation}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  newSection: {
    marginTop: 15,
  },
  title: {
    marginLeft: 15,
  },
  genreList: {
    margin: 15,
    fontWeight: 'bold',
  },
});

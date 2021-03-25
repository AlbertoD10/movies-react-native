import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getAllGenresApi, searchMovieApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import {Title, Searchbar, Text} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import starLight from '../assets/icons/starLight.png';
import {setGenre} from '../utils/functions';
import ThemeContext from '../context/ThemeContext';

export default function Search(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState('');
  const [genre, setGenres] = useState([]);
  const [query, setQuery] = useState('');
  const [isMovie, setIsMovie] = useState(true);

  //To search the movies
  useEffect(() => {
    searchMovieApi(query).then((response) => {
      if (query.length > 1) {
        if (response.total_results === 0) {
          setMovies([]);
          setIsMovie(false);
        } else {
          setIsMovie(true);
          setMovies(response.results);
        }
      } else {
        setMovies([]);
      }
    });
  }, [query]);

  useEffect(() => {
    getAllGenresApi().then((response) => {
      setGenres(response.genres);
    });
  }, []);

  const renderItem = ({item}) => {
    return <Movie item={item} navigation={navigation} genre={genre} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar navigation={navigation} setQuery={setQuery} />
      {isMovie ? (
        <FlatList
          style={{marginTop: 5}}
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noMovie}>Pelicula no encontrada :c</Text>
      )}
    </SafeAreaView>
  );
}

function SearchBar(props) {
  const {navigation, setQuery} = props;

  return (
    <View>
      <Searchbar
        placeholder="Buscar pelicula"
        icon="arrow-left"
        onIconPress={() => navigation.goBack()}
        autoFocus
        onChangeText={(e) => setQuery(e)}
      />
    </View>
  );
}

function Movie(props) {
  const {item, navigation, genre} = props;
  const imageUrl = `${BASE_PATH_IMG}/w500${item.poster_path}`;
  const average = item.vote_average / 2;
  const count = item.vote_count;
  const genreName = setGenre(item.genre_ids, genre);
  const {theme} = React.useContext(ThemeContext);

  const onNavigate = () => {
    navigation.navigate('Movie', {item, genreName});
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
            tintColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
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
  noMovie: {
    marginTop: 50,
    fontSize: 20,
    textAlign: 'center',
  },
});

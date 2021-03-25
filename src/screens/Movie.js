import React, {useEffect, useState} from 'react';
import {ScrollView, View, Image, StyleSheet, StatusBar} from 'react-native';
import {Title, Text, Caption, IconButton} from 'react-native-paper';
import {BASE_PATH_IMG} from '../utils/constants';
import {Rating} from 'react-native-ratings';
import ModalVideo from '../components/ModalVideo';
import starLight from '../assets/icons/starLight.png';
import {getMovieVideo} from '../api/movies';
import ThemeContext from '../context/ThemeContext';

export default function Movie(props) {
  const {theme} = React.useContext(ThemeContext);
  const {
    route: {
      params: {item, genreName},
    },
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState(null);
  const imgPath = `${BASE_PATH_IMG}/w500${item.poster_path}`;

  //To get the trailer url
  useEffect(() => {
    getMovieVideo(item.id).then((response) => {
      setVideo(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollView>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
        <MovieImage imgPath={imgPath} />
        <PlayTrailer setShowModal={setShowModal} video={video} />
        <MovieTitle title={item.title} genreName={genreName} />
        <RatingBar
          vote_average={item.vote_average}
          vote_count={item.vote_count}
          theme={theme}
        />
        <MovieReview overview={item.overview} date={item.release_date} />
      </ScrollView>
      <ModalVideo
        showModal={showModal}
        setShowModal={setShowModal}
        video={video}
      />
    </>
  );
}
function MovieImage(props) {
  return (
    <View style={styles.viewPoster}>
      <Image style={styles.imagePoster} source={{uri: props.imgPath}} />
    </View>
  );
}

function PlayTrailer(props) {
  const {setShowModal, video} = props;

  if (video) {
    if (video.results.length > 0) {
      return (
        <View style={styles.viewPlay}>
          <IconButton
            style={styles.play}
            icon="play"
            color="black"
            size={40}
            onPress={() => setShowModal(true)}
          />
        </View>
      );
    }
  }
  return (
    <View style={styles.viewPlay}>
      <Text style={[styles.play, {color: 'black'}]}>Trailer no disponible</Text>
    </View>
  );
}

function MovieTitle(props) {
  const {title, genreName} = props;
  return (
    <View style={styles.title}>
      <Title> {title} </Title>
      <Caption>{genreName}</Caption>
    </View>
  );
}

function RatingBar(props) {
  const {vote_average, theme} = props;
  let average = vote_average / 2;
  return (
    <View style={styles.ratingBar}>
      <Text>
        <Rating
          type="custom"
          ratingImage={starLight}
          imageSize={30}
          startingValue={average}
          // ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
          tintColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        />
      </Text>
      <Text> {average} valoración</Text>
    </View>
  );
}

function MovieReview(props) {
  return (
    <View style={styles.overview}>
      <Text style={{textAlign: 'justify'}}>{props.overview}</Text>
      <Text>Fecha de lanzamiento: {props.date} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    // elevation: 5,
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
    height: 420,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  title: {
    margin: 15,
    marginTop: 0,
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
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginTop: -70,
    marginRight: 30,
  },
});

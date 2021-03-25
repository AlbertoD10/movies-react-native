import React, {useEffect, useState} from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import {IconButton, Modal} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import WebView from 'react-native-webview';

export default function ModaVideo(props) {
  const {showModal, setShowModal, video} = props;
  const [idVideo, setIdVideo] = useState('');

  useEffect(() => {
    if (video) {
      if (video.results.length > 0) {
        if (video.results[0].site === 'YouTube') {
          setIdVideo(video.results[0].key);
        } else {
          alert('Trailer no disponible');
        }
      }
    }
  }, [video, idVideo]);

  return (
    <Modal
      contentContainerStyle={styles.modal}
      visible={showModal}
      onDismiss={() => setShowModal(false)}>
      {Platform.OS === 'ios' ? (
        <YouTube videoId={idVideo} />
      ) : (
        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${idVideo}`,
          }}
        />
      )}

      <View style={styles.viewIcon}>
        <IconButton
          style={styles.close}
          icon="close"
          size={40}
          onPress={() => setShowModal(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'black',
    height: '100%',
  },
  viewIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10,
  },
  close: {
    display: 'flex',
    backgroundColor: '#1ea1f2',
  },
});

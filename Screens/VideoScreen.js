import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Modal, Pressable, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';

export default function VideosScreen() {
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [mediaType, setMediaType] = useState('video');

  useEffect(() => {
    fetchMedia(0);
  }, []);

  const fetchMedia = async (first) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const media = await MediaLibrary.getAssetsAsync({
        first: first + 30,
        sortBy: MediaLibrary.SortBy.creationTime,
        mediaType: [MediaLibrary.MediaType.video],
      });
      setGalleryFiles(media.assets);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Pressable
        onPress={() => {
          setCurrentImage(item.uri);
          setMediaType(item.mediaType);
        }}
      >
        <Image
          source={{ uri: item.uri }}
          style={{ width: 100, height: 100, margin: 12 }}
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Modal visible={currentImage !== ''} transparent={false}>
          <View style={{ flex: 1, backgroundColor: '#00B8EB' }}>
            <Pressable
              style={{
                position: 'absolute',
                top: 40,
                zIndex: 1,
                flex: 1,
                alignSelf: 'center',
              }}
              onPress={() => setCurrentImage('')}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  padding: 10,
                  borderRadius: 20,
                  width: 160,
                  textAlign: 'center',
                  alignContent: 'center',
                  backgroundColor: '#0720E0',
                }}
              >
                Cerrar
              </Text>
            </Pressable>
            {mediaType === 'video' ? (
              <Video
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{ uri: currentImage }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            ) : (
              <Image
                source={{ uri: currentImage }}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </View>
        </Modal>

        <View style={styles.scrollContainer}>
          <Text style={styles.heading}>Videos</Text>
          <Text style={styles.detailText}>
            Por favor toque el video que desea detallar
          </Text>
          <FlatList
            data={galleryFiles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            onEndReached={() => {
              fetchMedia(galleryFiles.length);
            }}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{ padding: 0 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#00B8EB',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    margin: 0,
    aspectRatio: 1, // This ensures that images maintain their aspect ratio
    borderRadius: 8,
    overflow: 'hidden',
  },
  detailText: {
    marginBottom: 30,
    textAlign: 'center',
  },
});

import { Text, View, FlatList, Modal, Pressable, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Image } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function PhotoScreen() {
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [mediaType, setMediaType] = useState('photo');
  const [numColumns] = useState(3);
  const navigation = useNavigation();

  const fetchMedia = async (first, mediaType) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const media = await MediaLibrary.getAssetsAsync({
        first: first + 30,
        sortBy: MediaLibrary.SortBy.creationTime,
        mediaType: mediaType === 'photo' ? MediaLibrary.MediaType.photo : MediaLibrary.MediaType.video,
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
      <View>
        <TouchableOpacity style={styles.ingreso} onPress={() => navigation.navigate('TomarFoto')}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Activar cámara</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={{ fontSize: 20, marginBottom: 20, alignSelf: 'center' }}>
            Fotos
          </Text>
          <Text style={styles.detailText}>
            Por favor toque la foto que desea detallar
          </Text>
          <FlatList
            data={galleryFiles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            onEndReached={() => {
              fetchMedia(galleryFiles.length, mediaType);
            }}
            onLayout={() => {
              fetchMedia(galleryFiles.length, mediaType);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#00B8EB',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: -5.5
  },
  ingreso: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

import { Text, View, FlatList, Modal, Pressable, StyleSheet } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { useState } from "react";
import { Image } from 'expo-image'
import { Video, ResizeMode } from 'expo-av'
import React, { Component } from 'react'


export default function VideosScreen() {

  const [galleryFiles, setGalleryFiles] = useState([])
  const [currentImage, setCurrentImage] = useState('')
  const [mediaType, setMediaType] = useState('video')

  const fetchMedia = async (first, mediaType) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status == "granted") {
      const media = await MediaLibrary.getAssetsAsync({
        first: first + 30,
        sortBy: MediaLibrary.SortBy.creationTime,
        mediaType: [MediaLibrary.MediaType.video]
      });
      setGalleryFiles(media.assets)
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={StyleSheet.imageContainer}>
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
  )

  return (
    <View style={styles.body}>
     <View style={styles.container}>

      <Modal visible={currentImage !== ""} transparent={false}>
        <View style={{ flex: 1, backgroundColor: 'purple' }}>
          <Pressable
            style={{
              position: "absolute",
              top: 40,
              zIndex: 1,
              flex: 1,
              alignSelf: "center",
              
            }}
            title="Close"
            onPress={() => setCurrentImage("")}
          >
            <Text
              style={{
                color: "purple",
                fontSize: 20,
                padding: 10,
                borderRadius: 20,
                width: 160,
                textAlign: 'center',
                alignContent: 'center',
                backgroundColor: "white",
              }}
            >
              Cerrar
            </Text>
          </Pressable>
          {mediaType === "video" ? (
            <Video
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{
                uri: currentImage,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          ) : (
            <Image
              source={{ uri: currentImage }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
      </Modal>

      <View style={styles.scrollContainer}>
        <Text style={{ fontSize: 20, marginBottom: 20, alignContent: 'center' }}>
          Videos
        </Text>
        <Text style={styles.detailText}>
          Por favor toque el video que desea detallar
        </Text>
        <FlatList
          data={galleryFiles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
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
  )
}


const styles = StyleSheet.create({
  body:{
    backgroundColor: '#00B8EB',
  },
  container: {
    backgroundColor: '#00B8EB',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  scrollContainer: {
    backgroundColor: '#00B8EB',
    flex: 1,
    marginTop: 20,
    width: "100%",
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  heading: {
    color: "green",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    margin: 1,
    aspectRatio: 1, // This ensures that images maintain their aspect ratio
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {},
  detailText: {
    marginBottom: 30
  }
});
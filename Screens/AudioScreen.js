import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';

const AudioScreen = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permisos de acceso a la biblioteca de medios denegados');
        return;
      }

      const mediaFiles = await MediaLibrary.getAssetsAsync({
        mediaType: ['audio'],
      });

      setAudioFiles(mediaFiles.assets);
    };

    fetchAudioFiles();
  }, []);

  const playSound = async (uri) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{item.filename}</Text>
            <Pressable style={styles.buttonR} onPress={() => playSound(item.uri)}>
              <Text style={styles.buttonText}>Reproducir</Text>
            </Pressable>
            <Pressable style={styles.buttonR} onPress={pauseSound}>
              <Text style={styles.buttonText}>Pausar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B8EB',
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2, // Agrega sombra para dispositivos Android
  },
  buttonR: {
    marginTop: 10,
    backgroundColor: '#0720E0',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AudioScreen;

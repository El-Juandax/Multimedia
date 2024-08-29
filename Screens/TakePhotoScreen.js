import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library';

export default function TomarFoto() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Picture saved! 🎉');
        setImage(null);
        console.log('saved successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>Acceso denegado a la camara</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Pressable
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'white',
                  borderRadius: 100,
                  borderWidth: 0,
                }}
                source={require('../Sources/img/voltearCamara.png')}
              />
              
            </Pressable>
            <Pressable
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              style={{
                borderRadius: 100, backgroundColor: flash === Camera.Constants.FlashMode.off ? 'gray' : 'yellow', borderRadius: 100 }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  borderWidth: 0,
                }}
                source={require('../Sources/img/flash.png')}
              />
             
            </Pressable>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Pressable
              onPress={() => setImage(null)}
            >
              <Image
                style={{ width: 100, height: 100, position: 'absolute', bottom: -30, left: 0 }}
                source={require('../Sources/img/Volver.png')}
              />
            </Pressable>
            <Pressable onPress={savePicture}>
              <Image
                style={{ width: 100, height: 100, position: 'absolute', bottom: -30, left: -100 }}
                source={require('../Sources/img/Guardar.png')}
              />
              
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={takePicture}>
            <Image
              style={{ width: 120, height: 120, position: 'absolute', bottom: -50, right: '34%', backgroundColor: 'white', borderRadius: 100 }}
              source={require('../Sources/img/camara.png')}
            />
            
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#00B8EB',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});

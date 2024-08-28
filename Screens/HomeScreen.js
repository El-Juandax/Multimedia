import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {

  const navigation = useNavigation()
      return (
      <View style={styles.body}>
        <View style={styles.header}>
        <Text style={styles.titulo}>Bienvenido</Text>
        </View>
        <View style={styles.opciones}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.botonPerfil}><Image style={{width: 120, height: 120}} source={require('../Sources/img/icono.png')}/><Text style={{color: '#005FCB'}}>Perfil</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Fotos')} style={styles.botonGaleria}><Image style={{width: 120, height: 120}} source={require('../Sources/img/galeria.png')}/><Text style={{color: '#005FCB'}}/><Text style={{color: '#005FCB'}}>Galeria</Text></TouchableOpacity>
        </View>
        <View style={styles.opciones2}>
          <TouchableOpacity onPress={() => navigation.navigate('Videos')} style={styles.botonPerfil}><Image style={{width: 120, height: 120}} 
          source={require('../Sources/img/videos.png')} 
          />
          <Text style={{color: '#005FCB'}}>Videos</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Audio')} style={styles.botonGaleria}><Image style={{width: 120, height: 120}} source={require('../Sources/img/audio.png')}/><Text style={{color: '#005FCB'}}>Audios</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    body:{
      backgroundColor: '#00B8EB',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header:{
      backgroundColor: '#0720E0',
      width: '100%',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      position:  'absolute',
      top: 0
    },
    titulo:{
      fontSize: 40,
      color: '#fff'
    },
    opciones:{
      marginTop: 80,
      width: 100,
      height: 200,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    },
    opciones2:{
      width: 100,
      height: 200,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    },
    botonPerfil:{
      width: 150,
      height: 150,
      backgroundColor: '#fff',
      marginLeft: 50,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    botonGaleria:{
      marginRight: 50,
      width: 150,
      height: 150,
      backgroundColor: '#fff',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  });
  
export default HomeScreen;
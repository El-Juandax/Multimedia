import { Text, View, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PerfilScreen = () => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    edad: '',
    ciudad: '',
    contrasena: ''
  });

  useEffect(() => {
    const ObtenerDatos = async () => {
      try {
        const datos = await AsyncStorage.getItem('Data');
        if (datos !== null) {
          setPerfil(JSON.parse(datos));
        }
      } catch (error) {
        console.log('No se pudo obtener los datos del perfil', error);
      }
    };

    ObtenerDatos();
  }, []);

  return (
    <View style={styles.body}>
        <View style={styles.contenedor}>
          <Image style={styles.imagenPerfil} source={require('../Sources/img/icono.png')}/>
          <Text style={styles.textoN}>Nombre</Text>
          <Text style={styles.nombre}>{perfil.nombre}</Text>
          <Text style={styles.textoA}>Apellido</Text>
          <Text style={styles.apellido}>{perfil.apellido}</Text>
          <Text style={styles.textoC}>Correo</Text>
          <Text style={styles.correo}>{perfil.correo}</Text>
          <Text style={styles.textoE}>Edad</Text>
          <Text style={styles.edad}>{perfil.edad}</Text>
          <Text style={styles.textoCI}>Ciudad</Text>
          <Text style={styles.ciudad}>{perfil.ciudad}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({  
  body: {
    flex: 1,
    backgroundColor: '#00B8EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagenPerfil:{
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: -50,
  },
  contenedor:{
    width: 300,
    height: 400,
    backgroundColor: '#0720E0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoN:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 320,
    left: 30
  },
  nombre:{
    width: 240,
    backgroundColor: '#005FCB',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 290,
    left: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textoA:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 260,
    left: 30
  },
  apellido:{
    width: 240,
    backgroundColor: '#005FCB',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 230,
    left: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textoC:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 200,
    left: 30   
  },
  correo:{
    width: 240,
    backgroundColor: '#005FCB',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 170,
    left: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textoE:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 140,
    left: 30   
  },
  edad:{
    width: 240,
    backgroundColor: '#005FCB',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 110,
    left: 30,
    paddingHorizontal: 10,
    borderRadius: 10, 
  },
  textoCI:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 80,
    left: 30  
  },
  ciudad:{
    width: 240,
    backgroundColor: '#005FCB',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 50,
    left: 30,
    paddingHorizontal: 10,
    borderRadius: 10, 
  }
});

export default PerfilScreen;
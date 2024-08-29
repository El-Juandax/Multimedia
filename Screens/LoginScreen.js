import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const ValidarUsuario = async () => {
    try{
      const datos = await AsyncStorage.getItem('Data');
      if(datos){
        const datosUsuario = JSON.parse(datos);
      if (email === datosUsuario.correo && password === datosUsuario.contrasena) {
        Alert.alert('inicio de sesion exitoso');
        navigation.navigate('Home');
        return;
      } else if(email !== datosUsuario.correo || password !== datosUsuario.contrasena){
        Alert.alert('Datos incorrectos');
        return;
      } else if (email === '' || password === ''){
        Alert.alert('por favor llena los campos');
      }
    } 
    } catch {
      Alert.alert('no se encontraron los datos')
    }
  }

  return (
    <View style={styles.body}>
    <Image style={styles.imagen} source={require('../Sources/img/icono.png')}/>
      <View style={styles.container}>
      <Text style={styles.titulofor}>Formulario de Ingreso</Text>
      <TextInput style={styles.ingreso} onChangeText={(text) => setEmail(text)} value={email} placeholder='correo'></TextInput>
      <TextInput style={styles.ingreso} onChangeText={(text) => setPassword(text)} value={password} placeholder='contraseña' secureTextEntry></TextInput>
      <TouchableOpacity onPress={ValidarUsuario} 
      style={styles.botonLogin}><Text>Ingresar</Text></TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Register')} 
    style={styles.botonRegistro}><Text>Registrarse</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body:{
    backgroundColor: '#00B8EB',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: 260,
    height: 300,
    backgroundColor: '#0720E0',
    alignItems: 'center',
    borderRadius: 10
  },
  imagen:{
    width: 80,
    height: 80,
    marginBottom: -40,
    position: 'relative',
    zIndex: 1
  },
  titulofor:{
    marginTop: 45,
    color: 'white',
    fontWeight: 'bold',
  },
  ingreso:{
    height: 30,
    marginTop: 20,
    marginBottom: -10,
    paddingHorizontal: 10,
    backgroundColor: '#005FCB',
    color: 'white',
    fontSize: 15,
    width: 230,
    borderRadius: 5,
  },
  botonLogin:{
    marginTop: 30,
    width: 230,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#00EBD2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  botonRegistro:{
    marginTop: 10,
    width: 230,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#4090EA',
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default Login;
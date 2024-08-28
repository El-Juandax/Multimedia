import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Registro = () =>{

  const [NombreUsuario, setNombre] = useState('');
  const [ApellidoUsuario, setApellido] = useState('');
  const [EdadUsuario, setEdad] = useState('');
  const [CiudadUsuario, setCiudad] = useState('');
  const [CorreoUsuario, setCorreo] = useState('');
  const [ContrasenaUsuario, setContrasena] = useState('');
  const navigation = useNavigation();
  
  const validarEdad = (edad) => {
    const validar = /^[0-9]+$/;
    return validar.test(edad);
  }

  const validarEmail = (email) => {
    const validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validar.test(email);
  }

  const handleButtonPress = async() => {
    if (!NombreUsuario || !ApellidoUsuario || !EdadUsuario || !CiudadUsuario || !CorreoUsuario || !ContrasenaUsuario){
      Alert.alert('Por favor, complete todos los campos');
      return;
    }else if (!validarEmail(CorreoUsuario)){
      Alert.alert('Por favor, ingrese un correo válido');
      return;
    }else if (ContrasenaUsuario.length > 8){
      Alert.alert('La contraseña debe tener al menos 8 caracteres');
      return;
    } else if (!validarEdad(EdadUsuario)){
      Alert.alert('Por favor, ingrese un número válido');
      return;
    }else{

    console.log('Nombre:', NombreUsuario);
    console.log('Apellido:', ApellidoUsuario);
    console.log('Edad:', EdadUsuario);
    console.log('Ciudad:', CiudadUsuario);
    console.log('Correo:', CorreoUsuario);
    console.log('Contraseña:', ContrasenaUsuario);

    const Data = {
      nombre: NombreUsuario,
      apellido: ApellidoUsuario,
      edad: EdadUsuario,
      ciudad: CiudadUsuario,
      correo: CorreoUsuario,
      contrasena: ContrasenaUsuario
    }

    try{
    await AsyncStorage.setItem('Data', JSON.stringify(Data));
    navigation.navigate('Home');
    }catch (error){
      Alert.alert('Error al guardar los datos');
    }
   }
  };

  return (
    <View style={styles.body}>
    <Image style={styles.imagen} source={require('../Sources/img/icono.png')}/>
      <View style={styles.container}>
      <Text style={styles.titulofor}>Formulario de Registro</Text>
      <TextInput style={styles.ingreso} onChangeText={(text) => setNombre(text)} placeholder='Nombre' value={NombreUsuario}></TextInput>
      <TextInput style={styles.ingreso} onChangeText={(text) => setApellido(text)} placeholder='Apellidos' value={ApellidoUsuario}></TextInput>
      <TextInput style={styles.ingreso} onChangeText={(text) => setEdad(text)} placeholder='Edad' value={EdadUsuario}></TextInput>
      <TextInput style={styles.ingreso} onChangeText={(text) => setCiudad(text)} placeholder='Ciudad' value={CiudadUsuario}></TextInput>
      <TextInput style={styles.ingreso} onChangeText={(text) => setCorreo(text)} placeholder='Correo' value={CorreoUsuario}></TextInput>
      <TextInput style={styles.ingreso} onChangeText={(text) => setContrasena(text)} placeholder='Contraseña' value={ContrasenaUsuario} secureTextEntry></TextInput>
      <TouchableOpacity style={styles.botonRegistro} onPress={() => handleButtonPress(NombreUsuario, ApellidoUsuario, EdadUsuario, CiudadUsuario, CorreoUsuario, ContrasenaUsuario)}><Text>Registrarse</Text></TouchableOpacity>
      <TouchableOpacity style={styles.botonLogin} onPress={() => navigation.navigate('Login')}><Text>Ingresar</Text></TouchableOpacity>
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
    height: 460,
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
    marginTop: 10,
    width: 230,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#00EBD2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  botonRegistro:{
    marginTop: 30,
    width: 230,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#4090EA',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Registro;
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import VideoScreen from './Screens/VideoScreen';
import PerfilScreen from './Screens/PerfilScreen';
import PhotoScreen from './Screens/PhotoScreen';
import AudioScreen from './Screens/AudioScreen';
import TomarFoto from './Screens/TakePhotoScreen';

const HomeStack = createNativeStackNavigator();


function MyStack() {
    return (
        <HomeStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false, headerStyle:{backgroundColor: '#0720E0'},
        headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'}}}>
            <HomeStack.Screen name="Login" component={LoginScreen}/>
            <HomeStack.Screen name="Register" component={RegisterScreen}/>
            <HomeStack.Screen name="Home" component={HomeScreen}/>
            <HomeStack.Screen name="Videos" component={VideoScreen} options={{headerShown: true, headerStyle:{backgroundColor: '#0720E0'},
            headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'}}}/>
            <HomeStack.Screen name="Perfil" component={PerfilScreen} options={{headerShown: true, headerStyle:{backgroundColor: '#0720E0'},
            headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'}}}/>
            <HomeStack.Screen name="Fotos" component={PhotoScreen} options={{headerShown: true, headerStyle:{backgroundColor: '#0720E0'},
            headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'}}}/>
            <HomeStack.Screen name="Audio" component={AudioScreen} options={{headerShown: true, headerStyle:{backgroundColor: '#0720E0'},
            headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'}}}/>
            <HomeStack.Screen name="TomarFoto" component={TomarFoto} options={{headerShown: true, headerStyle:{backgroundColor: '#0720E0'},
            headerTintColor: '#fff', headerTitleStyle:{fontWeight: 'bold'}}}/>   
        </HomeStack.Navigator>    
    )
} 

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
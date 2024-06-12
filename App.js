// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import TakePicture from './screens/TakePicture';
import PictureScreen from './screens/Picture';
import { ImageProvider } from './context/ImageContext'
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ImageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TakePicture" component={TakePicture} />
          <Stack.Screen name="Picture" component={PictureScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </ImageProvider>
  );
}

export default App;
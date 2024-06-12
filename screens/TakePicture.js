import React, { useEffect, useContext } from 'react';
import { View, PermissionsAndroid, Platform, StyleSheet, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { launchCamera } from 'react-native-image-picker';
import { ImageContext } from '../context/ImageContext';

const TakePicture = ({navigation}) => {
  const { addImage } = useContext(ImageContext);

  const takePicture = () => {
    launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        navigation.navigate('Home');
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        Geolocation.getCurrentPosition(
          (position) => {
            const newImage = {
              uri: response.assets[0].uri,
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            };
            addImage(newImage);
            navigation.navigate('Home');
          },
          (error) => {
            console.log(error.code, error.message);
            navigation.navigate('Home');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    });
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
          takePicture()
        } else {
          console.log("Location permission denied");
          Alert.alert('Location permission denied! Please activate in settings')
        }
      } catch (err) {
        console.warn(err);
        Alert.alert('Location permission denied! Please activate in settings')
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TakePicture;

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Picture = ({ route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.uri }} style={styles.image} />
      <Text style={styles.locationTitle}>Picture location:</Text>
      <Text>Latitude: {image.location.latitude}</Text>
      <Text>Longitude: {image.location.longitude}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300
  },
  locationTitle: {
    marginTop: 20,
    fontWeight: "bold"
  }
});

export default Picture;
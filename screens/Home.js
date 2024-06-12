import React, { useContext } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Button, Text } from 'react-native';
import { ImageContext } from '../context/ImageContext';

const HomeScreen = ({ navigation }) => {
  const { images = [] } = useContext(ImageContext);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={item} onPress={() => navigation.navigate('Picture', { image: item })}>
            <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, margin: 10 }} />
          </TouchableOpacity>
        )}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (<View style={styles.emptyContainer}><Text>Empty list pictures</Text></View>)}
      />
          
      <Button title="Take Picture" onPress={() => navigation.navigate('TakePicture')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    marginTop: 40
  },
  listContainer: {
    marginHorizontal: 'auto'
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
  },
});

export default HomeScreen;

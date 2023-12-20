import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { Text } from 'react-native-paper';
import Map from '../components/Map'; // Import the Map component
import Geocode from 'react-geocode';
import * as Location from 'expo-location';
// import { API_KEY } from '@env';

// Geocode.setApiKey(API_KEY);

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [markerPosition, setMarkerPosition] = useState({
    // latitude: 3.139,
    // longitude: 101.6869,
  });

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setMarkerPosition({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });
  //   })();
  // }, []);

  const handleSearch = async () => {
    try {
      const response = await Geocode.fromAddress(searchQuery);
      const { lat, lng } = response.results[0].geometry.location;
      setMarkerPosition({ latitude: lat, longitude: lng });
    } catch (error) {
      console.error("Error geocoding the location:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Welcome to the Home Page!</Text>
      <Text style={{fontSize: 18, marginBottom: 20}}>Search for a location and view it on the map.</Text>
      
      <Map
        markerPosition={markerPosition}
        onMarkerPositionChange={setMarkerPosition}
      />
      <TextInput
        placeholder="Search for a place"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchInput}
      />
      <Button title="Search" onPress={handleSearch} style={styles.buttonStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    marginTop: 50,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 10,
  },
  buttonStyle: {
    backgroundColor: '#1E90FF',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
});

export default HomeScreen;
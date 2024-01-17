import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Map from '../components/Map'; // Import the Map component
import Geocode from 'react-geocode';
import SearchBar from '../components/SearchBar';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [markerPosition, setMarkerPosition] = useState({});

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to the Home Page!</Text>
      <Text style={styles.subtitle}>Search for a location and view it on the map.</Text>
      
      <Map
        markerPosition={markerPosition}
        onMarkerPositionChange={setMarkerPosition}
        style={styles.mapStyle}
      />
      <View>
      <SearchBar onLocationChange={setMarkerPosition} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  mapStyle: {
    width: '100%',
    height: '50%',
  },
  searchContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default HomeScreen;


import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Map = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // onRegionChangeComplete={region => {
      //   console.log("Region changed to:", region);
      // }}
      showsUserLocation={true}
      followsUserLocation={true}
      zoomControlEnabled={true}
    >
      <Marker 
        coordinate={{latitude: 37.7749, longitude: -122.4194}}
        title={"Marker Title"}
        description={"Marker Description"}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    borderWidth: 15,
    borderColor: '#000',
    borderRadius: 10,
    margin: 25,
    marginBottom: 15,
    marginTop: 0,
  },
});

export default Map;
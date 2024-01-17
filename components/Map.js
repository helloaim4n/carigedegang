import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle } from 'react-native-maps';

const Map = () => {
  const region = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={region}
      showsUserLocation={true}
      followsUserLocation={true}
      userLocationAnnotationTitle='My Location'
      showsTraffic={true}
      showsMyLocationButton={true}
      showsCompass={true}
      showsScale={true}
      minZoomLevel={10}  // minimum zoom (more zoomed out)
      maxZoomLevel={20} // maximum zoom (more zoomed in)
    >
      <Marker 
        coordinate={region}
        title={"San Francisco"}
        description={"A vibrant city in California"}>
        <Callout>
          <React.Fragment>
            <Text style={styles.calloutTitle}>San Francisco</Text>
            <Text>A vibrant city in California.</Text>
          </React.Fragment>
        </Callout>
      </Marker>

      <Circle 
        center={region}
        radius={1200} 
        fillColor={"rgba(135, 206, 250, 0.5)"}
        strokeColor={"rgba(135, 206, 250, 1)"}
        strokeWidth={2}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height / 2, // Half the height of the screen
    width: '100%',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Map;

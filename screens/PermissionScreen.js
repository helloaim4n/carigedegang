import React, { useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

const PermissionScreen = ({ navigation }) => {
  const requestPermission = async () => {
    if (Platform.OS === 'android' && !Device.isDevice) {
      alert('Oops, this will not work on Snack in an Android emulator. Try it on your device!');
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    // Navigate to HomeScreen after permission is granted
    navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View>
      <Text>We need your location permission to provide our services.</Text>
      <Button title="Grant Permission" onPress={requestPermission} />
    </View>
  );
};

export default PermissionScreen;
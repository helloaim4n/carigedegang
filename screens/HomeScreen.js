import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from "../services/Auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      // Clear any user-related state or data if needed
      navigation.navigate('Login'); // Navigate to the LoginScreen after successful logout
    } catch (error) {
      console.error("Error occurred during logout:", error);
      // Handle any logout error, e.g. display an error message to the user
    }
  };

  return (
    <View>
      <Text>Home Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default HomeScreen;
import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native'; // Import Button component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { logout } from "../services/Auth";

function SettingsScreen() {
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
    <View style={styles.container}>
      <Text>Settings Page</Text>
      {/* Add your setting components here */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
});

export default SettingsScreen;
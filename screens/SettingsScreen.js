import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { logout } from "../services/Auth";
import { auth } from '../services/Config';

function SettingsScreen() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState("english");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Error", "Error occurred during logout: " + error.message);
    }
  };

  const toggleTheme = () => setIsDarkTheme(previousState => !previousState);

  const togglePickerVisibility = () => setIsPickerVisible(!isPickerVisible);

  const onLanguageSelect = (itemValue) => {
    setTempSelectedLanguage(itemValue);
  };

  const confirmLanguageSelection = () => {
    setSelectedLanguage(tempSelectedLanguage);
    setIsPickerVisible(false); 
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#FFF' }]}>
      <Text style={styles.titleText}>Settings Page</Text>

      {currentUser && (
        <View style={styles.userInfo}>
          <Text>Email: {currentUser.email}</Text>
        </View>
      )}

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDarkTheme}
      />

      <View style={styles.languageDisplay}>
        <Text>Selected Language: {selectedLanguage}</Text>
      </View>

      <Button title={isPickerVisible ? "Hide Language Picker" : "Select Language"} onPress={togglePickerVisibility} />
      <Button title="Logout" onPress={handleLogout} />


      <Modal
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={togglePickerVisibility}
        animationType="none" // Removes the sliding animation
      >
        <TouchableWithoutFeedback onPress={togglePickerVisibility}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tempSelectedLanguage}
              onValueChange={onLanguageSelect}
              style={styles.picker}
            >
                <Picker.Item label="English" value="english" />
                <Picker.Item label="Spanish" value="spanish" />
                <Picker.Item label="French" value="french" />
                <Picker.Item label="German" value="german" />
                <Picker.Item label="Japanese" value="japanese" />
                <Picker.Item label="Chinese" value="chinese" />
                <Picker.Item label="Korean" value="korean" />
                <Picker.Item label="Italian" value="italian" />
                <Picker.Item label="Russian" value="russian" />
                <Picker.Item label="Hindi" value="hindi" />
                <Picker.Item label="Arabic" value="arabic" />
            </Picker>
            <Button title="Confirm Language" onPress={confirmLanguageSelection} />
          </View>
          </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    margin: 10,
  },
  languageDisplay: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  picker: {
    width: '100%',
    height: 200,
  },
});

export default SettingsScreen;

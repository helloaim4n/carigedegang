import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, FlatList, View, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import VendingMachineItem from '../components/VendingMachineItem';

const MapListScreen = () => {
  const [filter, setFilter] = useState('');

  const vendingMachines = [
    { id: '1', name: 'SnackMaster 2000', country: 'USA' },
    { id: '2', name: 'VendoTron', country: 'Canada' },
    { id: '3', name: 'Chips-o-Matic', country: 'USA' },
    { id: '4', name: 'SodaStream 500', country: 'Mexico' },
    { id: '5', name: 'Candy-o-Matic', country: 'Canada' },
    { id: '6', name: 'Snack-o-Tron', country: 'USA' },
    { id: '7', name: 'SnackMaster 2000', country: 'USA' },
    { id: '8', name: 'VendoTron', country: 'Canada' },
    { id: '9', name: 'Chips-o-Matic', country: 'USA' },
    { id: '10', name: 'SodaStream 500', country: 'Mexico' },
    { id: '11', name: 'Candy-o-Matic', country: 'Canada' },
    { id: '12', name: 'Snack-o-Tron', country: 'USA' },
  ];

  const getFilteredMachines = () => {
    return vendingMachines.filter(machine =>
      machine.country.toLowerCase().includes(filter.toLowerCase()) ||
      machine.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>Map List Screen</Text>
        <TextInput
          label="Filter by country or name"
          value={filter}
          onChangeText={setFilter}
          style={styles.input}
        />
        <FlatList
          data={getFilteredMachines()}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <VendingMachineItem item={item} />}
          style={styles.list}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Consider a light background for better readability
    paddingTop: '20%',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 600,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Center align the header text
    color: '#333333',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0', // A subtle background color for the input
  },
  list: {
    width: '100%', // Ensure the list takes the full width
    marginBottom: '40%',
  },
  // You can keep other styles as they are or adjust as needed
});

export default MapListScreen;

import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, FlatList, View, TouchableOpacity, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';

const MapListScreen = () => {
  const [filter, setFilter] = useState('');
  const vendingMachines = [
    { id: '1', name: 'SnackMaster 2000', country: 'USA' },
    { id: '2', name: 'VendoTron', country: 'Canada' },
    { id: '3', name: 'Chips-o-Matic', country: 'USA' },
    { id: '4', name: 'SodaStream 500', country: 'Mexico' },
    { id: '5', name: 'Candy-o-Matic', country: 'Canada' },
  ];

  const filteredMachines = vendingMachines.filter(machine =>
    machine.country.toLowerCase().includes(filter.toLowerCase()) ||
    machine.name.toLowerCase().includes(filter.toLowerCase())
  );

  const renderItem = ({ item }) => <ExpandableItem item={item} />;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text>Map List Screen</Text>
        <TextInput
          label="Filter by country"
          value={filter}
          onChangeText={text => setFilter(text)}
          style={styles.input}
        />
        <FlatList
          data={filteredMachines}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const ExpandableItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.item}>
      <Text style={styles.title}>{item.name} ({item.country})</Text>
      {expanded && (
        <View style={styles.details}>
          {/* Render more details about the item here */}
          <Text>Details about {item.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    maxWidth: 600,
  },
  input: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
    // Additional styling for details
  },
});

export default MapListScreen;

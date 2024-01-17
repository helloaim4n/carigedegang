import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const VendingMachineItem = ({ item }) => {
    const [expanded, setExpanded ] = useState(false);

    return (
        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.item}>
            <Text style={styles.title}>{item.name} ({item.country})</Text>
            {expanded && (
                <View style={styles.details}>
                    <Text>Details about the vending machine</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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

export default VendingMachineItem;
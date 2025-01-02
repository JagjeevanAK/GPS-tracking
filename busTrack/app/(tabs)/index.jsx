// (tabs)index.tsx
import BusCard from '@/components/BusCard';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Using Ionicons for icons

const HomeScreen = () => {
  const [search, setSearch] = useState('');

  // Example location for bus
  const busLocation = { latitude: 12.9716, longitude: 77.5946 }; // Change this to a dynamic location later
  const busDetails = {
    busNumber: '45A',
    arrivalTime: '10:30 AM',
    status: 'On Time',
  };

  // Clear Search Input
  const clearSearch = () => {
    setSearch('');
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* Search Icon */}
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />

        <TextInput
          style={styles.searchInput}
          placeholder="Search for a bus"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        
         
        />

        {/* Clear Button */}
        {search.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Bus Details */}
      <BusCard busDetails={busDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15, // Padding around the screen
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 5, // Shadow effect for elevation on Android
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    transition: 'border-color 0.3s ease',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: 40,
    backgroundColor: 'transparent',
    paddingVertical: 0, // Remove vertical padding
    borderRadius: 25,
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default HomeScreen;

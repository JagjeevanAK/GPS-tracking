// components/BusCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusCard = ({ busDetails }: { busDetails: { busNumber: string; arrivalTime: string; status: string } }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bus {busDetails.busNumber}</Text>
      <Text style={styles.text}>Arrival Time: {busDetails.arrivalTime}</Text>
      <Text style={styles.text}>Status: {busDetails.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
});

export default BusCard;

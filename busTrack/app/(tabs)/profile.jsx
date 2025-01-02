// (tabs)profile.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

const ProfileScreen = () => {
  // Example user data (this could be dynamic in the future)
  const user = {
    name: 'Ni Patil',
    studentId: '123456789',
    email: 'NI.doe@university.com',
    course: 'Computer Science',
    profilePicture: 'https://www.w3schools.com/w3images/avatar2.png', // Sample image URL
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.header}>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userDetails}>{user.course}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#007bff" />
          <Text style={styles.infoText}>ID: {user.studentId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#007bff" />
          <Text style={styles.infoText}>Email: {user.email}</Text>
        </View>
      </View>

      {/* Social Media Section (Optional) */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Social Media</Text>
        <View style={styles.infoRow}>
          <Ionicons name="logo-facebook" size={20} color="#007bff" />
          <Text style={styles.infoText}>Facebook</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="logo-twitter" size={20} color="#007bff" />
          <Text style={styles.infoText}>Twitter</Text>
        </View>
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.updateButton} onPress={() => { /* Navigate to update screen or handle logic */ }}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 5, // Add shadow on Android
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

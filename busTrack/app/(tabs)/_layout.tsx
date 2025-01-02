// (tabs)_layout.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import HomeScreen from './index';  // Import the Home screen
import ExploreScreen from './explore'; // Import the Explore screen
import ProfileScreen from './profile.jsx'; // Import the Profile screen
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
   
<Tab.Navigator>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      ),
    }}
  />
  <Tab.Screen
    name="Explore Routes"
    component={ExploreScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="search" color={color} size={size} />
      ),
    }}
  />
  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person" color={color} size={size} />
      ),
    }}
  />
</Tab.Navigator>
  );
}

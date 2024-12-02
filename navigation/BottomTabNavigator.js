import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import EventListScreen from '../screens/EventListScreen';
import FavoriteEventsScreen from '../screens/FavoritesScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EventList" component={EventListScreen} options={{title:"Events List"}} />
    <Stack.Screen name="CreateEvent" component={CreateEventScreen}  options={{title:"Create Event"}}/>
    <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: "Event Detail" }} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={{
        tabBarActiveTintColor: '#42f44b',
        tabBarInactiveTintColor: '#858585',
        tabBarStyle: { height: 60, paddingBottom: 10 },
      }}
    >
      <Tab.Screen
        name="Events"
        component={EventStack}  
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteEventsScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          title: "Favorites Events"
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          title:"User Profile"
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

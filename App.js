import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebaseConfig';  
import BottomTabNavigator from './navigation/BottomTabNavigator';  
import LoginScreen from './screens/LoginScreen';  
import SignupScreen from './screens/SignupScreen';  
import { onAuthStateChanged } from 'firebase/auth';  

const Stack = createStackNavigator();  

const App = () => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  
      setLoading(false);  
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}  
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}  
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}  
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

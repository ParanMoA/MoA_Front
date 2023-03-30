import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, View, Text} from 'react-native/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './account/login/Login';
import SignUp from './account/signup/SignUp';
import LoginHome from './account/loginhome/LoginHome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginHome">
        <Stack.Screen
          name="LoginHome"
          component={LoginHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

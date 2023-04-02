import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './account/login/Login';
import SignUp from './account/signup/SignUp';
import LoginHome from './account/loginhome/LoginHome';
import {RootStackParamList, TabParamList} from './NavigationType';
import Chat from './Contents/main/Chat';
import Home from './Contents/main/Home';
import MyPage from './Contents/main/MyPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<TabParamList>();

// const Home;

const Auth = () => {
  return (
    <Stack.Navigator>
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
  );
};

const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../public/images/icon-home.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="채팅"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../public/images/icon-chat.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="마이"
        component={MyPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../public/images/icon-my.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './account/login/Login';
import SignUp from './account/signup/SignUp';
import LoginHome from './account/loginhome/LoginHome';
import {
  MainParamList,
  RootStackParamList,
  TabParamList,
} from './NavigationType';
import Chat from './contents/main/Chat';
import Home from './contents/main/Home';
import MyPage from './contents/main/MyPage';
import Ingredient from './contents/ingredient/Ingredient';
import Recruit from './contents/recruit/Recruit';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const MainStack = createNativeStackNavigator<MainParamList>();

// const Home;

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <MainStack.Screen name="Ingredient" component={Ingredient} />
      <MainStack.Screen name="Recruit" component={Recruit} />
    </MainStack.Navigator>
  );
};

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

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({}) => {
          let labelName;

          if (route.name === 'HomeTab') {
            labelName = '홈';
          } else if (route.name === 'ChatTab') {
            labelName = '채팅';
          } else if (route.name === 'MyTab') {
            labelName = '마이';
          }

          return <Text style={{color: 'black'}}>{labelName}</Text>;
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={MainStackScreen}
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
        name="ChatTab"
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
        name="MyTab"
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
          component={MainTabScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, Image} from 'react-native';
import {
  ChatParamList,
  MainParamList,
  RootStackParamList,
  TabParamList,
  TopTabParamList,
} from './NavigationType';
import {styles} from '../Styles/Navigation/NavigationStyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LoginHomeScreen from '../Screens/LoginHomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import HomeScreen from '../Screens/HomeScreen';
import IngredientScreen from '../Screens/IngredientScreen';
import RecruitScreen from '../Screens/RecruitScreen';
import MyPageScreen from '../Screens/MyPageScreen';
import ChatScreen from '../Screens/ChatScreen';
import ChatRoomScreen from '../Screens/ChatRoomScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<TabParamList>();
const MainStack = createNativeStackNavigator<MainParamList>();
const TopTab = createMaterialTopTabNavigator<TopTabParamList>();
const ChatStack = createNativeStackNavigator<ChatParamList>();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator initialRouteName="ChatRoomScreen">
      <ChatStack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{headerShown: false}}
      />
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </ChatStack.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="HomeScreen">
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="IngredientScreen"
        component={IngredientScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="RecruitScreen"
        component={RecruitScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};
const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginHomeScreen"
        component={LoginHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const BottomTabScreen = () => {
  return (
    <BottomTab.Navigator
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
      <BottomTab.Screen
        name="HomeTab"
        component={MainStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../public/images/icon-home.png')}
              style={focused ? styles.img_click : styles.img_nonclick}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ChatTab"
        component={ChatStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../public/images/icon-chat.png')}
              style={focused ? styles.img_click : styles.img_nonclick}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="MyTab"
        component={MyPageScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../public/images/icon-my.png')}
              style={focused ? styles.img_click : styles.img_nonclick}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const SubTabScreen = () => {
  return (
    <TopTab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({}) => {
          let labelName;

          if (route.name === 'ListViewTab') {
            labelName = '리스트보기';
          } else if (route.name === 'MyRecruitTab') {
            labelName = '채팅';
          }
          return <Text style={{color: 'black'}}>{labelName}</Text>;
        },
      })}>
      <TopTab.Screen name="ListViewTab" component={RecruitScreen} />
      <TopTab.Screen name="MyRecruitTab" component={RecruitScreen} />
    </TopTab.Navigator>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTabScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RootStackParamList} from '../Navigation/NavigationType';
import {styles} from '../Styles/Screen/StyleComponent';
type LoginHomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginHomeScreen'>;
};

const LoginHomeScreen = ({navigation}: LoginHomeScreenProps) => {
  const handlePressLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const handlePressSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/images/MoA.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../public/images/MoA_2.png')}
        style={styles.logo}
      />
      <View style={[styles.buttonContainer, {flexDirection: 'column'}]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              paddingHorizontal: '20%',
              borderColor: '#000000',
              marginVertical: '1%',
            },
          ]}
          onPress={handlePressLogin}>
          <Text
            style={[
              styles.btnText,
              {paddingHorizontal: '25%', paddingVertical: '0.5%'},
            ]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              paddingHorizontal: '20%',
              borderColor: '#000000',
              marginVertical: '1%',
            },
          ]}
          onPress={handlePressSignUp}>
          <Text
            style={[
              styles.btnText,
              {
                paddingHorizontal: '25%',
                paddingVertical: '0.5%',
              },
            ]}>
            SingUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginHomeScreen;

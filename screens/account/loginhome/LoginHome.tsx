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
import {RootStackParamList} from '../../NavigationType';
import {styles} from './Style';
type LoginHomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginHome'>;
};

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const LoginHomeScreen = ({navigation}: LoginHomeScreenProps) => {
  const handlePressLogin = () => {
    navigation.navigate('Login');
  };
  const handlePressSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../public/images/MoA.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../../public/images/MoA_2.png')}
        style={styles.logo}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePressLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePressSignUp}>
          <Text style={styles.btnText}>SingUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginHomeScreen;

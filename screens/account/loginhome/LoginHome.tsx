import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../../NavigationType';

type LoginHomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LoginHome'>;
};

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
      <TouchableOpacity style={styles.button} onPress={handlePressLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePressSignUp}>
        <Text>SingUp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD6BF',
    flex: 1,
  },
  title: {
    fontSize: 24,
  },
  logo: {
    width: 200,
    height: 100,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFD6BF',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 5,
  },
});

export default LoginHomeScreen;

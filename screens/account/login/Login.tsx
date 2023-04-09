import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {RootStackParamList} from '../../NavigationType';

import {styles} from './Style';
import axios from 'axios';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const handlePress = () => {
    navigation.navigate('LoginHome');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Main');
    // const data = {email: email, password: password};
    // axios
    //   .post('http://localhost:8080/user/login', data)
    //   .then(response => {
    //     console.log(response.data);
    //     navigation.navigate('Main');
    //   })
    //   .catch(error => {
    //     console.log(error.response.data);
    //     Alert.alert('Login Failed', 'Please Check your email and password');
    //   });
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
      <TextInput
        style={styles.inputContainer}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}></TextInput>
      <TextInput
        style={styles.inputContainer}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}></TextInput>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

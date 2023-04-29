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
  Dimensions,
} from 'react-native';
import {RootStackParamList} from '../../NavigationType';
import {styles} from './Style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigation.navigate('LoginHome');
  };

  const handleLogin = async () => {
    // await axios
    //   .post('http://localhost:8080/user/login', {
    //     email: email,
    //     password: password,
    //     withCredentials: true,
    //     responsetype: 'json',
    //     header: {
    //       'content-type': 'application/json',
    //     },
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     AsyncStorage.setItem('AccessToken', JSON.stringify(response.data));
    navigation.navigate('Main');
    //   })
    //   .catch(error => {
    //     console.log(error);
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          multiline={false}
          textAlignVertical="auto"
          onChangeText={setEmail}></TextInput>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
